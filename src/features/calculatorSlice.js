import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  display: '0',
  expression: '',
  history: [],
  future: []
}

const sanitizeExpression = (expression) => {
  let sanitized = expression.replace(/[^0-9.+\-*/]/g, '')
  sanitized = sanitized.replace(/\.{2,}/g, '.')
  if (/[+\-*/]$/.test(sanitized)) {
    sanitized = sanitized.slice(0, -1)
  }
  return sanitized
}

const evaluateExpression = (expression) => {
  const safeExpression = sanitizeExpression(expression)
  if (!safeExpression) return '0'

  try {
    // eslint-disable-next-line no-new-func
    const value = new Function(`"use strict"; return (${safeExpression})`)()
    if (Number.isFinite(value)) {
      return String(Number(value.toFixed(10))).replace(/\.0+$|(?<=\.\d*[1-9])0+$/g, '')
    }
    return 'Error'
  } catch {
    return 'Error'
  }
}

const createSnapshot = ({ display, expression }) => ({ display, expression })

const pushHistory = (state) => {
  state.history.push(createSnapshot(state))
  if (state.history.length > 50) {
    state.history.shift()
  }
  state.future = []
}

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    appendDigit: (state, action) => {
      const digit = action.payload
      if (state.display === 'Error') {
        pushHistory(state)
        state.expression = digit
        state.display = digit
        return
      }

      pushHistory(state)
      if (state.expression === '0' || state.expression === '') {
        state.expression = digit
      } else {
        state.expression += digit
      }
      state.display = state.expression
    },
    chooseOperation: (state, action) => {
      const operation = action.payload
      if (state.display === 'Error') {
        return
      }
      if (state.expression === '' && operation !== '-') {
        return
      }
      pushHistory(state)

      if (/[+\-*/]$/.test(state.expression)) {
        state.expression = state.expression.slice(0, -1) + operation
      } else {
        state.expression += operation
      }

      state.display = state.expression
    },
    clearAll: (state) => {
      pushHistory(state)
      state.display = '0'
      state.expression = ''
    },
    evaluateResult: (state) => {
      if (state.display === 'Error' || state.expression === '') {
        return
      }

      pushHistory(state)
      const result = evaluateExpression(state.expression)
      state.display = result
      state.expression = result === 'Error' ? '' : result
    },
    undo: (state) => {
      if (state.history.length === 0) return
      state.future.push(createSnapshot(state))
      const previous = state.history.pop()
      state.display = previous.display
      state.expression = previous.expression
    },
    redo: (state) => {
      if (state.future.length === 0) return
      state.history.push(createSnapshot(state))
      const next = state.future.pop()
      state.display = next.display
      state.expression = next.expression
    }
  }
})

export const {
  appendDigit,
  chooseOperation,
  clearAll,
  evaluateResult,
  undo,
  redo
} = calculatorSlice.actions

export default calculatorSlice.reducer

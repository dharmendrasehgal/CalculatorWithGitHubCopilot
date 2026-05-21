const sanitizeExpression = (expression) => {
  let sanitized = expression.replace(/[^0-9.+\-*/]/g, '')
  sanitized = sanitized.replace(/\.{2,}/g, '.')
  if (/[+\-*/]$/.test(sanitized)) sanitized = sanitized.slice(0, -1)
  return sanitized
}

const evaluateExpression = (expression) => {
  const safeExpression = sanitizeExpression(expression)
  if (!safeExpression) return '0'
  try {
    const value = new Function(`"use strict"; return (${safeExpression})`)()
    if (Number.isFinite(value)) {
      return String(Number(value.toFixed(10))).replace(/\.0+$|(?<=\.\d*[1-9])0+$/g, '')
    }
    return 'Error'
  } catch {
    return 'Error'
  }
}

const tests = [
  { expr: '7+3', expect: '10' },
  { expr: '8-5', expect: '3' },
  { expr: '6*4', expect: '24' },
  { expr: '9/3', expect: '3' },
  { expr: '5+6*2', expect: '17' },
  { expr: '10/4', expect: '2.5' },
  { expr: '2+2*2', expect: '6' },
  { expr: '0-5', expect: '-5' }
]

let failed = false
for (const { expr, expect } of tests) {
  const result = evaluateExpression(expr)
  const message = result === expect ? 'OK' : 'FAIL (expected ' + expect + ')'
  console.log(expr + ' => ' + result + ' ' + message)
  if (result !== expect) failed = true
}
console.log(failed ? 'FAILED' : 'PASSED')

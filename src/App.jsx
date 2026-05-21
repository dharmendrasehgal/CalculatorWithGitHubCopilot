import { useDispatch, useSelector } from 'react-redux'
import {
  appendDigit,
  chooseOperation,
  clearAll,
  evaluateResult,
  undo,
  redo
} from './features/calculatorSlice.js'

const digits = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0']
const operations = [
  { label: '÷', value: '/' },
  { label: '×', value: '*' },
  { label: '−', value: '-' },
  { label: '+', value: '+' }
]

function App() {
  const dispatch = useDispatch()
  const display = useSelector((state) => state.calculator.display)

  const handleDigit = (digit) => dispatch(appendDigit(digit))
  const handleOperation = (op) => dispatch(chooseOperation(op))

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
      <div className="mx-auto w-full max-w-md rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6 shadow-panel backdrop-blur-xl">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-sky-400/80">Redux Calculator</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Clean math workspace</h1>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-800/80 px-4 py-2 text-sm text-slate-200">
            Undo / Redo
          </div>
        </div>

        <div className="mb-5 rounded-[1.5rem] border border-slate-800 bg-slate-950/95 p-5 text-right shadow-inner shadow-slate-800/30">
          <div className="min-h-[84px] break-words text-5xl font-semibold leading-tight text-white">
            {display}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-[repeat(4,minmax(0,1fr))]">
          <button
            className="calc-btn btn-secondary col-span-2 bg-slate-800 text-slate-100 hover:bg-slate-700"
            onClick={() => dispatch(clearAll())}
          >
            C
          </button>
          <button
            className="calc-btn btn-secondary bg-slate-800 text-slate-100 hover:bg-slate-700"
            onClick={() => dispatch(undo())}
          >
            Undo
          </button>
          <button
            className="calc-btn btn-secondary bg-slate-800 text-slate-100 hover:bg-slate-700"
            onClick={() => dispatch(redo())}
          >
            Redo
          </button>

          {digits.slice(0, 3).map((digit) => (
            <button
              key={digit}
              className="calc-btn btn-digit bg-slate-800 text-white hover:bg-slate-700"
              onClick={() => handleDigit(digit)}
            >
              {digit}
            </button>
          ))}
          <button
            className="calc-btn btn-op bg-sky-500 text-white hover:bg-sky-400"
            onClick={() => handleOperation('/')}
          >
            ÷
          </button>

          {digits.slice(3, 6).map((digit) => (
            <button
              key={digit}
              className="calc-btn btn-digit bg-slate-800 text-white hover:bg-slate-700"
              onClick={() => handleDigit(digit)}
            >
              {digit}
            </button>
          ))}
          <button
            className="calc-btn btn-op bg-sky-500 text-white hover:bg-sky-400"
            onClick={() => handleOperation('*')}
          >
            ×
          </button>

          {digits.slice(6, 9).map((digit) => (
            <button
              key={digit}
              className="calc-btn btn-digit bg-slate-800 text-white hover:bg-slate-700"
              onClick={() => handleDigit(digit)}
            >
              {digit}
            </button>
          ))}
          <button
            className="calc-btn btn-op bg-sky-500 text-white hover:bg-sky-400"
            onClick={() => handleOperation('-')}
          >
            −
          </button>

          <button
            className="calc-btn btn-digit col-span-2 bg-slate-800 text-white hover:bg-slate-700"
            onClick={() => handleDigit('0')}
          >
            0
          </button>
          <button
            className="calc-btn btn-op bg-sky-500 text-white hover:bg-sky-400"
            onClick={() => handleOperation('+')}
          >
            +
          </button>
          <button
            className="calc-btn btn-equals bg-sky-600 text-white hover:bg-sky-500"
            onClick={() => dispatch(evaluateResult())}
          >
            =
          </button>
        </div>
      </div>
    </div>
  )
}

export default App

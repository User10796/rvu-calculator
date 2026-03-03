'use client'

import { useState, useMemo } from 'react'
import { procedureCategories, clinicCategories, Procedure } from './procedures'

interface ProcedureCount {
  [key: string]: {
    unilateral: number
    bilateral: number
  }
}

export default function Home() {
  const [counts, setCounts] = useState<ProcedureCount>({})
  const [mode, setMode] = useState<'procedure' | 'clinic'>('procedure')

  const categories = mode === 'procedure' ? procedureCategories : clinicCategories

  const updateCount = (code: string, type: 'unilateral' | 'bilateral', delta: number) => {
    setCounts((prev) => {
      const current = prev[code] || { unilateral: 0, bilateral: 0 }
      const newValue = Math.max(0, current[type] + delta)
      return {
        ...prev,
        [code]: {
          ...current,
          [type]: newValue,
        },
      }
    })
  }

  const setCount = (code: string, type: 'unilateral' | 'bilateral', value: number) => {
    setCounts((prev) => {
      const current = prev[code] || { unilateral: 0, bilateral: 0 }
      return {
        ...prev,
        [code]: {
          ...current,
          [type]: Math.max(0, value),
        },
      }
    })
  }

  const getCount = (code: string, type: 'unilateral' | 'bilateral') => {
    return counts[code]?.[type] || 0
  }

  const totalRvu = useMemo(() => {
    let total = 0
    for (const category of categories) {
      for (const proc of category.procedures) {
        const unilateral = getCount(proc.code, 'unilateral')
        const bilateral = getCount(proc.code, 'bilateral')
        const bilateralMult = proc.bilateralMultiplier ?? 2
        total += proc.rvu * unilateral + proc.rvu * bilateral * bilateralMult
      }
    }
    return total
  }, [counts, categories])

  const clearAll = () => {
    setCounts({})
  }

  const getProcedureTotal = (proc: Procedure) => {
    const unilateral = getCount(proc.code, 'unilateral')
    const bilateral = getCount(proc.code, 'bilateral')
    const bilateralMult = proc.bilateralMultiplier ?? 2
    return proc.rvu * unilateral + proc.rvu * bilateral * bilateralMult
  }

  return (
    <main className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">wRVU Calculator</h1>
            <p className="text-gray-600 text-sm">Calculate work RVUs for daily procedures</p>
          </div>
          <button
            onClick={clearAll}
            className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Clear All
          </button>
        </div>
        <div className="flex justify-center mb-6">
          <div className="flex rounded-lg overflow-hidden border border-gray-300">
            <button
              onClick={() => setMode('procedure')}
              className={`px-4 py-1.5 text-sm font-medium ${
                mode === 'procedure'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Procedure
            </button>
            <button
              onClick={() => setMode('clinic')}
              className={`px-4 py-1.5 text-sm font-medium ${
                mode === 'clinic'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Clinic
            </button>
          </div>
        </div>

        {/* Sticky Total */}
        <div className="sticky top-0 z-10 bg-blue-600 text-white rounded-lg p-4 mb-6 shadow-lg">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Total wRVUs</span>
            <span className="text-3xl font-bold">{totalRvu.toFixed(2)}</span>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category.name} className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
                {category.name}
              </h2>
              <div className="space-y-3">
                {category.procedures.map((proc) => {
                  const procTotal = getProcedureTotal(proc)
                  return (
                    <div
                      key={proc.code}
                      className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-2 border-b border-gray-100 last:border-0"
                    >
                      {/* Procedure Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">
                            {proc.code}
                          </span>
                          <span className="text-sm text-gray-800 truncate">{proc.name}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {proc.rvu} RVU {proc.bilateral && `(×${proc.bilateralMultiplier ?? 2} if bilateral)`}
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center gap-3">
                        {proc.bilateral ? (
                          <>
                            {/* Unilateral */}
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-gray-500 w-8">Uni:</span>
                              <button
                                onClick={() => updateCount(proc.code, 'unilateral', -1)}
                                className="w-7 h-7 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold"
                              >
                                -
                              </button>
                              <input
                                type="number"
                                min="0"
                                value={getCount(proc.code, 'unilateral')}
                                onChange={(e) =>
                                  setCount(proc.code, 'unilateral', parseInt(e.target.value) || 0)
                                }
                                className="w-12 h-7 text-center border rounded text-sm"
                              />
                              <button
                                onClick={() => updateCount(proc.code, 'unilateral', 1)}
                                className="w-7 h-7 rounded bg-blue-500 hover:bg-blue-600 text-white font-bold"
                              >
                                +
                              </button>
                            </div>
                            {/* Bilateral */}
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-gray-500 w-8">Bil:</span>
                              <button
                                onClick={() => updateCount(proc.code, 'bilateral', -1)}
                                className="w-7 h-7 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold"
                              >
                                -
                              </button>
                              <input
                                type="number"
                                min="0"
                                value={getCount(proc.code, 'bilateral')}
                                onChange={(e) =>
                                  setCount(proc.code, 'bilateral', parseInt(e.target.value) || 0)
                                }
                                className="w-12 h-7 text-center border rounded text-sm"
                              />
                              <button
                                onClick={() => updateCount(proc.code, 'bilateral', 1)}
                                className="w-7 h-7 rounded bg-green-500 hover:bg-green-600 text-white font-bold"
                              >
                                +
                              </button>
                            </div>
                          </>
                        ) : (
                          /* Non-bilateral - single count */
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-500 w-8">Qty:</span>
                            <button
                              onClick={() => updateCount(proc.code, 'unilateral', -1)}
                              className="w-7 h-7 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              min="0"
                              value={getCount(proc.code, 'unilateral')}
                              onChange={(e) =>
                                setCount(proc.code, 'unilateral', parseInt(e.target.value) || 0)
                              }
                              className="w-12 h-7 text-center border rounded text-sm"
                            />
                            <button
                              onClick={() => updateCount(proc.code, 'unilateral', 1)}
                              className="w-7 h-7 rounded bg-blue-500 hover:bg-blue-600 text-white font-bold"
                            >
                              +
                            </button>
                          </div>
                        )}

                        {/* Subtotal */}
                        {procTotal > 0 && (
                          <div className="text-sm font-medium text-blue-600 w-16 text-right">
                            {procTotal.toFixed(2)}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom spacer for sticky header */}
        <div className="h-8"></div>
      </div>
    </main>
  )
}

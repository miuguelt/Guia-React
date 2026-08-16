import { useState, useEffect } from 'react'

export function useApi(apiFunc, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    apiFunc().then(setData).catch(setError).finally(() => setLoading(false))
  }, deps)

  return { data, loading, error }
}

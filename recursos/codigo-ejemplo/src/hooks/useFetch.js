import { useState, useEffect } from 'react'

export function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Error ' + res.status)
        return res.json()
      })
      .then(data => { setData(data); setLoading(false) })
      .catch(err => { setError(err.message); setLoading(false) })
  }, [url])

  return { data, loading, error }
}

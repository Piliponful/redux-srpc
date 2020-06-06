const createSrpcMiddleware = url => ({ dispatch, getState }) => (next) => (action) => {
  if (action.type === 'SRPC_CALL') {
    return window.fetch(url, {
      method: 'post',
      body: JSON.stringify(action.payload),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(payload => {
        next({ type: `${action.payload.functionName}Result`, payload })

        return payload
      })
      .catch(console.error)
  }

  return next(action)
}

export default createSrpcMiddleware

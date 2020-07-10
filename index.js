export const srpcCallActionType = 'SRPC_CALL'

export const dispatchSrpcCall = dispatch => (method, params) => {
  return dispatch({
    type: srpcCallActionType,
    payload: {
      method,
      params
    }
  })
}

export const createSrpcMiddleware = url => ({ dispatch, getState }) => (next) => (action) => {
  if (action.type === srpcCallActionType) {
    return window.fetch(url, {
      method: 'post',
      body: JSON.stringify(action.payload),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        const result = response.json()

        if (result.error) {
          throw new Error(result.error)
        }

        return result
      })
      .then(payload => {
        next({ type: `${action.payload.method}Result`, payload })

        return payload
      })
      .catch(payload => {
        next({ type: `${action.payload.method}Error`, payload })
      })
  }

  return next(action)
}

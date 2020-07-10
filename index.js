const srpcCallActionType = 'SRPC_CALL'

const dispatchSrpcCall = dispatch => (method, params) => {
  return dispatch({
    type: actionType,
    payload: {
      method,
      params
    }
  })
}

const createSrpcMiddleware = url => ({ dispatch, getState }) => (next) => (action) => {
  if (action.type === actionType) {
    return window.fetch(url, {
      method: 'post',
      body: JSON.stringify(action.payload),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(payload => {
        next({ type: `${action.payload.method}Result`, payload })

        return payload
      })
      .catch(console.error)
  }

  return next(action)
}

export default { createSrpcMiddleware, srpcCallActionType, dispatchSrpcCall }

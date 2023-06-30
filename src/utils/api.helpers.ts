interface ErrorData {
  message: string | string[]
}

interface ErrorResponse {
  response: {
    data: ErrorData
  }
  message: string
}

export const getContentType = () => ({
  "Content-Type": "application/json"
})
export const errorCatch = (error: unknown): string => {
  const errorResponse = error as ErrorResponse
  return errorResponse.response && errorResponse.response.data
    ? typeof errorResponse.response.data.message === "object"
      ? errorResponse.response.data.message[0]
      : errorResponse.response.data.message
    : errorResponse.message
}

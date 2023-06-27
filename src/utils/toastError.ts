import { toastr } from "react-redux-toastr"

import { errorCatch } from "./api.helpers"

export const toastError = (error: unknown, title?: string) => {
  const message = errorCatch(error)
  toastr.error(title || "Error request", message)
  throw message
}

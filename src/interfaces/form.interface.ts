import { CSSProperties, InputHTMLAttributes } from "react"
import { FieldError } from "react-hook-form"

interface IFieldProps {
  placeholder?: string
  label?: string
  error?: {
    message: string
  }
  type?: string
}
type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & IFieldProps

export type IField = TypeInputPropsField

export interface IUploadField {
  folder?: string
  value?: string

  onChange: (...event: string[]) => void
  placeholder: string
  error?: FieldError
  style?: CSSProperties
  isNoImage?: boolean
}

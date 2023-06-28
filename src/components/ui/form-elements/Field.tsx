import clsx from "clsx"
import { forwardRef } from "react"

import { IField } from "@/src/interfaces/form.interface"

import styles from "./Form.module.scss"

const Field = forwardRef<any, IField & { label?: string }>(
  ({ placeholder, label, error, type = "text", style, ...rest }, ref) => {
    return (
      <div className={clsx(styles.common, styles.field)} style={style}>
        <label>
          {label && <p>{label}</p>}
          <input type={type} ref={ref} {...rest} placeholder={placeholder} />
        </label>
        {error && <div className={styles.error}>{error.message}</div>}
      </div>
    )
  }
)
Field.displayName = "Field"
export default Field

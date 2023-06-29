import cn from "classnames"
import Image from "next/image"
import React, { FC } from "react"

import styles from "../Form.module.scss"
import { useUpload } from "@/src/components/ui/form-elements/UploadField/useUpload"
import { IUploadField } from "@/src/interfaces/form.interface"
import Skeleton from "react-loading-skeleton"

const UploadFile: FC<IUploadField> = ({
  onChange,
  error,
  folder,
  placeholder,
  isNoImage = false,
  style,
  value
}) => {
  const { isLoading, uploadImage } = useUpload(onChange, folder)
  return (
    <div className={cn(styles.field, styles.uploadField)} style={style}>
      <p className={styles.label}>{placeholder}</p>
      <div className={styles.uploadFlex}>
        <div className={styles.inputContainer}>
          <div>
            <p>Выбрать файл</p>
          </div>
          <label>
            <input
              type={"file"}
              onChange={uploadImage}
              accept="image/png, image/svg,image/gif, image/jpeg,image/webp,"
            />
            {error && <div className={styles.error}>{error.message}</div>}
          </label>
        </div>
        {!isNoImage && (
          <div className={styles.uploadImageContainer}>
            {isLoading ? (
              <Skeleton count={1} width={100} height={100} />
            ) : (
              value && (
                <Image
                  alt={" "}
                  src={value}
                  unoptimized
                  width={100}
                  height={100}
                />
              )
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default UploadFile

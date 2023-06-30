import { useAuth } from "@/src/hooks/useAuth"
import { useRouter } from "next/router"
import { FormEventHandler, useEffect, useState } from "react"
import { UserService } from "@/src/services/user.service"
import { useQuery } from "@tanstack/react-query"
import { MdClose, MdEdit } from "react-icons/md"
import Image from "next/image"
import { useActions } from "@/src/hooks/useActions"
import Field from "@/src/components/ui/form-elements/Field"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { IUpdateProfile, IUser } from "@/src/interfaces/user.interface"
import UploadFile from "@/src/components/ui/form-elements/UploadField/UploadFile"
import Meta from "@/src/utils/meta/Meta"
import styles from "./profile.module.scss"
import clsx from "clsx"
const Profile = () => {
  const { user } = useAuth()
  const router = useRouter()
  const { logout } = useActions()
  useEffect(() => {
    if (!user) router.replace("/auth")
  })
  const [isEdit, setIsEdit] = useState(false)
  const [isRefetchNeeded, setIsRefetchNeeded] = useState(false)

  const getCurrentUserState = async () => {
    if (user) {
      return await UserService.findById(user.id)
    }
  }
  const { isLoading, data: profile } = useQuery({
    queryKey: ["getCurrentUserState", isRefetchNeeded],
    queryFn: getCurrentUserState
  })
  const { register, handleSubmit, control } = useForm<IUser>({
    mode: "onChange"
  })

  type HandleBioType = SubmitHandler<IUpdateProfile> &
    FormEventHandler<HTMLFormElement>

  const handleBio: HandleBioType = async (data) => {
    if (user) {
      const updatedData = { ...data, id: user.id }
      setIsEdit(false)
      const response = await UserService.updateUser(updatedData)
      setIsRefetchNeeded((prev) => !prev)
      return response
    }
  }

  return isLoading ? (
    <div>
      <h1>Идет загрузка</h1>
    </div>
  ) : (
    user && (
      <>
        <Meta title={"Профиль"} description={"Ваш профиль"} />
        <section
          className={styles.profile}
          style={{
            background: `url(${profile.wrapperURL})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
          }}
        >
          <div>
            <Image
              src={profile.avatarURL}
              alt={profile.name}
              width={250}
              height={250}
            />
            <div className={clsx({ [styles.reverse]: isEdit })}>
              {isEdit ? (
                <form onSubmit={handleSubmit(handleBio)}>
                  <Field
                    placeholder={"Ваше имя"}
                    type={"text"}
                    defaultValue={user.name}
                    {...register("name")}
                  />
                  <Field
                    placeholder={"Описание"}
                    type={"text"}
                    defaultValue={user.description}
                    {...register("description")}
                  />
                  <div style={{ display: "flex", marginTop: 20, gap: 10 }}>
                    {isEdit && (
                      <button onClick={() => setIsEdit(false)}>
                        <MdClose />
                      </button>
                    )}
                    <button>Отправить</button>
                  </div>
                </form>
              ) : (
                <div>
                  <h1>{profile.name} </h1>
                  <p>{profile.description} </p>
                </div>
              )}
              <div style={{ display: "flex", marginTop: 20, gap: 10 }}>
                {!isEdit && (
                  <button onClick={() => setIsEdit(true)}>
                    <MdEdit />
                  </button>
                )}
              </div>
              {isEdit && (
                <form onSubmit={handleBio}>
                  <Controller
                    control={control}
                    name={"avatarURL"}
                    defaultValue={""}
                    render={({
                      field: { value, onChange },
                      fieldState: { error }
                    }) => (
                      <UploadFile
                        onChange={onChange}
                        placeholder={"Аватар"}
                        error={error}
                        value={value}
                        folder={"avatars"}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name={"wrapperURL"}
                    defaultValue={""}
                    render={({
                      field: { value, onChange },
                      fieldState: { error }
                    }) => (
                      <UploadFile
                        onChange={onChange}
                        placeholder={"Обложка"}
                        error={error}
                        value={value}
                        folder={"wrappers"}
                      />
                    )}
                  />
                </form>
              )}
            </div>
          </div>
          <button onClick={() => logout()}>Выйти</button>
        </section>
      </>
    )
  )
}

export default Profile

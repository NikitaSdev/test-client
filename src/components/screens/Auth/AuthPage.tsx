import { useAuth } from "@/src/hooks/useAuth"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { ILogin, IRegister } from "@/src/store/user/user.interface"
import { useActions } from "@/src/hooks/useActions"
import AuthField from "@/src/components/screens/Auth/AuthField"
import { useAuthRedirect } from "@/src/hooks/useAuthRedirect"

const AuthPage = () => {
  useAuthRedirect()
  const { isLoading } = useAuth()

  const [type, setType] = useState<"login" | "register">("login")
  const {
    register: registerInput,
    handleSubmit,
    formState,
    watch
  } = useForm<IRegister & ILogin>({
    mode: "onChange"
  })
  const { login, register } = useActions()
  const onSubmit: SubmitHandler<IRegister & ILogin> = (data) => {
    console.log(data)
    if (type === "register") {
      register(data)
    } else {
      login(data)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AuthField
        register={registerInput}
        formState={formState}
        watch={watch}
        isLogin={type}
      />
      {type === "register" ? (
        <div>
          <p>Есть аккаунт?</p>
          <button
            onClick={() => {
              setType("login")
            }}
            disabled={isLoading}
          >
            Войти
          </button>
        </div>
      ) : (
        <div>
          <p>Нет аккаунта?</p>
          <button
            onClick={() => {
              setType("register")
            }}
            disabled={isLoading}
          >
            Зарегистрироваться
          </button>
        </div>
      )}
    </form>
  )
}

export default AuthPage

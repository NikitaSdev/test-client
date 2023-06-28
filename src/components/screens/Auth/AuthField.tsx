import { FC } from "react"

import { validEmail } from "@/src/components/screens/Auth/regex"
import Field from "@/src/components/ui/form-elements/Field"
import { FormState, UseFormRegister, UseFormWatch } from "react-hook-form"
import { ILogin, IRegister } from "@/src/interfaces/user.interface"

interface IAuthFields {
  register: UseFormRegister<IRegister & ILogin>
  formState: FormState<IRegister & ILogin>
  isPasswordRequired?: boolean
  watch: UseFormWatch<IRegister & ILogin>
  isLogin: "login" | "register" | "newPassword"
}
const AuthField: FC<IAuthFields> = ({
  register,
  watch,
  formState: { errors },
  isLogin
}) => {
  return (
    <>
      {isLogin === "login" ? (
        <>
          <Field
            {...register("emailOrLogin", {
              required: "Это обязательное поле"
            })}
            placeholder="E-mail или логин"
          />
          <Field
            {...register("password", {
              required: "Пароль необходим"
            })}
            placeholder="Пароль"
            type={"password"}
          />
        </>
      ) : (
        <>
          <Field
            {...register("login", {
              required: "Логин необходим"
            })}
            placeholder="Логин"
          />
          <Field
            {...register("name", {
              required: "Имя пользователя необходимо"
            })}
            placeholder="Имя пользователя"
          />
          <Field
            {...register("password", {
              required: "Пароль необходим",
              minLength: {
                value: 6,
                message: "Пароль должен быть не менее 6 символов"
              }
            })}
            placeholder="Пароль"
            type={"password"}
          />
          {errors.password && (
            <p className={"mb-3"}>{errors.password.message}</p>
          )}
          <Field
            {...register("confirmPassword", {
              validate: (value: string) =>
                value === watch("password") || "Пароли не совпадают",
              required: "Повторите пароль"
            })}
            type={"password"}
            placeholder="Повторите пароль"
          />
          {errors.confirmPassword && (
            <p className={"mb-3"}>{errors.confirmPassword.message}</p>
          )}
          <Field
            {...register("email", {
              required: "Email необходим",
              pattern: {
                value: validEmail,
                message: "Введите корректный email"
              }
            })}
            placeholder="E-mail"
          />
        </>
      )}
      <div>
        <button type={"submit"}>
          {isLogin === "login" ? "Войти на сайт" : "Отправить"}
        </button>
      </div>
    </>
  )
}

export default AuthField

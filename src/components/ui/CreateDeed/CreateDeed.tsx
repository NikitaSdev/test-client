import { SubmitHandler, useForm } from "react-hook-form"
import Field from "@/src/components/ui/form-elements/Field"
import { IDeedCreate } from "@/src/interfaces/deed.interface"
import { Dispatch, FC, SetStateAction, useState } from "react"
import { DeedService } from "@/src/services/deed.service"
import { useAuth } from "@/src/hooks/useAuth"

const CreateDeed: FC<{
  setIsRefetchNeeded: Dispatch<SetStateAction<boolean>>
}> = ({ setIsRefetchNeeded }) => {
  const { register, handleSubmit } = useForm<IDeedCreate>({
    mode: "onChange"
  })
  const { user } = useAuth()
  const [isEditMode, setIsEditMode] = useState(false)
  const onSubmit: SubmitHandler<IDeedCreate> = async (data) => {
    if (user) {
      data.userId = user.id
      await DeedService.createDeed(data)
      setIsRefetchNeeded((prev) => !prev)
    }
  }
  return (
    <section>
      <button onClick={() => setIsEditMode(true)}>Записать доброе дело</button>
      {isEditMode && (
        <section>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Field
              type="text"
              placeholder={"Что хорошего вы сделали?"}
              {...register("title", {
                required: "Это обязательное поле"
              })}
            />
            <Field
              type="text"
              placeholder={"Описание"}
              {...register("description", {
                required: "Это обязательное поле"
              })}
            />
            <button>Отправить</button>
          </form>
        </section>
      )}
    </section>
  )
}

export default CreateDeed

import { Dispatch, FC, SetStateAction, useState } from "react"
import { IDeed } from "@/src/interfaces/deed.interface"
import { useDate } from "@/src/hooks/useDate"
import { MdClose, MdDelete, MdEdit } from "react-icons/md"
import Field from "@/src/components/ui/form-elements/Field"
import { DeedService } from "@/src/services/deed.service"
import { toastr } from "react-redux-toastr"
import { SubmitHandler, useForm } from "react-hook-form"

const DeedCard: FC<
  IDeed & { setIsRefetchNeeded: Dispatch<SetStateAction<boolean>> }
> = ({ setIsRefetchNeeded, title, description, id, createdAt }) => {
  const date = useDate(new Date(createdAt))

  const handleDelete = async (deedId: number) => {
    await DeedService.delete(deedId)
    setIsRefetchNeeded((prev) => !prev)
  }

  const [isEditMode, setIsEditMode] = useState(false)
  const { register, handleSubmit } = useForm<IDeed>({
    mode: "onChange"
  })
  const onDeedEdit: SubmitHandler<IDeed> = async (data) => {
    await DeedService.update(data, id)
    setIsRefetchNeeded((prev) => !prev)
    setIsEditMode(false)
  }
  return isEditMode ? (
    <form onSubmit={handleSubmit(onDeedEdit)}>
      <button onClick={() => setIsEditMode(false)}>
        <MdClose />
      </button>

      <Field
        placeholder={"что хорошего вы сделали?"}
        defaultValue={title}
        {...register("title")}
      />
      <Field
        placeholder={"Описание"}
        defaultValue={description}
        {...register("description")}
      />
      <button>Отправить</button>
    </form>
  ) : (
    <div>
      <div>
        <p>{date}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <button onClick={() => setIsEditMode(true)}>
        <MdEdit />
      </button>
      <button onClick={() => handleDelete(id)}>
        <MdDelete />
      </button>
    </div>
  )
}

export default DeedCard

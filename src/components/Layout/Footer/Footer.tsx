import Link from "next/link"
import github from "@/src/assets/images/logos/github.svg"
import Image from "next/image"
import styles from "./Footer.module.scss"
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>Тестовое задание Никиты Андрюшкевича</p>

      <Link href={"https://github.com/NikitaSdev"} target={"_blank"} rel={"no"}>
        <div>
          <p>Мой гитхаб -</p>
          <Image src={github} alt={"Мой гитхаб"} draggable={false} />
        </div>
      </Link>
    </footer>
  )
}

export default Footer

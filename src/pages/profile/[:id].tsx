import React from "react"
import { GetStaticPaths, GetStaticProps } from "next"
import { UserService } from "@/src/services/user.service"
import { IUser } from "@/src/interfaces/user.interface"

export default function Profile({ user }) {
  return <div>dfgfdg</div>
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { data: movies } = await UserService.getOne()
    const paths = movies.results.map((user: IUser) => ({
      params: user.id
    }))
    return { paths, fallback: "blocking" }
  } catch (e) {
    return {
      paths: [],
      fallback: false
    }
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    if (params) {
      if (params[":id"]) {
        if (typeof params[":id"] === "string") {
          const userId = parseInt(params[":id"])
          const user = await UserService.findById(userId)
          return {
            props: { user }
          }
        }
      }
    } else {
      return {
        notFound: true
      }
    }
    return {
      props: {}
    }
  } catch (e) {
    return {
      notFound: true
    }
  }
}

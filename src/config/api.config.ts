export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || `http://localhost:5000/api`
export const getAuthUrl = (string: string) => `/auth${string}`
export const getUsersUrl = (string: string) => `/users${string}`

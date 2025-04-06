import { AxiosError } from 'axios'

export interface CustomError {
  message: string
  status: string
}

export const handleAxiosError = (error: unknown): CustomError => {
  console.error(error)

  if (error instanceof AxiosError) {
    const status = error.response?.status?.toString() ?? 'UNKNOWN'
    const message = error.response?.data?.message ?? error.message ?? 'An Axios error occurred'

    return { status, message }
  }

  if (error instanceof Error) {
    return {
      status: 'UNKNOWN',
      message: error.message || 'An unknown error occurred',
    }
  }

  return {
    status: 'UNKNOWN',
    message: 'An unknown error occurred',
  }
}

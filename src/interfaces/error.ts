export type generic_error_type = {
  path: string | number
  message: string
}

export type error_res_type = {
  success: boolean
  message: string
  errorMessages: generic_error_type[]
  stack?: string | undefined
}

export type modified_error_res_type = {
  status_code: number
  message: string
  errorMessages: generic_error_type[]
}

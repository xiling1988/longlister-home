import { FormErrors } from "../util/errors"

export interface FormError {
  error: string
}

export const initialState: FormErrors = {}
export interface signUpFormValues {
  parentName: string
  email: string
  tel: number
  password: string
  passwordConfirm: string
  childName: string
  age: number
  gender: string
  diagnosis: string
  siblingUse: string
  childName2: string
  age2: number
  gender2: string
  diagnosis2: string
  postCode: number
  address: string
  lineConsultation: boolean
  numberOfUse: string
  coursePlan: string
  introduction: string
  consaltation: string
}

export interface loginFormValues {
  email: string
  password: string
}

export interface User {
  id?: number
  parent_name?: string
  email?: string
  fee?: number | null
}

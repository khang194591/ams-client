import { RoleDto } from '@/modules/role/types'

export enum Status {
  active = 'active',
  pending = 'pending',
  inactive = 'inactive'
}

export enum Gender {
  male = 'male',
  female = 'female',
  other = 'other'
}

export interface UserQueryString extends QueryString {
  role?: number[]
  status?: Status[]
}

export interface UserDto {
  id: number
  email: string
  firstName: string
  lastName: string
  avatarId: number
  phone: string
  birthDay: string
  gender: Gender
  address: string
  province: string
  district: string
  ward: string
  bank: string
  bankAccount: string
  citizenId: string
  status: Status
  roleId: number
  role: RoleDto
}

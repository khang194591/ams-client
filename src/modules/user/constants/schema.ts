import { DATE_FORMAT } from '@/constants/base'
import dayjs from 'dayjs'
import { number, object, string } from 'yup'
import { GENDER, STATUS } from '.'

export const userSchema = object({
  email: string().email().required(),
  firstName: string().required(),
  lastName: string().required(),
  avatarUrl: string().optional().nullable(),
  phone: string().optional().nullable(),
  birthDay: string().test('format', (val) => dayjs(val, DATE_FORMAT).isValid()),
  gender: string().oneOf(Object.values(GENDER)).optional().nullable(),
  address: string().optional().nullable(),
  bank: string().optional().nullable(),
  bankAccount: string().optional().nullable(),
  citizenId: string().optional().nullable(),
  status: string().oneOf(Object.values(STATUS)).optional().nullable().default(STATUS[1]),
  roleId: number().positive().required(),
  province: string().optional().nullable(),
  district: string().optional().nullable(),
  ward: string().optional().nullable()
})

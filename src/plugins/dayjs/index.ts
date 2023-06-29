import { localStg } from '@/utils'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import 'dayjs/locale/vi'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import duration from 'dayjs/plugin/duration'
import localeData from 'dayjs/plugin/localeData'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale(localStg.get('language'))
dayjs.extend(duration)
dayjs.extend(localeData)
dayjs.extend(relativeTime)
dayjs.extend(customParseFormat)

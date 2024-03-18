import moment from "moment/moment";
import "moment/locale/ru"

moment().locale('ru')

export const parseTimeFromStrLarge = (time) => moment(time).format('DD.MM.YYYY HH:mm')
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);

const formatDateTime = (date) => {
    return dayjs(date).format('llll');
};

export default formatDateTime;

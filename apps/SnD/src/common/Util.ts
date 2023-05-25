/* eslint-disable no-return-assign */
function getQueryVariable(queryString: string, variable: string) {
    if (!queryString) return '';
    if (!variable) return '';
    const query = queryString.substring(1);
    const vars = query.split('&');
    for (let item of vars) {
        const pair = item.split('=');
        if (decodeURIComponent(pair[0]) === variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    return '';
}
function formatDate(date: Date) {
    if (!date) return null;
    const d = new Date(date);
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    const year = d.getFullYear();

    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    return [year, month, day].join('-');
}

function formatDateTime(date: Date) {
    if (!date) return null;
    const d = new Date(date);
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    const year = d.getFullYear();
    let hours = `${d.getHours()}`;
    let minutes = `${d.getMinutes()}`;
    let seconds = `${d.getSeconds()}`;
    if (hours.length < 2) hours = `0${hours}`;
    if (minutes.length < 2) minutes = `0${minutes}`;
    if (seconds.length < 2) seconds = `0${seconds}`;
    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;
    let dateStr = [year, month, day].join('-');
    dateStr = `${dateStr} ${hours}:${minutes}:${seconds}`;
    return dateStr;
}
function addDays(dateParam: Date, days: number) {
    dateParam.setDate(dateParam.getDate() + days);
    return dateParam;
}
function numberComparator(n1: number, n2: number) {
    return n1 - n2;
}

function objectToQueryString(obj: any) {
    let queryStr = '';
    Object.keys(obj).forEach(
        (key) => (queryStr = `${queryStr + key}=${obj[key]}&`)
    );
    return queryStr.trim();
}

function dateFromTodayPlus(days: number | null) {
    const numberOfDays = days || 0;
    if (!Number.isInteger(days)) return null;
    const now = new Date();
    now.setDate(now.getDate() + numberOfDays);
    const [day, month, year] = now
        .toLocaleDateString('en-uk', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        })
        .split('/');
    return `${year}-${month}-${day}`;
}

function arrayToChunks(originalArray: any[], chunkSize: number) {
    const R = [];
    for (let i = 0; i < originalArray.length; i += chunkSize)
        R.push(originalArray.slice(i, i + chunkSize));
    return R;
}

function isDevelopment() {
    return !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
}

const currencyFormatter = new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: 'INR'
});

export {
    getQueryVariable,
    formatDate,
    addDays,
    formatDateTime,
    numberComparator,
    objectToQueryString,
    dateFromTodayPlus,
    arrayToChunks,
    isDevelopment,
    currencyFormatter
};

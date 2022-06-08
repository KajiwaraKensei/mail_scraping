import { zeroPadding } from "."

const format = zeroPadding(2, "0")


export function CreateTimestamp(date = new Date()) {
    const year = date.getFullYear()
    const month = format(date.getMonth() + 1)
    const day = format(date.getDate())
    return `${year}${month}${day}`
}

export function GetYesterdayTimestamp() {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return CreateTimestamp(date)
}

export const getTimeStamp = () => {
    return CreateTimestamp()
}
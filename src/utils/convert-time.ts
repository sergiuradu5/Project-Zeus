import moment from "moment";

export default function convertTime(date: Date) {
  if (date) {
    return moment(date).format("llll");
  } else return undefined;
}

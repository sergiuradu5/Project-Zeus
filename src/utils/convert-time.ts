import moment from "moment";

export default function convertTime(date: Date) {
  return moment(date).format("llll");
}

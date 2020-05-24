import moment from 'moment';

export default function fromNow(value: string) {
  return moment(value).fromNow();
}

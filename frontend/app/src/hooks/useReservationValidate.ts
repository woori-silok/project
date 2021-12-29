import * as yup from 'yup';
import { FormData } from '../interfaces';

const string = yup.string();
const bool = yup.boolean();
const number = yup.number();

const attendeeSchema = yup.object().shape({
  email: string.required(),
  name: string,
  isHost: bool,
  isWriter: bool,
  status: string.oneOf(
    ['ACCEPTED', 'REFUSED', 'WAITING'],
    '알 수 없는 상태 값 입니다.',
  ),
});

const onlineSchema = yup.object().shape({
  isOnline: bool,
  onlineUrl: string,
});

const reservationSchemaOffline = yup.object().shape({
  title: string.required('제목을 작성해야 합니다.'),
  date: string.required('날짜를 선택해야 합니다.'),
  startTime: string.required('시간을 선택해야 합니다.'),
  endTime: string.required('시간을 선택해야 합니다.'),
  attendeeList: yup
    .array()
    .of(attendeeSchema)
    .min(1, '한 명 이상의 참석자가 필요합니다.'),
  subjectId: number.min(1, '주제를 선택해야 합니다.'),
  note: string,
  roomId: number.typeError('오프라인 회의는 회의실을 선택해야 합니다.'),
  online: onlineSchema,
});

const reservationSchemaOnline = yup.object().shape({
  title: string.required('제목을 작성해야 합니다.'),
  date: string.required('날짜를 선택해야 합니다.'),
  startTime: string.required('시간을 선택해야 합니다.'),
  endTime: string.required('시간을 선택해야 합니다.'),
  attendeeList: yup
    .array()
    .of(attendeeSchema)
    .min(1, '한 명 이상의 참석자가 필요합니다.'),
  subjectId: number.min(1, '주제를 선택해야 합니다.'),
  note: string,
  roomId: number.nullable(),
  online: onlineSchema,
});

// eslint-disable-next-line
const useReservationValidate = async (formData: FormData): Promise<any> => {
  if (formData.online.isOnline) {
    return reservationSchemaOnline.validate(formData);
  } else {
    return reservationSchemaOffline.validate(formData);
  }
};

export default useReservationValidate;

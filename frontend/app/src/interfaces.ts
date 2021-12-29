export type Status = 'ACCEPTED' | 'REFUSED' | 'WAITING';

interface Attendee {
  email: string;
  name: string;
  isHost: boolean;
  isWriter: boolean;
  status: Status;
}

interface Subject {
  id: number;
  name: string;
}

interface Room {
  id: number;
  name: string;
  location: string;
  capacity: number;
  note: string;
  facility: string;
  available?: boolean;
}

interface Online {
  isOnline: boolean;
  onlineUrl: string;
}

interface Reservation {
  reservationId: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  attendeeList: Attendee[];
  subject: Subject;
  room: Room;
  note: string;
  online: Online;
}

interface FormData {
  title?: string;
  date: string;
  startTime: string;
  endTime: string;
  attendeeList: Attendee[];
  subjectId?: number;
  note?: string;
  roomId: number | null;
  online: Online;
}

interface Authority {
  authorityName: string;
}

interface MyInfo {
  name: string;
  email: string;
  authorityDtoSet: Authority[];
}

interface Minute {
  attachFileDTOList: {
    id: number;
    name: string;
    data: File;
  }[];
  attendeeList: Attendee[];
  content: string;
  createdDate: string;
  endTime: string;
  minutesId: number;
  roomName: string;
  startTime: string;
  title: string;
}

type Member = Pick<Attendee, 'name' | 'email'>;

interface OngoingMeeting extends Reservation {
  minutesId?: number;
}

export type {
  Attendee,
  Subject,
  Room,
  Online,
  Reservation,
  FormData,
  MyInfo,
  Minute,
  Member,
  OngoingMeeting,
};

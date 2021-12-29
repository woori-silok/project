import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import TuiCalendar, { ISchedule, TZDate } from 'tui-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import Header from './Header';
import Popover from './Popover';
import { Reservation } from '../../../interfaces';

dayjs.locale('ko');
let tuiCalendar: TuiCalendar;

interface Schedule {
  id: string;
  title: string;
  subject: string;
  date: string;
  start: string;
  end: string;
  attendees: string;
  host: string;
}

interface CalendarProps {
  date: { now: Date };
  setDate: ({ now }: { now: Date }) => void;
  tuiReservations: ISchedule[];
  reservations: Reservation[];
}

const Calendar: React.VFC<CalendarProps> = (props) => {
  const { date, setDate, tuiReservations, reservations } = props;

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [target, setTarget] = useState<ISchedule>();
  const [schedule, setSchedule] = useState<Schedule>({
    id: '',
    title: '',
    subject: '',
    date: '',
    start: '',
    end: '',
    attendees: '',
    host: '',
  });
  const [reservation, setReservation] = useState<Reservation>();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref &&
      (tuiCalendar = new TuiCalendar(ref.current as Element, {
        defaultView: 'week',
        taskView: false,
        scheduleView: ['time'],
        isReadOnly: true,
        disableClick: true,
        disableDblClick: true,
      }));

    tuiCalendar.scrollToNow();

    tuiCalendar.on({
      clickSchedule: function (e) {
        const start = e.schedule.start as TZDate;
        const end = e.schedule.end as TZDate;
        const startDate = dayjs(start.getTime());
        const endDate = dayjs(end.getTime());

        const month = startDate.format('MMMM');
        const day = startDate.format('D') + '일';
        const dayOfWeek = startDate.format('dddd');

        const startHour = startDate.format('A h');
        const startMinute = startDate.format('mm');

        const endHour = endDate.format('A h');
        const endMinute = endDate.format('mm');

        const date = month + ' ' + day + ' ' + dayOfWeek;
        const startTime = startHour + ':' + startMinute;
        const endTime = endHour + ':' + endMinute;

        setAnchorEl(e.event.target as Element);
        setTarget(e.schedule);
        setSchedule({
          ...schedule,
          id: e.schedule.id as string,
          title: e.schedule.title as string,
          subject: e.schedule.raw?.subject as string,
          date: date,
          start: startTime,
          end: endTime,
          attendees: e.schedule.attendees?.reduce(
            (acc, attendee) => acc + ', ' + attendee,
          ) as string,
          host: e.schedule.raw?.host as string,
        });

        setReservation(
          reservations.filter(
            (r) => r.reservationId === (e.schedule.id as unknown as number),
          )[0],
        );
      },
      // eslint-disable-next-line
      beforeCreateSchedule: function (e) {},
      beforeUpdateSchedule: function (e) {
        const bgColor =
          e.schedule.raw?.status === 'ACCEPTED'
            ? 'blue'
            : e.schedule.raw?.status === 'REFUSED'
            ? 'red'
            : 'white';

        e.schedule.start = e.start;
        e.schedule.end = e.end;
        e.schedule.bgColor = bgColor;

        tuiCalendar.updateSchedule(
          e.schedule.id as string,
          e.schedule.calendarId as string,
          e.schedule,
        );
      },
      beforeDeleteSchedule: function (e) {
        tuiCalendar.deleteSchedule(
          e.schedule.id as string,
          e.schedule.calendarId as string,
        );
      },
    });
  }, [ref]);

  useEffect(() => {
    tuiCalendar.createSchedules(tuiReservations);
  }, [tuiReservations]);

  return (
    <>
      <Header tuiCalendar={tuiCalendar} date={date} setDate={setDate} />
      <Popover
        tuiCalendar={tuiCalendar}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        target={target}
        schedule={schedule}
        reservation={reservation}
      />
      <div ref={ref} style={{ height: '80vh' }} />
    </>
  );
};

export default Calendar;

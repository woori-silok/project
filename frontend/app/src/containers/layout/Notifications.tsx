import React from 'react';
import Notifications from '../../components/layout/appbar/Notifications';

const invitations = [
  {
    title: '프론트엔드 구현',
    host: '이병현',
    date: new Date('2021-10-13'),
    startTime: '14:30',
    endTime: '16:00',
  },
  {
    title: '데이터베이스 설계',
    host: '인영은',
    date: new Date('2021-10-06'),
    startTime: '12:30',
    endTime: '13:30',
  },
  {
    title: '프론트엔드 구현',
    host: '이병현',
    date: new Date('2021-10-13'),
    startTime: '14:30',
    endTime: '16:00',
  },
];

const NotificationsContainer: React.FC = () => {
  return <Notifications invitations={invitations} />;
};

export default NotificationsContainer;

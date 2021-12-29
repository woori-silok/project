import React, { useState, useRef, useEffect } from 'react';
import NoticeIcon from './NoticeIcon';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import styled from '@emotion/styled';
import Notification from './Notification';
import useOutsideClickDetect from '../../../hooks/useOutsideClickDetect';

export interface Invitation {
  title: string;
  host: string;
  date: Date;
  startTime: string;
  endTime: string;
}

interface NotificationsProps {
  invitations: Invitation[];
}

const NotificationWrapper = styled(Box)`
  position: absolute;
  top: 100%;
  right: 0;
  border: 1px solid lightgray;
  border-radius: 5px;
  width: 350px;
  height: 430px;
  background: white;
  padding: 0 16px;
  overflow-y: scroll;
  box-shadow: 0px 4px 8px -4px gray;
  color: black;

  &::-webkit-scrollbar {
    width: 10px;
    background-color: rgba(249, 249, 249, 1);
  }

  &::-webkit-scrollbar-thumb {
    width: 10px;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 10px;
  }
`;

const Notifications: React.FC<NotificationsProps> = (props) => {
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);
  const invitations = props.invitations;
  const lastIndex = invitations.length - 1;
  const notificationsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const notificationOutsideDetect = useOutsideClickDetect(
      notificationsRef,
      setNotificationsOpen,
    );

    return () => {
      document.removeEventListener('mousedown', notificationOutsideDetect);
    };
  });

  const handleClick = () => {
    setNotificationsOpen((prev) => !prev);
  };

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <span
      id="notification"
      onClick={handleClick}
      style={{ position: 'relative' }}
      ref={notificationsRef}
    >
      <NoticeIcon />
      {notificationsOpen && (
        <NotificationWrapper onClick={stopPropagation}>
          <ul>
            {invitations.map((invitation, index) => (
              <>
                <li key={index}>
                  <Notification invitation={invitation} />
                </li>
                {index !== lastIndex && <Divider />}
              </>
            ))}
          </ul>
        </NotificationWrapper>
      )}
    </span>
  );
};

export default Notifications;

import React from 'react';
import axios from 'axios';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
import TodayMeetings from './pages/TodayMeeting';
import MeetingReservation from './pages/MeetingReservation';
import MeetingNotes from './pages/MeetingNotes';
import OnGoingMeeting from './pages/OnGoingMeeting';
import MyMeeting from './pages/MyMeeting';
import Login from './pages/Login';
import SecureRoute from './components/route/SecureRoute';
import useToken from './hooks/useToken';

const App: React.FC = () => {
  const token = useToken();
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  return (
    <BrowserRouter>
      <Switch>
        <SecureRoute exact path="/" component={TodayMeetings} />
        <SecureRoute
          exact
          path="/meeting-reservation"
          component={MeetingReservation}
        />
        <SecureRoute exact path="/meeting-notes" component={MeetingNotes} />
        <SecureRoute exact path="/meeting-notes/:id" component={MeetingNotes} />
        <SecureRoute
          exact
          path="/on-going-meeting"
          component={OnGoingMeeting}
        />
        <SecureRoute exact path="/my-meeting" component={MyMeeting} />
        <Route exact path="/login" component={Login} />
        <Redirect path="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;

import React, { useReducer, createContext, Dispatch } from 'react';
import MeetingReservation from '../../components/meeting-reservation';

export interface Room {
  roomId: number;
  location: string;
  name: string;
  capacity: number;
  facility: string;
  note?: string;
  available: boolean;
}

const initialRooms: Room[] = [];

type Action = { type: 'UPDATE'; payload: Room[] };
type RoomDispatch = Dispatch<Action>;

export const roomStateContext = createContext<Room[]>(initialRooms);
export const roomDispatchContext = createContext<RoomDispatch>(() => null);

const roomReducer = (state: Room[], action: Action) => {
  switch (action.type) {
    case 'UPDATE':
      return [...action.payload];
    default:
      return state;
  }
};

const MeetingReservationContainer: React.FC = () => {
  const [state, dispatch] = useReducer(roomReducer, initialRooms);

  return (
    <roomStateContext.Provider value={state}>
      <roomDispatchContext.Provider value={dispatch}>
        <MeetingReservation />
      </roomDispatchContext.Provider>
    </roomStateContext.Provider>
  );
};

export default MeetingReservationContainer;

package com.woori_silok.service;

import com.woori_silok.domain.entity.Reservation;
import com.woori_silok.domain.entity.Room;
import com.woori_silok.domain.repository.ReservationRepository;
import com.woori_silok.domain.repository.RoomRepository;
import com.woori_silok.dto.RoomDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;
    private final ReservationRepository reservationRepository;

    @Transactional(readOnly = true)
    public List<RoomDTO> get(String date, String startTime, String endTime) {
        List<RoomDTO> responseList = new ArrayList<>();
        List<Room> roomList = roomRepository.findAll();
        for (Room room : roomList) {
            List<Reservation> reservationList = reservationRepository.findByDateAndRoomId(Date.valueOf(date), room.getId());
            RoomDTO response = room.toResponse();
            // sTime<=res.getsTime()<=eTime
            for (Reservation reservation : reservationList) {
                if ((startTime.compareTo(reservation.getStartTime().toString()) >= 0 || endTime.compareTo(reservation.getStartTime().toString()) > 0) &&
                        (startTime.compareTo(reservation.getEndTime().toString()) < 0 || endTime.compareTo(reservation.getEndTime().toString()) <= 0)) {
                    response.setAvailable(false);
                    break;
                }
            }
            responseList.add(response);
        }
        return responseList;
    }
}
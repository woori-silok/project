package com.woori_silok.domain.repository;

import com.woori_silok.domain.entity.Reservation;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    @EntityGraph(attributePaths = { "room" , "subject", "online", "attendeeList"})
    List<Reservation> findByMonthAndWeek(int month, int week);

    @EntityGraph(attributePaths = { "room" , "subject", "online", "attendeeList"})
    List<Reservation> findByDate(Date date);

    List<Reservation> findByDateAndRoomId(Date date, Long roomId);

    @EntityGraph(attributePaths = { "room" , "subject", "online", "attendeeList"})
    @Query("SELECT r FROM Reservation r  WHERE r.date=:date AND r.startTime <=:time AND r.endTime>:time")
    List<Reservation> findByDateAndTime(Date date, String time);
}
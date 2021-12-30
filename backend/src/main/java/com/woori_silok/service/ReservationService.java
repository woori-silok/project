package com.woori_silok.service;

import com.woori_silok.domain.entity.Attendee;
import com.woori_silok.domain.entity.Member;
import com.woori_silok.domain.entity.Reservation;
import com.woori_silok.domain.repository.AttendeeRepository;
import com.woori_silok.domain.repository.MemberRepository;
import com.woori_silok.domain.repository.ReservationRepository;
import com.woori_silok.dto.AttendeeDTO;
import com.woori_silok.dto.ReservationDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.TimeZone;

@Service
@RequiredArgsConstructor
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final AttendeeRepository attendeeRepository;
    private final MemberRepository memberRepository;

    @Transactional(readOnly = true)
    public List<ReservationDTO.Response> get(String username, int month, int week) {

        List<Reservation> reservationList = reservationRepository.findByMonthAndWeek(month, week);
        return getResponses(username, reservationList);
    }

    @Transactional(readOnly = true)
    public List<ReservationDTO.Response> getToday(String username) {
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        TimeZone timeZone = TimeZone.getTimeZone("Asia/Seoul");
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        sdf.setTimeZone(timeZone);

        List<Reservation> reservationList = reservationRepository.findByDate(Date.valueOf(sdf.format(timestamp)));
        return getResponses(username, reservationList);
    }

    private List<ReservationDTO.Response> getResponses(String username, List<Reservation> reservationList) {
        List<ReservationDTO.Response> responseList = new ArrayList<>();
        for (Reservation reservation : reservationList) {
            for (Attendee attendee : reservation.getAttendeeList()) {
                if (attendee.getMember().getUsername().equals(username)) {
                    ReservationDTO.Response response = reservation.toResponse();
                    responseList.add(response);
                }
            }
        }
        return responseList;
    }

    @Transactional(readOnly = true)
    public ReservationDTO.Response getOngoing(String username) {
        ReservationDTO.Response response = new ReservationDTO.Response();
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        TimeZone timeZone = TimeZone.getTimeZone("Asia/Seoul");
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat stf = new SimpleDateFormat("HH:mm:ss");
        sdf.setTimeZone(timeZone);
        stf.setTimeZone(timeZone);

        List<Reservation> reservationList = reservationRepository.findByDateAndTime(Date.valueOf(sdf.format(timestamp)), stf.format(timestamp));
        for (Reservation reservation : reservationList) {
            for (Attendee attendee : reservation.getAttendeeList()) {
                if (attendee.getMember().getUsername().equals(username)) {
                    response = reservation.toResponse();
                    break;
                }
            }
        }
        return response;
    }

    @Transactional
    public Reservation create(ReservationDTO.Request request) {
        Reservation reservation = request.toEntity();
        if (reservation.getRoom().getId() == null) {
            reservation.setRoom(null);
        }
        reservation = reservationRepository.save(reservation);
        return save(request, reservation);
    }

    @Transactional
    public Reservation update(Long id, ReservationDTO.Request request) {
        Reservation reservation = reservationRepository.getOne(id);

        attendeeRepository.deleteByReservationId(id);
        return save(request,reservation);
    }

    private Reservation save(ReservationDTO.Request request, Reservation reservation) {
        for (AttendeeDTO attendeeDTO : request.getAttendeeList()) {
            Attendee attendee = AttendeeDTO.toEntity(attendeeDTO);
            Member member = memberRepository.findByUsername(attendeeDTO.getEmail());
            attendee.setMember(member);
            reservation.addAttendee(attendee);
            attendeeRepository.save(attendee);
        }

        return reservation;
    }

    @Transactional
    public void delete(Long id) {
        reservationRepository.deleteById(id);
    }
}
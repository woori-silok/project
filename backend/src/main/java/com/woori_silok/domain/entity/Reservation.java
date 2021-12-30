package com.woori_silok.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.woori_silok.dto.AttendeeDTO;
import com.woori_silok.dto.ReservationDTO;
import lombok.*;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class Reservation extends BaseDateEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reservation_id")
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "date", nullable = false)
    private Date date;
    @Column(name = "month", nullable = false)
    private int month ;

    @Column(name = "week", nullable = false)
    private int week;

    @Column(name = "start_time", nullable = false)
    private String startTime;

    @Column(name = "end_time", nullable = false)
    private String endTime;

    @Column
    private String note;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "online_id", nullable = false)
    private Online online;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "minutes_id", nullable = false)
    private Minutes minutes;

    @JsonIgnore
    @OneToMany(mappedBy = "reservation", cascade = CascadeType.ALL)
    private List<Attendee> attendeeList;

    protected List<Attendee> getInternal() {
        if (this.attendeeList == null) {
            this.attendeeList = new ArrayList<>();
        }
        return this.attendeeList;
    }

    public void addAttendee(Attendee attendee) {
        if (attendee.isNew()) {
            getInternal().add(attendee);
        }
        attendee.setReservation(this);
    }

    public void update(Reservation reservation) {
        this.title = reservation.getTitle();
        this.date = reservation.getDate();
        this.startTime = reservation.getStartTime();
        this.endTime = reservation.getEndTime();
        this.room = reservation.getRoom();
        this.online = reservation.getOnline();
        this.subject = reservation.getSubject();
        this.note = reservation.getNote();
    }

    public ReservationDTO.Response toResponse() {
        List<AttendeeDTO> resList = Attendee.toResponse(attendeeList);

        return ReservationDTO.Response.builder()
                .reservationId(id)
                .title(title)
                .date(date)
                .startTime(startTime.toString())
                .endTime(endTime.toString())
                .attendeeList(resList)
                .room(room)
                .online(online)
                .subject(subject)
                .note(note)
                .minutesId(minutes.getId())
                .build();
    }
}
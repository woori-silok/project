package com.woori_silok.dto;

import com.woori_silok.domain.entity.*;
import lombok.*;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalTime;
import java.util.Calendar;
import java.util.List;
import java.util.Locale;
import java.util.TimeZone;

public class ReservationDTO {
    @Builder
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @ToString
    public static class Request {
        private String title;
        private String date;
        private String startTime;
        private String endTime;
        private List<AttendeeDTO> attendeeList;
        private Long subjectId;
        private Long roomId;
        private String note;
        private Online online;

        public Reservation toEntity() {
            Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("Asia/Seoul"), Locale.KOREA);
            calendar.setTime(Date.valueOf(date));
            return Reservation.builder()
                    .title(title)
                    .date(Date.valueOf(date))
                    .month(calendar.get(Calendar.MONTH) + 1)
                    .week(calendar.get(Calendar.WEEK_OF_MONTH))
                    .startTime(startTime)
                    .endTime(endTime)
                    .minutes(Minutes.builder().content("").build())
                    .subject(Subject.builder().id(subjectId).build())
                    .room(Room.builder().id(roomId).build())
                    .online(online)
                    .note(note)
                    .build();
        }

    }

    @Builder
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @ToString
    public static class Response {
        private long reservationId;
        private String title;
        private Date date;
        private String startTime;
        private String endTime;
        private List<AttendeeDTO> attendeeList;
        private Subject subject;
        private Room room;
        private String note;
        private Online online;
        private Long minutesId;
    }
}



package com.woori_silok.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.woori_silok.dto.AttendeeDTO;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
//@ToString
public class Attendee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "attendee_id")
    private Long id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="reservation_id", nullable = false)
    private Reservation reservation;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="username", nullable = false)
    private Member member;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @Column(nullable = false)
    private Boolean isHost;

    @Column(nullable = false)
    private Boolean isWriter;

    public boolean isNew() {
        return this.id == null;
    }

    public static List<AttendeeDTO> toResponse(List<Attendee> attendeeList) {
        List<AttendeeDTO> resList = new ArrayList<>();
        for (Attendee attendee : attendeeList) {
            AttendeeDTO res = AttendeeDTO.builder()
                    .email(attendee.getMember().getUsername())
                    .name(attendee.getMember().getName())
                    .isHost(attendee.getIsHost())
                    .isWriter(attendee.getIsWriter())
                    .status(attendee.getStatus())
                    .build();
            resList.add(res);
        }
        return resList;
    }
}

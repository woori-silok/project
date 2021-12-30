package com.woori_silok.dto;

import com.woori_silok.domain.entity.Attendee;
import com.woori_silok.domain.entity.Status;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@Builder
public class AttendeeDTO {
    private String email;
    private String name;
    private Boolean isHost;
    private Boolean isWriter;
    private Status status;

    public static Attendee toEntity(AttendeeDTO attendeeDTO) {
        return Attendee.builder()
                .isHost(attendeeDTO.getIsHost())
                .isWriter(attendeeDTO.getIsWriter())
                .status(attendeeDTO.getStatus())
                .build();
    }

}

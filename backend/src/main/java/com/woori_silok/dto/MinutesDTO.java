package com.woori_silok.dto;

import com.woori_silok.domain.entity.Minutes;
import lombok.*;

import java.util.List;

public class MinutesDTO {

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Request {
        private String content;

        public Minutes toEntity() {
            return Minutes.builder()
                    .content(content).build();
        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Response {
        private Long minutesId;
        private String content;
        private String roomName;
        private String startTime;
        private String endTime;
        private Long subjectId;
        private String title;
        private List<AttendeeDTO> attendeeList;
        private List<AttachFileDTO> attachFileDTOList;
        private String createdDate;
    }

}

package com.woori_silok.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@Builder
public class RoomDTO {
    private Long roomId;
    private String name;
    private String location;
    private int capacity;
    private String note;
    private String facility;
    @Builder.Default
    private boolean isAvailable = true;
}

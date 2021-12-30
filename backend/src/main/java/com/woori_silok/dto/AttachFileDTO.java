package com.woori_silok.dto;

import com.woori_silok.domain.entity.Member;
import com.woori_silok.domain.entity.Role;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class AttachFileDTO {
    private Long id;
    private String name;
    private byte[] data;
}

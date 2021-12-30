package com.woori_silok.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.woori_silok.domain.entity.Member;
import lombok.*;

import javax.validation.constraints.NotNull;
import java.util.Set;

public class MemberDTO {
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    @Builder
    public static class Request {
        private String name;
        private String email;

        @NotNull
        @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
        private String password;

        public Member toEntity() {
            return Member.builder()
                    .name(name)
                    .username(email)
                    .password(password)
                    .build();
        }
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    @Builder
    public static class Response {
        private String name;
        private String email;
        private Set<AuthorityDto> authorityDtoSet;
    }
}

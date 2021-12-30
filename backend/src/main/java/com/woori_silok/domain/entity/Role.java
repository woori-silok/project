package com.woori_silok.domain.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
//@ToString
public enum Role {
    USER("ROLE_USER", "직원"), ADMIN("ROLE_ADMIN", "관리자");

    private final String key;
    private final String title;
}

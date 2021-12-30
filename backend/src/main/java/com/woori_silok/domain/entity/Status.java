package com.woori_silok.domain.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Status {
    //미수락도 필요?
    ACCEPTED("ACCEPT","수락"),WAITING("WAITING", "대기중"), REFUSED("REFUSED", "거절");

    private final String key;
    private final String title;
}

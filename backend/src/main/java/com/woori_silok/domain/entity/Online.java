package com.woori_silok.domain.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class Online {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "online_id")
    private Long id;

    @Column(name = "is_online")
    private Boolean isOnline;

    @Column(name = "online_url")
    private String onlineUrl;
}

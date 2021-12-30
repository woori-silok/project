package com.woori_silok.domain.entity;

import com.woori_silok.dto.MinutesDTO;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity
@Builder
public class Minutes extends BaseDateEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "minutes_id")
    private Long id;

    @Column(name="content", columnDefinition = "TEXT")
    private String content;

    @OneToOne(mappedBy = "minutes")
    private Reservation reservation;

    @Builder.Default
    @OneToMany(mappedBy = "minutes")
    private List<AttachFile> files = new ArrayList<>();

    public void update(Minutes minutes) {
        this.content = minutes.getContent();
    }

    public MinutesDTO.Response toResponse() {
        return MinutesDTO.Response.builder()
                .minutesId(id)
                .content(content)
                .build();
    }
}

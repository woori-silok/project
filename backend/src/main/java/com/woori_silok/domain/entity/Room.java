package com.woori_silok.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.woori_silok.dto.RoomDTO;
import lombok.*;

import javax.persistence.*;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id")
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private int capacity;

    @Column(nullable = false)
    private String note;

    @Column(nullable = false)
    private String facility;

    @JsonIgnore
    @OneToMany(mappedBy="room", cascade=CascadeType.REMOVE)
    private List<Reservation> reservations;

    public RoomDTO toResponse() {
        return RoomDTO.builder()
                .roomId(id)
                .name(name)
                .location(location)
                .capacity(capacity)
                .note(note)
                .facility(facility)
                .build();
    }
}

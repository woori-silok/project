package com.woori_silok.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subject_id")
    private Long id;

    @Column(name = "subject_name")
    private String name;

    @JsonIgnore
    @OneToMany(mappedBy="subject", cascade=CascadeType.REMOVE, fetch = FetchType.LAZY)
    private List<Reservation> reservations;
}

package com.woori_silok.domain.entity;

import com.woori_silok.dto.AuthorityDto;
import com.woori_silok.dto.MemberDTO;
import lombok.*;

import javax.persistence.*;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Builder
@ToString
public class Member extends BaseDateEntity {

    @Id
    @Column
    private String username;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String password;

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<Attendee> attendeeList;

    @ManyToMany
    @JoinTable(
            name = "member_authority",
            joinColumns = {@JoinColumn(name = "username", referencedColumnName = "username")},
            inverseJoinColumns = {@JoinColumn(name = "authority_id", referencedColumnName = "authority_id")})
    private Set<Authority> authorities;


    public void update(Member member) {
        this.password = member.getPassword();
    }

    public MemberDTO.Response toResponse() {
        return MemberDTO.Response.builder()
                .email(username)
                .name(name)
                .authorityDtoSet(authorities.stream()
                        .map(authority -> AuthorityDto.builder().authorityName(authority.getAuthorityName()).build())
                        .collect(Collectors.toSet()))
                .build();
    }
}


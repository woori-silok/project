package com.woori_silok.member.domain;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.woori_silok.domain.entity.Member;
import com.woori_silok.domain.repository.MemberRepository;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class MemberRepositoryTest {
    private Member member;

    @Autowired
    MemberRepository memberRepository;
    @Autowired
    EntityManager entityManager;

    @BeforeEach
    void setUp() {
        member = Member.builder()
        		.password("1234")
                .username("jhhj424@naver.com").build();
    }

    @Test
    @DisplayName("멤버 저장")
    public void create() {
        // when
        Member savedMember = memberRepository.save(member);

        // then
        assertThat(savedMember).isEqualTo(member);
        assertThat(savedMember.getUsername()).isEqualTo(member.getUsername());
        assertThat(savedMember.getUsername()).isEqualTo(member.getUsername());
    }

    @Test
    @DisplayName("멤버 조회")
    public void findById() {
        // given
        memberRepository.save(member);
        entityManager.clear();

        // when
        Member findMember = memberRepository.findByUsername(member.getUsername());

        // then
        assertThat(findMember.getUsername()).isEqualTo(member.getUsername());
        assertThat(findMember.getUsername()).isEqualTo(member.getUsername());
    }

    @Test
    @DisplayName("멤버 삭제")
    public void delete() {
        memberRepository.save(member);

        // when
        memberRepository.delete(member);

        // then
        List<Member> findAllMembers = memberRepository.findAll();
        assertThat(findAllMembers).isEmpty();
    }
}

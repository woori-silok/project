package com.woori_silok.service;

import java.util.ArrayList;
import java.util.List;

import com.woori_silok.domain.entity.Member;
import com.woori_silok.domain.repository.MemberRepository;
import com.woori_silok.dto.MemberDTO;
import com.woori_silok.util.SecurityUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    @Transactional(readOnly = true)
    public List<MemberDTO.Response> get() {
        List<MemberDTO.Response> memberResponseList = new ArrayList<>();
        List<Member> memberList = memberRepository.findAll();
        for (Member member : memberList) {
            MemberDTO.Response memberResponse = member.toResponse();
            memberResponseList.add(memberResponse);
        }
        return memberResponseList;
    }

    public MemberDTO.Response create(MemberDTO.Request request) {
        Member member = memberRepository.save(request.toEntity());
        return member.toResponse();
    }

    @Transactional(readOnly = true)
    public MemberDTO.Response find(Long id) {
        Member member = memberRepository.getOne(id);
        return member.toResponse();
    }

    public MemberDTO.Response update(Long id, MemberDTO.Request request) {
        Member member = memberRepository.getOne(id);
        member.update(request.toEntity());
        memberRepository.save(member);
        return member.toResponse();
    }

    public void deleteMember(Long id) {
        memberRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public MemberDTO.Response getMyUserWithAuthorities() {
        Member member = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findOneWithAuthoritiesByUsername).orElse(null);
        assert member != null;
        return member.toResponse();
    }
}
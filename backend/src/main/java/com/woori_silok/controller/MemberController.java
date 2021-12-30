package com.woori_silok.controller;

import com.woori_silok.dto.MemberDTO;
import com.woori_silok.service.MemberService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(tags = {"Member"})
@RestController
@RequestMapping("members")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

    @ApiOperation(value = "회원 목록", notes = "회원목록을 조회한다.")
    @GetMapping("")
    public ResponseEntity<List<MemberDTO.Response>> get() {
        List<MemberDTO.Response> responseList = memberService.get();
        return new ResponseEntity<>(responseList, HttpStatus.OK);
    }

    @ApiOperation(value = "회원 생성", notes = "회원을 생성한다.")
    @PostMapping("")
    public ResponseEntity<String> create(@ApiParam(value = "회원", required = true) @RequestBody MemberDTO.Request request) {
        MemberDTO.Response response = memberService.create(request);
        return new ResponseEntity<>("email : " + response.getEmail(), HttpStatus.CREATED);
    }

    @ApiOperation(value = "나의 정보 조회", notes = "나의 정보를 조회한다.")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @GetMapping("/me")
    public ResponseEntity<MemberDTO.Response> getMyInfo() {
        return ResponseEntity.ok().body(memberService.getMyUserWithAuthorities());
    }
}

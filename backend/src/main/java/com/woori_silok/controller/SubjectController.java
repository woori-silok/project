package com.woori_silok.controller;

import com.woori_silok.domain.entity.Subject;
import com.woori_silok.dto.MemberDTO;
import com.woori_silok.service.MemberService;
import com.woori_silok.service.SubjectService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(tags = {"Subject"})
@RestController
@RequestMapping("subjects")
@RequiredArgsConstructor
public class SubjectController {
    private final SubjectService subjectService;

    @ApiOperation(value = "주제 목록", notes = "주제목록을 조회한다.")
    @GetMapping("")
    public ResponseEntity<List<Subject>> get() {
        List<Subject> responseList = subjectService.get();
        return new ResponseEntity<>(responseList, HttpStatus.OK);
    }

    @ApiOperation(value = "주제 생성", notes = "주제을 생성한다.")
    @PostMapping("")
    public ResponseEntity<String> create(@ApiParam(value = "주제", required = true) @RequestBody Subject subject) {
        Subject response = subjectService.create(subject);
        return new ResponseEntity<>("id : "+ response.getId(), HttpStatus.CREATED);
    }
}

package com.woori_silok.controller;

import com.woori_silok.dto.MinutesDTO;
import com.woori_silok.service.MinutesService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(tags = {"Minutes"})
@RestController
@RequestMapping("minutes")
@RequiredArgsConstructor
public class MinutesController {
    private final MinutesService minutesService;

    @ApiOperation(value = "회의록 목록", notes = "회의록목록을 조회한다.")
    @GetMapping("")
    public ResponseEntity<List<MinutesDTO.Response>> get(@ApiParam(value = "주제 ID", required = false) @RequestParam(required = false) Long subjectId) {
        List<MinutesDTO.Response> findMinutes = minutesService.get(subjectId);
        return new ResponseEntity<>(findMinutes, HttpStatus.OK);
    }

    @ApiOperation(value = "회의록 업데이트", notes = "회의록 정보를 업데이트 한다.")
    @PutMapping("{minutesId}")
    public ResponseEntity<String> update(@ApiParam(value = "회의록 ID", required = true) @PathVariable Long minutesId,
                                         @ApiParam(value = "변경 할 회의록 정보", required = true) @RequestBody MinutesDTO.Request request) {
        MinutesDTO.Response response = minutesService.update(minutesId, request);
        return new ResponseEntity<>("id : " + response.getMinutesId(), HttpStatus.OK);
    }

    @ApiOperation(value = "회의록 삭제", notes = "회의록 내용을 공란으로 바꾼다.")
    @DeleteMapping("{minutesId}")
    public ResponseEntity<?> delete(@ApiParam(value = "회의록 ID", required = true) @PathVariable Long minutesId) {
        minutesService.delete(minutesId);
        return ResponseEntity.noContent().build();
    }

    @ApiOperation(value = "회의록 공유", notes = "회의록을 메일로 전송한다.")
    @PostMapping("{minutesId}")
    public ResponseEntity<?> sendMail(@ApiParam(value = "회의록 ID", required = true) @PathVariable Long minutesId,
                                      @ApiParam(value = "수신자 메일 리스트", required = true) @RequestBody List<String> to) {
        minutesService.send(minutesId, to);
        return ResponseEntity.noContent().build();
    }
}

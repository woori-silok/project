package com.woori_silok.controller;

import com.woori_silok.dto.RoomDTO;
import com.woori_silok.service.RoomService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(tags = {"Room"})
@RestController
@RequestMapping("rooms")
@RequiredArgsConstructor
public class RoomController {
    private final RoomService roomService;

    @ApiOperation(value = "예약 가능한 회의실 목록", notes = "예약 가능한 회의실목록을 조회한다.")
    @GetMapping("")
    public ResponseEntity<List<RoomDTO>> get(@ApiParam(value = "조회할 날짜", required = true) @RequestParam String date,
                                             @ApiParam(value = "시작 시간", required = true) @RequestParam String startTime,
                                             @ApiParam(value = "종료 시간", required = true) @RequestParam String endTime) {
        List<RoomDTO> resultList = roomService.get(date, startTime, endTime);
        return new ResponseEntity<>(resultList, HttpStatus.OK);
    }
}
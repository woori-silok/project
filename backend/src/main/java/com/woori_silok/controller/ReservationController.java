package com.woori_silok.controller;

import com.woori_silok.domain.entity.Reservation;
import com.woori_silok.dto.ReservationDTO;
import com.woori_silok.service.ReservationService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(tags = {"Reservation"})
@RestController
@RequestMapping("reservations")
@RequiredArgsConstructor
public class ReservationController {
    private final ReservationService reservationService;

    @ApiOperation(value = "내 회의", notes = "내 회의를 조회한다.")
    @GetMapping("")
    public ResponseEntity<List<ReservationDTO.Response>> get(@AuthenticationPrincipal User user,
                                                             @ApiParam(value = "월", required = true) @RequestParam int month,
                                                             @ApiParam(value = "주", required = true) @RequestParam int week) {
        List<ReservationDTO.Response> findReservation = reservationService.get(user.getUsername(), month, week);
        return new ResponseEntity<>(findReservation, HttpStatus.OK);
    }

    @ApiOperation(value = "오늘의 회의", notes = "오늘의 회의를 조회한다.")
    @GetMapping("/today")
    public ResponseEntity<List<ReservationDTO.Response>> getToday(@AuthenticationPrincipal User user) {
        List<ReservationDTO.Response> findReservation = reservationService.getToday(user.getUsername());
        return new ResponseEntity<>(findReservation, HttpStatus.OK);
    }

    @ApiOperation(value = "참여중인 회의", notes = "참여중인 회의를 조회한다.")
    @GetMapping("/ongoing")
    public ResponseEntity<ReservationDTO.Response> find(@AuthenticationPrincipal User user) {
        ReservationDTO.Response response = reservationService.getOngoing(user.getUsername());
        return ResponseEntity.ok().body(response);
    }

    @ApiOperation(value = "예약 생성", notes = "예약을 생성한다.")
    @PostMapping("")
    public ResponseEntity<?> create(@ApiParam(value = "예약", required = true) @RequestBody ReservationDTO.Request request) {
        Reservation reservation = reservationService.create(request);
        return new ResponseEntity<>("id : " + reservation.getId(), HttpStatus.CREATED);
    }

    @ApiOperation(value = "예약 업데이트", notes = "예약 정보를 업데이트 한다.")
    @PutMapping("{reservationId}")
    public ResponseEntity<?> update(@ApiParam(value = "예약 ID", required = true) @PathVariable Long reservationId,
                                    @ApiParam(value = "변경 할 예약 정보", required = true) @RequestBody ReservationDTO.Request request) {
        Reservation reservation = reservationService.update(reservationId, request);
        return new ResponseEntity<>("id : " + reservation.getId(), HttpStatus.OK);
    }

    @ApiOperation(value = "예약 삭제", notes = "예약 정보를 삭제한다.")
    @DeleteMapping("{reservationId}")
    public ResponseEntity<?> delete(@ApiParam(value = "예약 ID", required = true) @PathVariable Long reservationId) {
        reservationService.delete(reservationId);
        return ResponseEntity.ok().build();
    }
}
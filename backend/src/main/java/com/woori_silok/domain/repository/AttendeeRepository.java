package com.woori_silok.domain.repository;

import com.woori_silok.domain.entity.Attendee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttendeeRepository extends JpaRepository<Attendee, Long> {
    void deleteByReservationId(Long id);
}

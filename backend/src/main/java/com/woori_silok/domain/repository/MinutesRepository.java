package com.woori_silok.domain.repository;

import com.woori_silok.domain.entity.Minutes;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MinutesRepository extends JpaRepository<Minutes, Long> {

    @EntityGraph(attributePaths = { "reservation", "files"})
    List<Minutes> findAll();

    @EntityGraph(attributePaths = { "reservation",  "files"})
    @Query("SELECT m FROM Minutes m left join fetch m.reservation WHERE m.reservation.subject.id = :subjectId")
    List<Minutes> findBySubjectId(Long subjectId);

    @EntityGraph(attributePaths = { "reservation", "files"})
    Minutes getOne(Long minutesId);
}

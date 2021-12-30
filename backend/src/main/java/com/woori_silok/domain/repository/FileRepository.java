package com.woori_silok.domain.repository;

import com.woori_silok.domain.entity.AttachFile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FileRepository extends JpaRepository<AttachFile, Long> {
    List<AttachFile> findByMinutesId(Long minutesId);
}


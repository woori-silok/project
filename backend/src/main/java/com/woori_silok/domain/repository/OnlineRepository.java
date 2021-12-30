package com.woori_silok.domain.repository;

import com.woori_silok.domain.entity.Minutes;
import com.woori_silok.domain.entity.Online;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OnlineRepository extends JpaRepository<Online, Long> {
}

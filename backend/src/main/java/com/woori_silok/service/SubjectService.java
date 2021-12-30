package com.woori_silok.service;

import com.woori_silok.domain.entity.Subject;
import com.woori_silok.domain.repository.SubjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SubjectService {
    private final SubjectRepository subjectRepository;

    @Transactional(readOnly = true)
    public List<Subject> get() {
        List<Subject> subjectList = subjectRepository.findAll();
        return subjectList;
    }

    public Subject create(Subject subject) {
        return subjectRepository.save(subject);
    }
}
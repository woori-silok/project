package com.woori_silok.service;

import com.woori_silok.domain.entity.AttachFile;
import com.woori_silok.domain.entity.Attendee;
import com.woori_silok.domain.entity.Minutes;
import com.woori_silok.domain.entity.Room;
import com.woori_silok.domain.repository.FileRepository;
import com.woori_silok.domain.repository.MinutesRepository;
import com.woori_silok.dto.AttachFileDTO;
import com.woori_silok.dto.MinutesDTO;
import com.woori_silok.util.MailSender;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MinutesService {
    private final MinutesRepository minutesRepository;
    private final FileRepository fileRepository;
    private final MailSender mailSender;

    @Transactional(readOnly = true)
    public List<MinutesDTO.Response> get(Long subjectId) {
        List<MinutesDTO.Response> responseList = new ArrayList<>();
        List<Minutes> minutesList;
        if (subjectId != null) {
            minutesList = minutesRepository.findBySubjectId(subjectId);
        } else {
            minutesList = minutesRepository.findAll();
        }
        for (Minutes minutes : minutesList) {
            MinutesDTO.Response response = minutes.toResponse();
            response.setStartTime(minutes.getReservation().getStartTime());
            response.setEndTime(minutes.getReservation().getEndTime());
            response.setAttendeeList(Attendee.toResponse(minutes.getReservation().getAttendeeList()));
            response.setRoomName(Optional.ofNullable(minutes.getReservation().getRoom()).map(Room::getName).orElse(null));
            response.setSubjectId(minutes.getReservation().getSubject().getId());
            response.setTitle(minutes.getReservation().getTitle());
            response.setCreatedDate(minutes.getCreatedDate().toString());

            List<AttachFileDTO> attachFileDTOList = new ArrayList<>();
            for (AttachFile attachFile : fileRepository.findByMinutesId(minutes.getId())) {
                AttachFileDTO attachFileDTO = AttachFileDTO.builder()
                        .id(attachFile.getId())
                        .name(attachFile.getFileName().substring(attachFile.getFileName().indexOf("_") + 1))
                        .build();
                attachFileDTOList.add(attachFileDTO);
            }
            response.setAttachFileDTOList(attachFileDTOList);

            responseList.add(response);
        }

        return responseList;
    }

    public MinutesDTO.Response update(Long id, MinutesDTO.Request request) {
        Minutes minutes = minutesRepository.getOne(id);
        minutes.update(request.toEntity());
        minutesRepository.save(minutes);
        return minutes.toResponse();
    }

    public void delete(Long id) {
        Minutes minutes = minutesRepository.getOne(id);
        minutes.setContent("");
        minutesRepository.save(minutes);
    }

    public void send(Long minutesId, List<String> to) {
        Minutes minutes = minutesRepository.getOne(minutesId);
        mailSender.send(minutes, to);
    }
}

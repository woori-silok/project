package com.woori_silok.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import com.woori_silok.domain.entity.AttachFile;
import com.woori_silok.domain.entity.Minutes;
import com.woori_silok.domain.repository.FileRepository;
import com.woori_silok.dto.AttachFileDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class FileService {
    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;
    private final AmazonS3 s3Client;
    private final FileRepository fileRepository;

    @Transactional
    public List<Long> upload(Long id, MultipartFile[] files) {
        List<Long> resultList = new ArrayList<>();
        for (MultipartFile file : files) {
            File fileObj = convertMultiPartFileToFile(file);
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            s3Client.putObject(new PutObjectRequest(bucketName, fileName, fileObj));
            fileObj.delete();

            Minutes minutes = Minutes.builder().id(id).build();
            AttachFile attachFile = AttachFile.builder()
                    .fileName(fileName)
                    .minutes(minutes)
                    .build();
            fileRepository.save(attachFile);
            resultList.add(attachFile.getId());
        }

        return resultList;
    }

    public AttachFileDTO download(Long id) {
        AttachFile attachFile = fileRepository.getOne(id);
        S3Object s3Object = s3Client.getObject(bucketName, attachFile.getFileName());
        S3ObjectInputStream inputStream = s3Object.getObjectContent();
        try {
            byte[] content = IOUtils.toByteArray(inputStream);
            return AttachFileDTO.builder()
                    .name(attachFile.getFileName().substring(attachFile.getFileName().indexOf("_") + 1))
                    .data(content)
                    .build();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public void delete(Long id) {
        AttachFile attachFile = fileRepository.getOne(id);
        s3Client.deleteObject(bucketName, attachFile.getFileName());
        fileRepository.deleteById(id);
    }

    private File convertMultiPartFileToFile(MultipartFile file) {
        File convertedFile = new File(file.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(convertedFile)) {
            fos.write(file.getBytes());
        } catch (IOException e) {
            log.error("Error converting multipartFile to file", e);
        }
        return convertedFile;
    }
}

package com.woori_silok.controller;

import com.woori_silok.dto.AttachFileDTO;
import com.woori_silok.service.FileService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.charset.StandardCharsets;
import java.util.List;

@Api(tags = {"File"})
@RestController
@RequestMapping("/files")
@RequiredArgsConstructor
public class FileController {
    private final FileService fileService;

    @ApiOperation(value = "다중 파일 업로드")
    @PostMapping("/upload/{minutesId}")
    public ResponseEntity<List<Long>> uploadFile(@ApiParam(value = "회의록 아이디", required = true) @PathVariable Long minutesId, @ApiParam(value = "파일 리스트", required = true) @RequestParam(value = "files") MultipartFile[] files) {
        List<Long> resultList = fileService.upload(minutesId, files);
        return new ResponseEntity<>(resultList, HttpStatus.CREATED);
    }

    @ApiOperation(value = "파일 다운로드")
    @GetMapping("/download/{fileId}")
    public ResponseEntity<ByteArrayResource> downloadFile(@ApiParam(value = "파일 아이디", required = true) @PathVariable Long fileId) {
        AttachFileDTO attachFileDTO = fileService.download(fileId);
        ContentDisposition contentDisposition = ContentDisposition.builder("attachment").filename(attachFileDTO.getName(), StandardCharsets.UTF_8).build();
        ByteArrayResource resource = new ByteArrayResource(attachFileDTO.getData());
        return ResponseEntity
                .ok()
                .contentLength(attachFileDTO.getData().length)
                .header("Content-type", "application/octet-stream")
                .header("Content-disposition", contentDisposition.toString())
                .body(resource);
    }

    @ApiOperation(value = "파일 삭제")
    @DeleteMapping("{fileId}")
    public ResponseEntity<String> deleteFile(@ApiParam(value = "파일 아이디", required = true) @PathVariable Long fileId) {
        fileService.delete(fileId);
        return ResponseEntity.noContent().build();
    }
}

package com.woori_silok.util;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.services.simpleemail.AmazonSimpleEmailService;
import com.amazonaws.services.simpleemail.model.RawMessage;
import com.amazonaws.services.simpleemail.model.SendRawEmailRequest;
import com.amazonaws.services.simpleemail.model.SendRawEmailResult;
import com.amazonaws.util.IOUtils;
import com.woori_silok.domain.entity.AttachFile;
import com.woori_silok.domain.entity.Minutes;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.commonmark.node.Node;
import org.commonmark.parser.Parser;
import org.commonmark.renderer.html.HtmlRenderer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.Session;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.nio.ByteBuffer;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Properties;
import java.util.stream.Collectors;

@Component
@Slf4j
@RequiredArgsConstructor
public class MailSender {
    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    private final AmazonSimpleEmailService amazonSimpleEmailService;
    private final AmazonS3 s3Client;

    public static final int FILE_NAME_LENGTH = 10;

    public void send(Minutes minutes, List<String> to) {

        List<File> files = new ArrayList<>();
        try {
            Session session = Session.getDefaultInstance(new Properties());
            MimeMessage message = new MimeMessage(session);
            MimeMultipart body = new MimeMultipart("mixed");
            String hostName = minutes.getReservation().getAttendeeList().stream().filter(attendee -> attendee.getIsHost() == true).findAny().get().getMember().getName();
            String subject = minutes.getReservation().getTitle();
            if (subject != null)
                message.setSubject(hostName + "님이 '" + subject+"' 회의록을 공유했습니다.", "UTF-8");

            message.setFrom(new InternetAddress("o0myself0o@naver.com"));

            String content = minutes.getContent();
            if (content == null) {
                log.error("null html-content");
            }

            MimeBodyPart textPart = new MimeBodyPart();
            Parser parser = Parser.builder().build();
            Node document = parser.parse(content);
            HtmlRenderer renderer = HtmlRenderer.builder().build();
            String renderd = renderer.render(document);
            textPart.setContent(renderd
                    + "https://woorisilok.ga/meeting-notes/" + minutes.getReservation().getSubject().getId() + "#" + minutes.getId(), "text/html; charset=UTF-8");
            textPart.setHeader("Content-Transfer-Encoding", "base64");
            body.addBodyPart(textPart);

            if (to == null)
                log.error("null to");
            message.setRecipients(MimeMessage.RecipientType.TO,
                    Arrays.stream(to.toArray(new String[to.size()])).collect(Collectors.joining(", ")));

            List<AttachFile> attachments = minutes.getFiles();
            if (attachments != null) {
                for (AttachFile attachment : attachments) {
                    String fileName = attachment.getFileName();
                    // create output file
                    File outputFile = new File("_" + RandomStringUtils.randomAlphabetic(FILE_NAME_LENGTH));
                    files.add(outputFile);
                    // decode the string and write to file
                    S3Object s3Object = s3Client.getObject(bucketName, attachment.getFileName());
                    S3ObjectInputStream inputStream = s3Object.getObjectContent();

                    byte[] decodedBytes = IOUtils.toByteArray(inputStream);
                    FileUtils.writeByteArrayToFile(outputFile, decodedBytes);
                    DataSource ds = new FileDataSource(outputFile);

                    if (!fileName.isEmpty()) {
                        MimeBodyPart filePart = new MimeBodyPart();
                        filePart.setFileName(fileName.split("_")[1]);
                        filePart.setDescription(fileName, "UTF-8");
                        filePart.setDataHandler(new DataHandler(ds));
                        body.addBodyPart(filePart);
                    } else {
                        log.error("El nombre de cada archivo adjunto es un campo obligatorio");
                    }
                }
            }
            message.setContent(body);
            log.info("[sendRawEmail] Attempting to send an email through Amazon SES using the AWS SDK for Java...");
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            message.writeTo(outputStream);

            RawMessage rawMessage = new RawMessage(ByteBuffer.wrap(outputStream.toByteArray()));
            SendRawEmailRequest sendRawEmailRequest = new SendRawEmailRequest(rawMessage);
            for (File file : files) {
                Files.delete(file.toPath());
            }
            SendRawEmailResult result = amazonSimpleEmailService.sendRawEmail(sendRawEmailRequest);
            if (result.getSdkHttpMetadata().getHttpStatusCode() == 200) {
                log.info("[AWS SES] 메일전송완료 => " + to);
            } else {
                log.error("[AWS SES] 메일전송 중 에러가 발생했습니다: {}", result.getSdkResponseMetadata().toString());
                log.error("발송실패 대상자: " + to + " / subject: " + minutes.getReservation().getTitle());
            }
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
    }
}
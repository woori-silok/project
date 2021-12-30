package com.woori_silok.member;

import com.woori_silok.domain.entity.Role;
import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import com.woori_silok.AcceptanceTest;
import com.woori_silok.dto.MemberDTO;

import static org.assertj.core.api.Assertions.assertThat;

public class MemberAcceptanceTest extends AcceptanceTest {
    public static final String EMAIL = "email@email.com";
    public static final String PASSWORD = "password";
    public static final String NEW_NAME = "hong";
    public static final String NAME = "hong";
    public static final String NEW_EMAIL = "newemail@email.com";
    public static final String NEW_PASSWORD = "newpassword";
    public static final Role NEW_ROLE = Role.ADMIN;
    public ExtractableResponse<Response> memberResponse;

    @BeforeEach
    public void setUp() {
        super.setUp();
        // when
        memberResponse = 회원_생성을_요청(EMAIL, NAME, PASSWORD, NEW_ROLE);
        // then
        회원_생성됨(memberResponse);
    }

    @DisplayName("회원 정보를 관리한다.")
    @Test
    void manageMember() {
        // when
        ExtractableResponse<Response> findResponse = 회원_정보_조회_요청(memberResponse);
        // then
        회원_정보_조회됨(findResponse, EMAIL);

        // when
        ExtractableResponse<Response> updateResponse = 회원_정보_수정_요청(memberResponse, NEW_EMAIL, NEW_NAME, NEW_PASSWORD, NEW_ROLE);
        // then
        회원_정보_수정됨(updateResponse);

        // when
        ExtractableResponse<Response> deleteResponse = 회원_삭제_요청(memberResponse);
        // then
        회원_삭제됨(deleteResponse);
    }

    public static ExtractableResponse<Response> 회원_생성을_요청(String email, String name, String password, Role role) {
        MemberDTO.Request memberRequest = new MemberDTO.Request(email, name, password);

        return RestAssured
                .given().log().all()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(memberRequest)
                .when().post("/member")
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> 회원_정보_조회_요청(ExtractableResponse<Response> response) {
        String uri = response.header("Location");

        return RestAssured
                .given().log().all()
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .when().get(uri)
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> 회원_정보_수정_요청(ExtractableResponse<Response> response, String email, String name, String password, Role role) {
        String uri = response.header("Location");
        MemberDTO.Request memberRequest = new MemberDTO.Request(email, name, password);

        return RestAssured
                .given().log().all()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(memberRequest)
                .when().put(uri)
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> 회원_삭제_요청(ExtractableResponse<Response> response) {
        String uri = response.header("Location");
        return RestAssured
                .given().log().all()
                .when().delete(uri)
                .then().log().all()
                .extract();
    }

    public static void 회원_생성됨(ExtractableResponse<Response> response) {
        assertThat(response.statusCode()).isEqualTo(HttpStatus.CREATED.value());
    }

    public static void 회원_정보_조회됨(ExtractableResponse<Response> response, String email) {
        MemberDTO.Response memberResponse = response.as(MemberDTO.Response.class);
        assertThat(memberResponse.getEmail()).isNotNull();
        assertThat(memberResponse.getEmail()).isEqualTo(email);
    }

    public static void 회원_정보_수정됨(ExtractableResponse<Response> response) {
        MemberDTO.Response memberResponse = response.as(MemberDTO.Response.class);
        assertThat(memberResponse.getEmail()).isNotNull();
        assertThat(memberResponse.getEmail()).isEqualTo(NEW_EMAIL);
        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
    }

    public static void 회원_삭제됨(ExtractableResponse<Response> response) {
        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
    }
}

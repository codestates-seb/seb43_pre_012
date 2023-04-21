package com.seb43_pre_12.preproject.auth.handler;

import com.google.gson.Gson;
import com.seb43_pre_12.preproject.exception.ErrorResponse;
import com.seb43_pre_12.preproject.member.entity.Member;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


// 로그인 인증이 성공했을 경우에 추가적인 처리(예. 로그 기록 , 사용자 정보 response 에 보내기)가 가능한 클래스
@Slf4j
public class MemberAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        log.info("### 로그인 인증이 성공적으로 되었습니다. ###");
        Member member = (Member) authentication.getPrincipal();
        log.info("### 접속 아이디(email) : " + member.getEmail() + " ###");

//        sendSuccessResponse(response);
    }
// TODO 로그인 인증에 성공할 경우, 회원의 정보를 json 타입으로 response 에 보내주는 로직 구현.

//    private void sendSuccessResponse(HttpServletRequest request, HttpServletResponse response) throws IOException {
//        Gson gson = new Gson();
//        Member member = request.getUserPrincipal()
////        ErrorResponse errorResponse = ErrorResponse.of(HttpStatus.UNAUTHORIZED);
//        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
//        response.setStatus(HttpStatus.OK.value());
//        response.getWriter().write(gson.toJson(errorResponse,ErrorResponse.class));
//    }
}

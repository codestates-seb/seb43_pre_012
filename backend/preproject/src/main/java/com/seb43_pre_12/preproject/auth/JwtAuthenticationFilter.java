package com.seb43_pre_12.preproject.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.seb43_pre_12.preproject.member.entity.Member;
import lombok.SneakyThrows;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenizer jwtTokenizer;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtTokenizer jwtTokenizer) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenizer = jwtTokenizer;
    }

    // 로그인 인증을 실행하는 메서드이다.
    @SneakyThrows  // request.getInputStream()을 호출하면 예외가 발생하는데 이 예외처리를 @SneakyThrows 로 처리 가능한 듯 하다.
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        // 클라이언트가 입력한 아이디와 비밀번호를 LoginDto로 역직렬화 해야하는데, 이때 objectMapper가 필요하다..
        ObjectMapper objectMapper = new ObjectMapper();

        // servletinputstream을 objectMapper를 이용해서 LoginDto 객체로 역직렬화 하는 코드
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);

        // 미인증된 인증토큰을 생성하고 토큰에 클라이언트가 입력한 아이디와 비밀번호를 담는다.
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getUsername(),loginDto.getPassword());

        // 생성한 미인증 토큰을 authenticationManager에게 넘겨주면, authenticationManager가 알아서 인증처리를 한다.
        // AuthenticationManager가 Custom UserDetailsService(MemberDetailsService)에게 사용자의 UserDetails 조회를 위임하는 방식.
        return authenticationManager.authenticate(authenticationToken);
    }
    // 로그인 인증이 성공될 경우 호출되는 메서드
    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {

        //AuthenticationManager 내부에서 인증이 성공하면, 인증된 authentication객체가 생성되고, 그 객체가 principal 필드에 할당된다.
        Member member = (Member) authResult.getPrincipal();

        // 토큰을 생성하는 private 메서드를 호출한다.
        String accessToken = delegateAccessToken(member);
        String refreshToken = delegateRefreshToken(member);

        // response의 헤더에 각각 Authorization, Refresh 항목의 헤더에 accessToken, refreshToken 을 보낸다.
        response.setHeader("Authorization","Bearer"+accessToken);
        response.setHeader("Refresh",refreshToken);

        getSuccessHandler().onAuthenticationSuccess(request,response,authResult);
    }
    // accessToken 을 생성하는 로직 (JwtTokenizer의 generateAccessToken 메서드를 결국 사용한다.)
    private String delegateAccessToken(Member member) {
        Map<String,Object> claims = new HashMap<>();
        claims.put("username",member.getUsername());
        claims.put("roles",member.getRoles());

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64AccessToken(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims,subject,expiration,base64EncodedSecretKey);

        return accessToken;
    }
    private String delegateRefreshToken(Member member) {

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64AccessToken(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }
}

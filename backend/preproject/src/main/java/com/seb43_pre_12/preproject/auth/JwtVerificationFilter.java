package com.seb43_pre_12.preproject.auth;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    public JwtVerificationFilter(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
    }

    // 특정 조건을 충족시키면 해당필터(jwtVerificationFilter)를 실행시키지 않고 다음 filter 로 건너뛰도록 해주는 메서드.
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String jwtAccessToken = request.getHeader("Authorization");

        return jwtAccessToken == null || !jwtAccessToken.startsWith("Bearer");
    }

    // JwtVerificationFilter가 작동하는 로직.
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        Map<String, Object> claims = verifyJws(request);
        setAuthenticationToContext(claims);

        // jwt 검증에 성공하고 SecurityContext에 authentication을 저장한 이후에는 다음 security filter 를 실행시켜야하는데, 그 코드임.
        filterChain.doFilter(request,response);
    }

    // JWT에서 claim을 추출(파싱)하는 메서드
    // claim을 추출하는 메서드인데 메서드 이름이 "JWT 검증" 인 이유
    // : JWT 에서 claim이 정상적으로 추출되었다는 의미는 해당 JWT가 정상적인 JWT 라는 것과 같은 의미.
    // JWT의 검증은 JWT를 검증하는 개별적인 메서드를 작성하기보다는 JWT 로 부터 claim 을 추출(파싱)하는 것으로 대신하는게 일반적인 개념.
    private Map<String ,Object> verifyJws(HttpServletRequest request) {
        // HttpServletRequest 객체에서 head의 정보에 접근할 수 있는데, 그중에서 Authorization 항목에 접근해서 JWT 토큰값을 얻는다.
        String jws = request.getHeader("Authorization").replace("Bearer ","");

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64AccessToken(jwtTokenizer.getSecretKey());

        // jwtTokenizer의 getClaims 메서드를 사용해서 Claim을 추출.(추출에 실패하면 경우에 맞는 예외가 발생한다.)
        // getClaims 의 리턴값은 Jws<Claims> 이라서, getBody 메서드를 사용하면 Map<String, Object> 객체로 받을 수 있다.
        Map<String ,Object> claims = jwtTokenizer.getClaims(jws,base64EncodedSecretKey).getBody();
        return claims;
    }
    private void setAuthenticationToContext(Map<String, Object> claims) {
        String username = (String)claims.get("username");
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List<String>)claims.get("roles"));
        Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);

        // SecurityContext에 authentication 객체를 저장.
        // SecurityContext에 authentication 을 저장하는 이유(목적)이 궁금..
        // 궁금한 이유. setAuthenticationToContext메서드는 "로그인 인증이 이.미. 완료된 이후에 호출되는" 메서드임. 그러니까, 로그인 인증은 이미 끝났고,
        // 사용자가 권한검증이 필요한 리소스에 접근 요청을 보냈을 때, requst에 실어서 보내는 jwt가 위변조된 jwt가 아닌지 검증과정에서 실행되는 메서드임.
        // 기존의 학습내용 기반으로는, SecurityContext에 authentication가 저장되는 시점은 "로그인 인증이 처리되는 과정 중"이고,
        // 저장되는 이유는 세션인증 방식에서 사용자의 로그인 인증정보를 context에 저장해두고 사용자에게 세션아이디를 제공함으로서,
        // 사용자는 세션아이디만 제공하는 것으로 본인이 로그인에 성공한 사용자임을 서버에게 알려줄수 있도록 하는 것이 그 목적이자 이유임.
        // 그런데, 현재 코드에서 SecurityContext에 authentication가 저장되는 것은 세션인증방식때와 시점 자체도 다르고, 그러기에 저장목적(이유)도 모르겠음.
        // 추측하기로는 JWT 방식임에도 사용자에게 세션아이디를 제공함으로서, 추후에 JWT를 재차 검증하는 과정을 생략하는 이점을 누리기 위한 것이 아닌지 생각되기도함..
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}

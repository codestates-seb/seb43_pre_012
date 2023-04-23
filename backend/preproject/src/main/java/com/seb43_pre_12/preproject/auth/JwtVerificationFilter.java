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
        // SecurityContext에 authentication 을 저장하는 이유(목적)
        // = 다음 차례 필터인 AuthorizationFilter가 SecurityContext에서 authentication객체를 받아서 권한검증에 사용한다.
        // 그러려면 앞선 단계 필터에서 SecurityContext에 authentication 객체를 저장해놔야한다.
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
/*
* <세션인증방식>
* AuthenticationFilter의 successfulAuthentication() 에서 유저의 인증(authentication)객체를 securityContext에 저장한다.
* SpringSecurity의 세션정책에 따라서 securityContext를 세션저장소에 저장하고, "request-response" 과정이 종료될 즈음 securityContext는 제거한다.
* 즉, 세션인증방식은 사용자인증정보를 securityContext가 아닌, 세션저장소에 유지하는 방식으로 인증상태를 유지하는 것이다.
* 세션방식은 로그인 인증 할때 securityContext 에 인증객체가 저장되고, securityContext 는 세션저장소에 저장된다.
*
* <JWT인증방식>
* AuthenticationFilter의 successfulAuthentication() 에서 유저의 인증(authentication)객체를 securityContext에 저장하지 않는다.
* JwtVerificationFilter 에서 유저의 인증객체를 securityContext에 저장한다. JwtVerificationFilter 는 AuthenticationFilter의 다음에 수행되는 필터이다.
* 하지만 세션인증방식처럼 securityContext를 세션저장소에 저장하지 않는다. 왜냐하면 SecurityConfig에서 세션정책을 STATELESS로 설정했기 때문이다.
* JWT방식은 리소스에 접근할때 securityContext 에 인증객체가 저장된다.
* */

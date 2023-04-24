package com.seb43_pre_12.preproject.config;

import com.seb43_pre_12.preproject.auth.CustomAuthorityUtils;
import com.seb43_pre_12.preproject.auth.JwtAuthenticationFilter;
import com.seb43_pre_12.preproject.auth.JwtTokenizer;
import com.seb43_pre_12.preproject.auth.JwtVerificationFilter;
import com.seb43_pre_12.preproject.auth.handler.MemberAuthenticationFailureHandler;
import com.seb43_pre_12.preproject.auth.handler.MemberAuthenticationSuccessHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.lang.reflect.Array;
import java.util.Arrays;

@Configuration
@EnableWebSecurity(debug = true)
public class SecurityConfiguration {
    private final JwtTokenizer jwtTokenizer; // 커스텀 필터 설정 클래스(configurer)를 만들 때 JwtAuthenticationFilter 객체 생성을 위해 필요함.
    private final CustomAuthorityUtils authorityUtils; // JwtVerificationFilter 객체 생성을 위해 필요함.

    public SecurityConfiguration(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()  // 스프링시큐리티는 csrf 공격방지를 위해, csrf token 을 수신후 검증함.
                .cors(Customizer.withDefaults())
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .apply(new CustomFilterConfigurer()) // apply() 메서드를 이용해서 커스터마이징 Configuration을 추가.
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers(HttpMethod.POST, "/members").permitAll() // 회원가입을 로그인 없이도 가능.
                        .antMatchers(HttpMethod.GET, "/members").hasRole("ADMIN") // 전체 회원 정보 조회는 관리자만 가능.
                        .antMatchers(HttpMethod.GET, "/members/").hasRole("ADMIN") // 전체 회원 정보 조회는 관리자만 가능.
                        .antMatchers(HttpMethod.GET, "/members/**").hasAnyRole("ADMIN","USER")
                        .antMatchers(HttpMethod.PATCH, "/members/**").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/members/**").hasRole("USER") // 특정 회원 정보 삭제는 회원 본인만 가능.

                        .antMatchers(HttpMethod.GET, "/questions").permitAll() // 전체 질문 조회는 로그인 없이도 가능.
                        .antMatchers(HttpMethod.GET, "/questions/**").permitAll() // 특정 질문 조회는 로그인 없이도 가능.
                        .antMatchers(HttpMethod.POST, "/questions").hasRole("USER")
                        .antMatchers(HttpMethod.PATCH, "/questions/**").hasAnyRole("USER","ADMIN") // 불량 질문의 경우 관리자가 수정 및 삭제 가능.
                        .antMatchers(HttpMethod.DELETE, "/questions/**").hasAnyRole("USER","ADMIN") // 불량 질문의 경우 관리자가 수정 및 삭제 가능.

                        .antMatchers(HttpMethod.GET, "/answers").hasRole("ADMIN") // 전체 답변 조회는 관리자만 가능
                        .antMatchers(HttpMethod.GET, "/answers/").hasRole("ADMIN") // 전체 답변 조회는 관리자만 가능
                        .antMatchers(HttpMethod.GET, "/answers/**").permitAll() // 특정 답변은 로그인 없이도 가능
                        .antMatchers(HttpMethod.POST, "/answers").hasRole("USER") // 답변 작성은 회원만 가능
                        .antMatchers(HttpMethod.PATCH, "/answers/**").hasAnyRole("USER","ADMIN") // 불량 답변의 경우 관리자가 수정 및 삭제 가능.
                        .antMatchers(HttpMethod.DELETE, "/answers/**").hasAnyRole("USER","ADMIN") // 불량 답변의 경우 관리자가 수정 및 삭제 가능.

                        .antMatchers(HttpMethod.GET, "/comments").hasRole("ADMIN") // 전체 댓글 조회는 관리자만 가능
                        .antMatchers(HttpMethod.GET, "/comments/").hasRole("ADMIN") // 전체 댓글 조회는 관리자만 가능
                        .antMatchers(HttpMethod.GET, "/comments/**").permitAll() // 특정 댓글 조회는 로그인 없이도 가능
                        .antMatchers(HttpMethod.POST, "/comments").hasRole("USER")
                        .antMatchers(HttpMethod.PATCH, "/comments/**").hasAnyRole("USER","ADMIN") // 불량 댓글의 경우 관리자가 수정 및 삭제 가능.
                        .antMatchers(HttpMethod.DELETE, "/comments/**").hasAnyRole("USER","ADMIN") // 불량 답변의 경우 관리자가 수정 및 삭제 가능.

                        .anyRequest().permitAll()

                );

        return httpSecurity.build();
    }
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(Arrays.asList("*"));
        corsConfiguration.setAllowedMethods(Arrays.asList("GET","POST", "PATCH", "DELETE"));

        //UrlBasedCorsConfigurationSource 는 CorsConfigurationSource 인터페이스를 구현한 클래스이다.
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**",corsConfiguration);
        return source;
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    // 커스텀 필터 설정기(Configurer)를 만들기 위한 코드. - 설정기의 객체를 apply메서드에 넣어주면 SpringSecurityFilter에 원하는 필터를 추가할수있다.
    // SpringSecurityFilter에 필터를 추가하기 위해서는 설정기(Configurur)를 이용해야한다 라고 개념적으로 인식하면됨.
    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            // AuthenticationManager는 인터페이스인데, getSharedObject메서드를 통해서 AuthenticationManager의 객체를 얻을수 있는 듯.
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            // JwtAuthenticationFilter 객체 생성.
            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager,jwtTokenizer);

            // JwtVerificationFilter 객체 생성.
            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer,authorityUtils);

            // 쉽게 말하면, 로그인 인증을 위한 엔드포인트(주소)를 설정하는 메서드임. setFilterProcessesUrl()
            jwtAuthenticationFilter.setFilterProcessesUrl("/login");

            // 로그인 인증에 성공 또는 실패했을 때 수행되는 핸들러 (핸들러를 작성했다고 끝이 아니고, 필터에 적용하는 작업이 필요함)
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            // addFilter로 JwtAuthenticationFilter 를 spring security filter에 추가할 수 있음.
            // 궁극적으로는 설정기의 객체를 apply() 메서드에 넣어줘야함.
            builder.addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }
}

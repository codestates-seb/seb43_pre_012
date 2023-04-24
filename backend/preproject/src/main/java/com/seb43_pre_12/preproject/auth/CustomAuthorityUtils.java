package com.seb43_pre_12.preproject.auth;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

// SpringSecurity member의 권한정보를 생성하거나 알아내는 클래스
@Component
public class CustomAuthorityUtils {
    private List<String> adminMailAddress = List.of("hw@email.com", "ny@email.com","sh@email.com","hj@email.com","jh@email.com","jm@email.com");//"admin@email.com";
    private String adminMailAddress2 = "admin@email.com";
    private final List<GrantedAuthority> ADMIN_ROLES = AuthorityUtils.createAuthorityList("ROLE_ADMIN","ROLE_USER");
    private final List<GrantedAuthority> USER_ROLES = AuthorityUtils.createAuthorityList("ROLE_USER");
    private final List<String> ADMIN_ROLES_STRING = List.of("ADMIN","USER");
    private final List<String> USER_ROLES_STRING = List.of("USER");

    // 로그인 할 때 UserDetailsService 가 member 의 권한 정보를 UserDetails에 담기 위해서 사용되는 메서드
    public List<GrantedAuthority> createAuthorities(List<String> roles) {
        List<GrantedAuthority> authorities = roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_"+role))
                .collect(Collectors.toList());
        return authorities;
    }

    // 회원가입 시에 member의 email에 따라서 권한정보를 생성해서 DB에 member의 권한 정보를 저장하기 위한 코드(MemberService-create 에서 사용)
    public List<String> createRoles(String email) {
        Iterator i = adminMailAddress.iterator();
        while(i.hasNext()) {
            if(email.equals(i.next())) {return ADMIN_ROLES_STRING;}
        }
        return USER_ROLES_STRING;
//        if(email.equals(adminMailAddress)) return ADMIN_ROLES_STRING;
//        else return USER_ROLES_STRING;
    }

//    public List<String> createRoles(String email) {
//        if(email.equals(adminMailAddress2)) return ADMIN_ROLES_STRING;
//        else return USER_ROLES_STRING;
//    }
}

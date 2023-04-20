package com.seb43_pre_12.preproject.member.service;

import com.seb43_pre_12.preproject.auth.CustomAuthorityUtils;
import com.seb43_pre_12.preproject.exception.BusinessLogicException;
import com.seb43_pre_12.preproject.exception.ExceptionCode;

import com.seb43_pre_12.preproject.member.entity.Member;
import com.seb43_pre_12.preproject.member.repositoy.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



import java.time.LocalDateTime;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@Slf4j
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder; // SpringSecurity
    private final CustomAuthorityUtils authorityUtils; // SpringSecurity

    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder, CustomAuthorityUtils authorityUtils) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
    }

    public Member createMember(Member member) {
        verifyExistsEmail(member.getEmail());

        // SpringSecurity password암호화
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        // SpringSecurity member 권한 저장
        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        return memberRepository.save(member);
    }

    public Member updateMember(Member member) {
        Member findMember = findVerifiedMember(member.getMemberId());

        Optional.ofNullable(member.getEmail())
                .ifPresent(email -> findMember.setEmail(email));
        Optional.ofNullable(member.getUsername())
                .ifPresent(username -> findMember.setUsername(username));
        Optional.ofNullable(member.getPassword())
                .ifPresent(password -> findMember.setPassword(password));
        Optional.ofNullable(member.getMemberStatus())
                .ifPresent(memberStatus -> findMember.setMemberStatus(memberStatus));
        findMember.setModifiedAt(LocalDateTime.now());

        return memberRepository.save(findMember);
    }

    @Transactional(readOnly = true)
    public Member findMember(long memberId) {
        Member findMember = findVerifiedMember(memberId);

//         comments 출력
//        findMember.getComments().forEach(comments -> log.info("comment={}", comments.getComment()));

        return findMember;
    }

    public List<Member> findMembers() {
        return memberRepository.findAll();
    }

    public void deleteMember(long memberId) {
        Member findMember = findVerifiedMember(memberId);

        memberRepository.delete(findMember);
    }

    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);

        return optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    private void verifyExistsEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }

}

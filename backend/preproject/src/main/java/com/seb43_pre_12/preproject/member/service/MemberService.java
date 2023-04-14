package com.seb43_pre_12.preproject.member.service;

import com.seb43_pre_12.preproject.member.entity.Member;
import com.seb43_pre_12.preproject.member.repositoy.MemberRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public Member createMember(Member member) {
        return memberRepository.save(member);
    }

    public Member updateMember(Member member) {
        return memberRepository.save(member);
    }

    public Member findMember(long memberId) {
        Member member = memberRepository.findById(memberId).get();

        return member;
    }

    public List<Member> findMembers() {
        List<Member> members = memberRepository.findAll();

        return members;
    }

    public void deleteMember(long memberId) {
        memberRepository.deleteById(memberId);
    }
}

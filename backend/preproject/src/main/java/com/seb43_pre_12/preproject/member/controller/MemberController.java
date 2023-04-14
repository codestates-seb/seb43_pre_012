package com.seb43_pre_12.preproject.member.controller;

import com.seb43_pre_12.preproject.member.dto.MemberPatchDto;
import com.seb43_pre_12.preproject.member.dto.MemberPostDto;
import com.seb43_pre_12.preproject.member.entity.Member;
import com.seb43_pre_12.preproject.member.mapper.MemberMapper;
import com.seb43_pre_12.preproject.member.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper mapper;

    public MemberController(MemberService memberService, MemberMapper mapper) {
        this.memberService = memberService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postMember(@RequestBody MemberPostDto requestBody) {
        Member member = memberService.createMember(mapper.memberPostDtoToMember(requestBody));

        return new ResponseEntity(mapper.memberToMemberResponseDto(member), HttpStatus.CREATED);
    }

    @PatchMapping("{memberId}")
    public ResponseEntity patchMember(@PathVariable("memberId") @Valid long memberId,
                                      @RequestBody MemberPatchDto requestBody) {
        requestBody.setMemberId(memberId);
        Member member = memberService.updateMember(mapper.memberPatchDtoToMember(requestBody));

        return new ResponseEntity(mapper.memberToMemberResponseDto(member), HttpStatus.OK);

    }

    @GetMapping("{memberId}")
    public ResponseEntity getMember(@PathVariable("memberId") long memberId) {
        Member member = memberService.findMember(memberId);

        return new ResponseEntity(mapper.memberToMemberResponseDto(member), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getMembers() {
        List<Member> members = memberService.findMembers();

        return new ResponseEntity(mapper.memberToMemberResponseDtos(members), HttpStatus.OK);
    }

    @DeleteMapping("{memberId}")
    public ResponseEntity deleteMember(@PathVariable("memberId") long memberId) {
        memberService.deleteMember(memberId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);

    }
}

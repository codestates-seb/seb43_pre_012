package com.seb43_pre_12.preproject.comments.dto;

import com.seb43_pre_12.preproject.member.entity.Member;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class CommentsPostDto {

    @NotBlank(message = "comment 입력은 필수입니다.")
    private String comment;
    private long memberId;
    private long answerId;

    public Member getMember() {
        Member member = new Member();
        member.setMemberId(memberId);
        return member;
    }
}

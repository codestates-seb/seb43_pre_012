package com.seb43_pre_12.preproject.comments.dto;

import com.seb43_pre_12.preproject.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CommentsResponseDto {

    private long commentId;
    private String comment;
    private long memberId;
    private long answerId;

    public void setMember(Member member) {
        this.memberId = member.getMemberId();
    }

}

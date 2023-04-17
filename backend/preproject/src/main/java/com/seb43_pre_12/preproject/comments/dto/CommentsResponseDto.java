package com.seb43_pre_12.preproject.comments.dto;

import com.seb43_pre_12.preproject.answers.entity.Answer;
import com.seb43_pre_12.preproject.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class CommentsResponseDto {

    private long commentId;
    private String comment;
    private long memberId;
    private long answerId;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

//    public void setMember(Member member) {
//        this.memberId = member.getMemberId();
//    }
//
//    public void setAnswer(Answer answer) {
//        this.answerId = answer.getAnswerId();
//    }
}

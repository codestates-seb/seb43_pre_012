package com.seb43_pre_12.preproject.comments.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
@AllArgsConstructor
public class CommentsPatchDto {

    private long commentId;

    @NotBlank(message = "comment 입력은 필수입니다.")
    private String comment;
    private long memberId;
    private long answerId;

    public void setCommentId(long commentId) {
        this.commentId = commentId;
    }

    public void setMemberId(long memberId) {
        this.memberId = memberId;
    }

    public void setAnswerId(long answerId) {
        this.answerId = answerId;
    }
}

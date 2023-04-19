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

    public void setCommentId(long commentId) {
        this.commentId = commentId;
    }
}

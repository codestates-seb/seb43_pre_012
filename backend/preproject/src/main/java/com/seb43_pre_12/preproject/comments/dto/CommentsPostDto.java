package com.seb43_pre_12.preproject.comments.dto;


import com.seb43_pre_12.preproject.answers.entity.Answer;
import com.seb43_pre_12.preproject.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;



import javax.validation.constraints.NotBlank;

@Getter

@Setter

public class CommentsPostDto {

    @NotBlank(message = "comment 입력은 필수입니다.")
    private String comment;


}

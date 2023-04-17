package com.seb43_pre_12.preproject.answers.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter // 테스팅을 위해서 필요함!
public class AnswerPostDto {
    @NotBlank(message = "답변 내용이 작성되지 않았습니다.")
    private String content;
}

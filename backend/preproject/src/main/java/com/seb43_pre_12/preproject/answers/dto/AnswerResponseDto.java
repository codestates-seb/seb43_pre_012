package com.seb43_pre_12.preproject.answers.dto;

import com.seb43_pre_12.preproject.answers.entity.Answer;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class AnswerResponseDto {
    private Long answerId;
    private String content;
    private Answer.Selected selected;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;


}

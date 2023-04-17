package com.seb43_pre_12.preproject.question.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class QuestionPostDto {

    @NotNull(message = "제목은 공란이 아니어야 합니다.")
    private String title;

    @NotNull(message = "내용을 작성해주세요")
    private String content;
}

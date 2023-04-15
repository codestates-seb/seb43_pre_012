package com.seb43_pre_12.preproject.question.dto;

import com.seb43_pre_12.preproject.question.entity.Question;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class QuestionResponseDto {
    private Long questionId;
    private String title;
    private String content;
    private LocalDateTime created_at;
    private LocalDateTime modified_at;
    private int memberId;
    private Question.QuestionStatus questionStatus;

    public String getQuestionStatus(){
        return questionStatus.getStatus();
    }
}

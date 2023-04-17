package com.seb43_pre_12.preproject.question.dto;

import com.seb43_pre_12.preproject.question.entity.Question;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuestionResponseDto {
    private Long questionId;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private int memberId;
    private Question.QuestionStatus questionStatus;

    public String getQuestionStatus(){
        return questionStatus.getStatus();
    }
}

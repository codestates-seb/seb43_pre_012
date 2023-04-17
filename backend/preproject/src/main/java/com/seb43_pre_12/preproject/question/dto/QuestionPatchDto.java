package com.seb43_pre_12.preproject.question.dto;

import com.seb43_pre_12.preproject.question.entity.Question;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class QuestionPatchDto {
    private Long questionId;

    private String title;

    private String content;

    private Question.QuestionStatus questionStatus;

    public void setQuestionId(long questionId){
        this.questionId=questionId;
    }
}

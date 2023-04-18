package com.seb43_pre_12.preproject.question.dto;



import com.seb43_pre_12.preproject.answers.validator.NotSpace;

import com.seb43_pre_12.preproject.question.entity.Question;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class QuestionDto {

    @Getter
    @AllArgsConstructor
    public static class Post{

        @NotNull(message = "제목은 공란이 아니어야 합니다.")

        @NotSpace
        private String title;

        @NotNull(message = "내용을 작성해주세요")
        @NotSpace


        private String content;

    }
    @Getter
    @AllArgsConstructor
    public static class Patch{

        private Long questionId;

        private String title;

        private String content;
        public void setQuestionId(long questionId){
            this.questionId=questionId;
        }

    }
    @AllArgsConstructor
    @Getter
    public static class Response{

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
}
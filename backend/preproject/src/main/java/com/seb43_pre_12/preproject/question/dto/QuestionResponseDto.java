package com.seb43_pre_12.preproject.question.dto;

import com.seb43_pre_12.preproject.answers.entity.Answer;
import com.seb43_pre_12.preproject.member.entity.Member;
import com.seb43_pre_12.preproject.question.entity.Question;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class QuestionResponseDto {
    private Long questionId;
    private String title;
    private String content;
    private long memberId;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private Question.QuestionStatus questionStatus;

    // 수정사항
    private long answerCount;
    private String username;

//    public void setMember(Member member) {
//        this.memberId = member.getMemberId();
//    }
}

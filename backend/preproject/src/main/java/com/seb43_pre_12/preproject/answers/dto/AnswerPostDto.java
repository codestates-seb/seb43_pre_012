package com.seb43_pre_12.preproject.answers.dto;

import com.seb43_pre_12.preproject.member.entity.Member;
import com.seb43_pre_12.preproject.question.entity.Question;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Getter
@Setter // 테스팅을 위해서 필요함!
public class AnswerPostDto {
    @NotBlank(message = "답변 내용이 작성되지 않았습니다.")
    private String content;

    @Positive
    private long questionId;

    @Positive
    private long memberId;

    public Question getQuestion() {
        Question question = new Question();
        question.setQuestionId(questionId);

        return question;
    }

    public Member getMember() {
        Member member = new Member();
        member.setMemberId(memberId);

        return member;
    }

}

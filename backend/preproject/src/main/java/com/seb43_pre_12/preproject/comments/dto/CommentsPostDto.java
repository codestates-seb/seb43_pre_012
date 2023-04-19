package com.seb43_pre_12.preproject.comments.dto;


import com.seb43_pre_12.preproject.answers.entity.Answer;
import com.seb43_pre_12.preproject.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;



import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Getter
@Setter
public class CommentsPostDto {

    @Positive
    private long memberId;
    @Positive
    private long answerId;

    @NotBlank(message = "comment 입력은 필수입니다.")
    private String comment;

    public Member getMember() {
        Member member = new Member();
        member.setMemberId(memberId);
        return member;
    }

    public Answer getAnswer() {
        Answer answer = new Answer();
        answer.setAnswerId(answerId);
        return answer;
    }


}

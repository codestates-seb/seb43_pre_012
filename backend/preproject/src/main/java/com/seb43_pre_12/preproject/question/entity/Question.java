package com.seb43_pre_12.preproject.question.entity;

import com.seb43_pre_12.preproject.member.entity.Member;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Builder
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;
    @Column(length=100, nullable = false)
    private String title;
    @Column(nullable = false)
    private String content;
    @CreationTimestamp
    @Column(nullable=false)
    private LocalDateTime createdAt = LocalDateTime.now();
    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime modifiedAt = LocalDateTime.now();

    @Enumerated(value = EnumType.STRING)
    @Column(length = 30, nullable = false)
    private QuestionStatus questionStatus = QuestionStatus.QUESTION_OPEN;

    // 연관 관계 매핑 - memberId 와
    @ManyToOne
    @JoinColumn(name="MEMBER_ID")
    private Member member;

    public void addMember(Member member){
        this.member=member;
    }

    public enum QuestionStatus{
        QUESTION_OPEN("질문 등록"),
        QUESTION_UPDATE("질문 수정"),
        QUESTION_ANSWERED("답변 등록"),
        QUESTION_CLOSED("질문 해결"),
        QUESTION_DELETED("질문 삭제");

        @Getter
        private String status;
        QuestionStatus(String status){
            this.status = status;
        }
    }

}
package com.seb43_pre_12.preproject.question.entity;



import com.seb43_pre_12.preproject.answers.entity.Answer;
import com.seb43_pre_12.preproject.comments.entity.Comments;
import com.seb43_pre_12.preproject.member.entity.Member;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

import java.util.ArrayList;
import java.util.List;


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


    // 연관관계 매핑
    // N : 1(Member) 단방향 매핑
    @ManyToOne
    @JoinColumn(name="MEMBER_ID")
    private Member member;

    public void addMember(Member member){
        this.member=member;
    }

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    List<Answer> answers = new ArrayList<>();




    public enum QuestionStatus{
        QUESTION_OPEN("QUESTION_OPEN"),
        QUESTION_UPDATE("QUESTION_UPDATE"),
        QUESTION_ANSWERED("QUESTION_ANSWERED"),
        QUESTION_CLOSED("QUESTION_CLOSED"),
        QUESTION_DELETED("QUESTION_DELETED");



        @Getter
        private String status;
        QuestionStatus(String status){
            this.status = status;
        }
    }

}
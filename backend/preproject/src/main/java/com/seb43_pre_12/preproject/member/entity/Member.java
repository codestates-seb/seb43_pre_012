package com.seb43_pre_12.preproject.member.entity;

import com.seb43_pre_12.preproject.answers.entity.Answer;
import com.seb43_pre_12.preproject.comments.entity.Comments;
import com.seb43_pre_12.preproject.question.entity.Question;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false, updatable = false, unique = true)
    private String email;

    @Column(length = 100, nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(length = 20, nullable = false)
    private MemberStatus memberStatus = MemberStatus.MEMBER_ACTIVE;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false, name = "LAST_MODIFIED_AT")
    private LocalDateTime modifiedAt = LocalDateTime.now();

    // N : 1(Member) 양방향 매핑
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Comments> comments = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Answer> answers = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Question> questions = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)  // SpringSecurity 권한 컬럼 생성용
    private List<String> roles = new ArrayList<>();

    public void setComments(Comments comment) {
        comments.add(comment);
        if (comment.getMember() != this) {
            comment.setMember(this);
        }
    }

    public void setAnswer(Answer answer) {
        answers.add(answer);
        if (answer.getMember() != this) {
            answer.setMember(this);
        }
    }

    public void setQuestion(Question question) {
        questions.add(question);
        if (question.getMember() != this) {
            question.setMember(this);
        }
    }

    public void addAnswer(Answer answer){
        answers.add(answer);
    }
    public void addQuestion(Question question){
        questions.add(question);
    }

    public void addComment(Comments comment){
        comments.add(comment);
    }

    public enum MemberStatus {
        MEMBER_ACTIVE("활동중"),
        MEMBER_SLEEP("휴면 상태"),
        MEMBER_QUIT("탈퇴 상태");

        @Getter
        private String status;

        MemberStatus(String status) {
            this.status = status;
        }
    }
}


package com.seb43_pre_12.preproject.answers.entity;

import com.fasterxml.jackson.annotation.JsonCreator;

import com.seb43_pre_12.preproject.comments.entity.Comments;
import com.seb43_pre_12.preproject.member.entity.Member;
import com.seb43_pre_12.preproject.question.entity.Question;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

@Getter
@Setter
@Entity
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;

    @Column(nullable = false)
    private String content;

    @Enumerated(value = EnumType.STRING) //todo enum으로 하는게 좋을지, Boolean으로 하는게 좋을지. + enum이면 json 어떻게 받아야?
    @Column(nullable = false)
    private Selected selected = Selected.ANSWER_NOT_SELECTED;
    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    @Column(nullable = false)
    private LocalDateTime modifiedAt = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    Member member;

    @ManyToOne
    @JoinColumn(name = "QUESTION_ID")
    Question question;
//    todo 질문이 삭제 될 때, 질문에 달린 답변도 삭제되어야 함으로, 질문 엔티티에 cascade 설정이 되어있어야 한다.

    @OneToMany(mappedBy = "answer", cascade = CascadeType.ALL)
    List<Comments> comments = new ArrayList<>();


    public enum Selected {
        ANSWER_SELECTED("ANSWER_SELECTED"),
        ANSWER_NOT_SELECTED("ANSWER_NOT_SELECTED");
        @Getter
        private String status;

        Selected(String status) {
            this.status = status;
        }

//        @JsonCreator(mode = JsonCreator.Mode.DELEGATING)
//        public static Selected findByCode(String code) {
//            return Stream.of(Selected.values())
//                    .filter(c -> c.status.equals(code))
//                    .findFirst()
//                    .orElse(null);
//        }

    }
}

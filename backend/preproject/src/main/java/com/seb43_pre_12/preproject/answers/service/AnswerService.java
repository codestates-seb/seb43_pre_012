package com.seb43_pre_12.preproject.answers.service;

import com.seb43_pre_12.preproject.answers.entity.Answer;
import com.seb43_pre_12.preproject.exception.BusinessLogicException;
import com.seb43_pre_12.preproject.answers.repository.AnswerRepository;
import com.seb43_pre_12.preproject.exception.ExceptionCode;
import com.seb43_pre_12.preproject.member.service.MemberService;
import com.seb43_pre_12.preproject.question.service.QuestionService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AnswerService {
    private final AnswerRepository repository;
    private final MemberService memberService;
    private final QuestionService questionService;
    public AnswerService(AnswerRepository repository, MemberService memberService, QuestionService questionService) {
        this.repository = repository;
        this.memberService = memberService;
        this.questionService = questionService;
    }

    public Answer createAnswer(Answer answer) {
        answer.setMember(memberService.findMember(1L));
        answer.setQuestion(questionService.findQuestion(1L));
        return repository.save(answer);
    }
    public Answer updateAnswer(Answer answer) {
        Answer findAnswer = findVerifedAnswer(answer.getAnswerId());

        Optional.ofNullable(answer.getContent()).ifPresent(content -> findAnswer.setContent(content));
        Optional.ofNullable(answer.getSelected()).ifPresent(selected -> findAnswer.setSelected(selected));
        Optional.ofNullable(answer.getMember()).ifPresent(member -> findAnswer.setMember(member));
        Optional.ofNullable(answer.getQuestion()).ifPresent(question -> findAnswer.setQuestion(question));

        findAnswer.setModifiedAt(LocalDateTime.now());

        return repository.save(findAnswer);
    }
    public Answer findAnswer(long answerId) {
        return findVerifedAnswer(answerId);
    }

    //TODO 무한스크롤(페이지네이션) 구현해야함!
//    public List<Answer> findAnswers() {
//
//    }
    public void deleteAnswer(long answerId) {
        repository.delete(findVerifedAnswer(answerId));
    }

    private Answer findVerifedAnswer(long answerId) {
        Optional<Answer> optionalAnswer = repository.findById(answerId);
        return optionalAnswer.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));
    }
}

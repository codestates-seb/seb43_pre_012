package com.seb43_pre_12.preproject.answers.service;

import com.seb43_pre_12.preproject.answers.entity.Answer;
import com.seb43_pre_12.preproject.exception.BusinessLogicException;
import com.seb43_pre_12.preproject.answers.repository.AnswerRepository;
import com.seb43_pre_12.preproject.exception.ExceptionCode;
import com.seb43_pre_12.preproject.member.entity.Member;
import com.seb43_pre_12.preproject.member.repositoy.MemberRepository;
import com.seb43_pre_12.preproject.member.service.MemberService;
import com.seb43_pre_12.preproject.question.entity.Question;
import com.seb43_pre_12.preproject.question.service.QuestionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AnswerService {
    private final AnswerRepository repository;
    private final MemberService memberService;
    private final QuestionService questionService;
    private final MemberRepository memberRepository;
//    public AnswerService(AnswerRepository repository, MemberService memberService, QuestionService questionService) {
//        this.repository = repository;
//        this.memberService = memberService;
//        this.questionService = questionService;
//    }

    public AnswerService(AnswerRepository repository, MemberService memberService, QuestionService questionService, MemberRepository memberRepository) {
        this.repository = repository;
        this.memberService = memberService;
        this.questionService = questionService;
        this.memberRepository = memberRepository;
    }

    public Answer createAnswer(Answer answer) {
        Question question = verifyExistingQuestion(answer.getQuestion());
        Member member = verifyExistingMember(answer.getMember());

        answer.setQuestion(question);
        answer.setMember(member);

        question.addAnswers(answer);
        member.addAnswer(answer);

        return repository.save(answer);
    }
    public Answer updateAnswer(Answer answer) {
        String loginEmail = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String questionOwnerEmail = findVerifedAnswer(answer.getAnswerId()).getQuestion().getMember().getEmail();
        String answerOwnerEmail = findVerifedAnswer(answer.getAnswerId()).getMember().getEmail();
        List<String> adminMailAddress = List.of("hw@email.com", "ny@email.com","sh@email.com","hj@email.com","jh@email.com","jm@email.com");

        Answer findAnswer = findVerifedAnswer(answer.getAnswerId());

        if( adminMailAddress.contains(loginEmail)) {
            Optional.ofNullable(answer.getContent()).ifPresent(content -> findAnswer.setContent(content)); // 관리자, 답변작성자 만 수정가능
            Optional.ofNullable(answer.getSelected()).ifPresent(selected -> findAnswer.setSelected(selected));// 관리자, 질문작성자 만 수정가능
        }

        if(loginEmail.equals(answerOwnerEmail) || loginEmail.equals(questionOwnerEmail)) {
            if(loginEmail.equals(answerOwnerEmail)) {
                Optional.ofNullable(answer.getContent()).ifPresent(content -> findAnswer.setContent(content)); // 관리자, 답변작성자 만 수정가능
            }
            if (loginEmail.equals(questionOwnerEmail)) {
                Optional.ofNullable(answer.getSelected()).ifPresent(selected -> findAnswer.setSelected(selected));// 관리자, 질문작성자 만 수정가능
            }
        } else if (adminMailAddress.contains(loginEmail)) {}
        else throw  new BusinessLogicException(ExceptionCode.MEMBER_NOT_VALID);

//        Optional.ofNullable(answer.getMember()).ifPresent(member -> findAnswer.setMember(member));
//        Optional.ofNullable(answer.getQuestion()).ifPresent(question -> findAnswer.setQuestion(question));

        findAnswer.setModifiedAt(LocalDateTime.now());

        return repository.save(findAnswer);
    }
    public Answer findAnswer(long answerId) {
        return findVerifedAnswer(answerId);
    }

    //TODO 무한스크롤(페이지네이션) 구현해야함!
    public Page<Answer> findAnswers(int page, int size) {
        return repository.findAll(PageRequest.of(page,size,
                Sort.by("createdAt").descending()));
    }


    public void deleteAnswer(long answerId) {
        verifyAuthorizedMember(answerId);
        repository.delete(findVerifedAnswer(answerId));
    }

    private Answer findVerifedAnswer(long answerId) {
        Answer answer = repository.findById(answerId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));
        return answer;
//        Optional<Answer> optionalAnswer = repository.findById(answerId);
//        return optionalAnswer.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));
    }

    private Question verifyExistingQuestion(Question question){
        return questionService.findVerifiedQuestion(question.getQuestionId());
    }

    private Member verifyExistingMember(Member member) {
        return memberService.findVerifiedMember(member.getMemberId());
    }
    private void verifyAuthorizedMember(Long answerId) {
        // 현재 로그인한 회원의 이메일을 찾는 로직
        String loginEmail = (String)SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // 댭변을 작성한 회원 객체를 찾는 로직
        String AnswerOwnerEmail = findVerifedAnswer(answerId).getMember().getEmail();
        // 관리자 계정 리스
        List<String> adminMailAddress = List.of("hw@email.com", "ny@email.com","sh@email.com","hj@email.com","jh@email.com","jm@email.com");

        // 댭변을 작성한 회원 객체의 email 과 로그인한 회원의 email 이 동일한지 조건문을 통해서 검사한다.
        if(adminMailAddress.contains(loginEmail)) return;
        else if (loginEmail.equals(AnswerOwnerEmail)) return;
        else throw  new BusinessLogicException(ExceptionCode.MEMBER_NOT_VALID);
    }
}

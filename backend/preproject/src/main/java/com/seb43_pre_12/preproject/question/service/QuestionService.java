package com.seb43_pre_12.preproject.question.service;

import com.seb43_pre_12.preproject.auth.JwtTokenizer;
import com.seb43_pre_12.preproject.exception.BusinessLogicException;
import com.seb43_pre_12.preproject.exception.ExceptionCode;
import com.seb43_pre_12.preproject.member.entity.Member;
import com.seb43_pre_12.preproject.member.repositoy.MemberRepository;
import com.seb43_pre_12.preproject.member.service.MemberService;
import com.seb43_pre_12.preproject.question.entity.Question;
import com.seb43_pre_12.preproject.question.repository.QuestionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.Optional;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final MemberService memberService;

    public QuestionService(QuestionRepository questionRepository, MemberService memberService) {
        this.questionRepository = questionRepository;
        this.memberService = memberService;
    }

    public Question createQuestion(Question question) {
        Member member = verifyExistingMember(question.getMember());
        question.setMember(member);

        member.setQuestion(question);

        return questionRepository.save(question);

//        question.setMember(memberService.findMember(1L));
//
//        return questionRepository.save(question);
    }
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public Question updateQuestion(Question question){
        verifyAuthorizedMember(question.getQuestionId());

        Question findQuestion = findVerifiedQuestion(question.getQuestionId());

        Optional.ofNullable(question.getContent())
                .ifPresent(content -> findQuestion.setContent(content));
        Optional.ofNullable(question.getTitle())
                .ifPresent(title->findQuestion.setTitle(title));
        Optional.ofNullable(question.getQuestionStatus())
                .ifPresent(questionStatus -> findQuestion.setQuestionStatus(questionStatus));
        Optional.ofNullable(question.getMember())
                .ifPresent(member -> findQuestion.setMember(member));

        return questionRepository.save(findQuestion);

    }
    public Question findQuestion(Long questionId){

        return findVerifiedQuestion(questionId);

    }
    public Page<Question> findQuestions(int page, int size) {
        return questionRepository.findAll(PageRequest.of(page,size,
                Sort.by("createdAt").descending()));
    }
    public void deleteQuestion(Long questionId){
        verifyAuthorizedMember(questionId);

        Question findQuestion = findVerifiedQuestion(questionId);

        questionRepository.delete(findQuestion);

    }

    @Transactional(readOnly = true)
    public Question findVerifiedQuestion(Long questionId){
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);

        Question findQuestion = optionalQuestion.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));

        return findQuestion;
    }

    private Member verifyExistingMember(Member member){
        return memberService.findVerifiedMember(member.getMemberId());
    }

    private void verifyAuthorizedMember(Long questionId) {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = securityContext.getAuthentication();
        String memberEmail = (String)authentication.getPrincipal();

        // 질문을 작성한 회원 객체를 찾는 로직
        Question findQuestion = findVerifiedQuestion(questionId);
        Member ownerOfQuestion = findQuestion.getMember();
        final String questionOwnerEmail = ownerOfQuestion.getEmail();
        // 질문을 작성한 회원 객체의 email 과 로그인한 회원의 email 이 동일한지 조건문을 통해서 검사한다.
        if(!memberEmail.equals(ownerOfQuestion.getEmail())) throw  new BusinessLogicException(ExceptionCode.MEMBER_NOT_VALID);

        }
    }

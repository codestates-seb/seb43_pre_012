package com.seb43_pre_12.preproject.question.service;

import com.seb43_pre_12.preproject.exception.BusinessLogicException;
import com.seb43_pre_12.preproject.exception.ExceptionCode;
import com.seb43_pre_12.preproject.question.entity.Question;
import com.seb43_pre_12.preproject.question.repository.QuestionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public Question updateQuestion(Question question){
        Question findQuestion = findVerifiedQuestion(question.getQuestionId());

        Optional.ofNullable(question.getContent())
                .ifPresent(content -> findQuestion.setContent(content));
        Optional.ofNullable(question.getTitle())
                .ifPresent(title->findQuestion.setTitle(title));
        Optional.ofNullable(question.getQuestionStatus())
                .ifPresent(questionStatus -> findQuestion.setQuestionStatus(questionStatus));

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
}

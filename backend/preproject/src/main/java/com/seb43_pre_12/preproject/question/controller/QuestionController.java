package com.seb43_pre_12.preproject.question.controller;

import com.seb43_pre_12.preproject.dto.MultiResponseDto;
import com.seb43_pre_12.preproject.question.dto.QuestionPatchDto;
import com.seb43_pre_12.preproject.question.dto.QuestionPostDto;
import com.seb43_pre_12.preproject.question.entity.Question;
import com.seb43_pre_12.preproject.question.mapper.QuestionMapper;
import com.seb43_pre_12.preproject.question.service.QuestionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

import java.util.List;

@RestController
@RequestMapping("/questions")
@Validated
@Slf4j
public class QuestionController {


private final static String QUESTION_DEFAULT_URL ="/questions";


    private final QuestionService questionService;
    private final QuestionMapper mapper;

    public QuestionController(QuestionService questionService, QuestionMapper mapper) {
        this.questionService = questionService;
        this.mapper = mapper;
    }

    // 질문 등록
    @PostMapping

    public ResponseEntity postQuestion(@Valid @RequestBody QuestionPostDto questionPostDto){

        Question question = mapper.questionPostDtoToQuestion(questionPostDto);
        question.setQuestionStatus(Question.QuestionStatus.QUESTION_OPEN);

        Question response = questionService.createQuestion(question);
        URI uri = UriComponentsBuilder.newInstance()
                .path("/questions/" + question.getQuestionId())
                .build().toUri();

        return ResponseEntity.created(uri).build();



    }
    // 질문 수정
    @PatchMapping("/{question-id}")
    public ResponseEntity patchQuestion(@PathVariable("question-id") @Positive Long questionId,
                                        @Valid @RequestBody QuestionPatchDto questionPatchDto){
        questionPatchDto.setQuestionId(questionId);
        questionPatchDto.setQuestionStatus(Question.QuestionStatus.QUESTION_UPDATE);
        Question response= questionService.updateQuestion(mapper.questionPatchDtoToQuestion(questionPatchDto));

        return new ResponseEntity<>(mapper.questionToQuestionResponseDto(response), HttpStatus.OK);
    }

    // 질문 삭제
    @DeleteMapping("/{question-id}")
    public ResponseEntity deleteQuestion(@PathVariable("question-id") @Positive Long questionId){

        System.out.println("delete Question");
        questionService.deleteQuestion(questionId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);

    }

    // 특정 질문 조회
    @GetMapping("/{question-id}")
    public ResponseEntity getQuestion(@PathVariable("question-id") @Positive Long questionId){
        Question response = questionService.findQuestion(questionId);

        return new ResponseEntity<>(mapper.questionToQuestionResponseDto(response), HttpStatus.OK);

    }

    // 전체 질문 조회
    @GetMapping
    public ResponseEntity getQuestions(@Positive @RequestParam int page,
                                       @Positive @RequestParam int size){

        Page<Question> pageQuestions = questionService.findQuestions(page-1, size);
        List<Question> questions = pageQuestions.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.questionsToQuestionResponses(questions),
                        pageQuestions),
                HttpStatus.OK);
    }
}
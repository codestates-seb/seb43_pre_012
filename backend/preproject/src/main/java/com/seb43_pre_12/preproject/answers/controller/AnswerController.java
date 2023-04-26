package com.seb43_pre_12.preproject.answers.controller;

import com.seb43_pre_12.preproject.answers.dto.AnswerPatchDto;
import com.seb43_pre_12.preproject.answers.dto.AnswerPostDto;
import com.seb43_pre_12.preproject.answers.dto.AnswerResponseDto;
import com.seb43_pre_12.preproject.answers.entity.Answer;
import com.seb43_pre_12.preproject.answers.mapper.AnswerMapper;
import com.seb43_pre_12.preproject.answers.service.AnswerService;
import com.seb43_pre_12.preproject.dto.MultiResponseDto;
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
@RequestMapping("/api/answers")
@Validated
public class AnswerController {
    private final AnswerService answerService;
    private final AnswerMapper mapper;

    public AnswerController(AnswerService answerService, AnswerMapper mapper) {
        this.answerService = answerService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postAnswer(@Valid  @RequestBody AnswerPostDto postDto) {
        Answer answer = answerService.createAnswer(mapper.AnswerPostDtoToAnswer(postDto));
        URI uri = UriComponentsBuilder.newInstance()
                .path("/api/answers/" + answer.getAnswerId())
                .build().toUri();

        return ResponseEntity.created(uri).build();
    }

    @PatchMapping("/{answer-id}")
    public ResponseEntity patchAnswer(@PathVariable("answer-id")@Positive Long answerId,
                                      @Valid @RequestBody AnswerPatchDto patchDto) {
        patchDto.setAnswerId(answerId);
        Answer answer = answerService.updateAnswer(mapper.AnswerPatchDtoToAnswer(patchDto));
        return new ResponseEntity<>(mapper.AnswerToAnswerResponseDto(answer), HttpStatus.OK);
    }

    @GetMapping("/{answer-id}")
    public ResponseEntity getAnswer(@PathVariable("answer-id")@Positive Long answerId) {
        Answer answer = answerService.findAnswer(answerId);
        return new ResponseEntity<>(mapper.AnswerToAnswerResponseDto(answer),HttpStatus.OK);
    }

    //todo 무한스크롤(페이지네이션)이 구현된 getAnswers 핸들러 메서드 구현
    @GetMapping
    public ResponseEntity getAnswers(@RequestParam @Positive int page,
                                     @RequestParam @Positive int size) {
        Page<Answer> pageAnswers = answerService.findAnswers(page - 1, size);
        List<Answer> answers = pageAnswers.getContent();

        return new ResponseEntity(
                new MultiResponseDto<>(mapper.AnswersToAnswerResponseDtos(answers), pageAnswers)
                , HttpStatus.OK);
    }

    @DeleteMapping("/{answer-id}")
    public ResponseEntity deleteAnswer(@PathVariable("answer-id")@Positive Long answerId) {
        answerService.deleteAnswer(answerId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

package com.seb43_pre_12.preproject.answers.mapper;

import com.seb43_pre_12.preproject.answers.dto.AnswerPatchDto;
import com.seb43_pre_12.preproject.answers.dto.AnswerPostDto;
import com.seb43_pre_12.preproject.answers.dto.AnswerResponseDto;
import com.seb43_pre_12.preproject.answers.entity.Answer;
import org.mapstruct.Mapper;
import org.springframework.web.bind.annotation.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AnswerMapper {
    Answer AnswerPostDtoToAnswer(AnswerPostDto postDto);
    Answer AnswerPatchDtoToAnswer(AnswerPatchDto patchDto);
    AnswerResponseDto AnswerToAnswerResponseDto(Answer answer);
//    List<AnswerResponseDto> AnswersToAnswerResponseDtos(List<Answer> answers);
    //todo 무한스크롤(페이지네이션) 적용해야함.
}

package com.seb43_pre_12.preproject.question.mapper;

import com.seb43_pre_12.preproject.question.dto.QuestionDto;
import com.seb43_pre_12.preproject.question.dto.QuestionPatchDto;
import com.seb43_pre_12.preproject.question.dto.QuestionPostDto;
import com.seb43_pre_12.preproject.question.dto.QuestionResponseDto;
import com.seb43_pre_12.preproject.question.entity.Question;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface QuestionMapper {
    Question questionPostDtoToQuestion(QuestionPostDto questionPostDto);
    Question questionPatchDtoToQuestion(QuestionPatchDto questionPatchDto);
    QuestionResponseDto questionToQuestionResponseDto(Question question);

    List<QuestionResponseDto> questionsToQuestionResponses(List<Question> questions);

}

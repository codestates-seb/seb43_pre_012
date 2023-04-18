package com.seb43_pre_12.preproject.answers.dto;

import com.seb43_pre_12.preproject.answers.entity.Answer;
import com.seb43_pre_12.preproject.answers.validator.NotSpace;
import com.seb43_pre_12.preproject.answers.validator.SelectedEnum;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Pattern;

@Getter
@Setter
public class AnswerPatchDto {
    private Long answerId;
//    @Pattern(regexp = "\\S.*\\S|\\S", message = "공백을 허용하지 않습니다.") // \S\s*|\s+\S
    @NotSpace
    private String content;
//    @Pattern(regexp = "^ANSWER_SELECTED | ANSWER_NOT_SELECTED$",
//            message = "입력 가능한 값은 ANSWER_SELECTED 와 ANSWER_NOT_SELECTED 만 가능합니다.")
//    @SelectedEnum(regexp = "ANSWER_SELECTED|ANSWER_NOT_SELECTED")

    private Answer.Selected selected;
}

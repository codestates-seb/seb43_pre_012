package com.seb43_pre_12.preproject.answers.dto;

import com.seb43_pre_12.preproject.answers.entity.Answer;
import com.seb43_pre_12.preproject.comments.dto.CommentsResponseDto;
import com.seb43_pre_12.preproject.comments.entity.Comments;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AnswerResponseDto {
    private Long answerId;
    private String content;
    private Answer.Selected selected;
    private String username;
    private long memberId;
    private long questionId;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private List<CommentsResponseDto> comments;
}

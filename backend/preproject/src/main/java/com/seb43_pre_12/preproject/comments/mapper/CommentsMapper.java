package com.seb43_pre_12.preproject.comments.mapper;

import com.seb43_pre_12.preproject.comments.dto.CommentsPatchDto;
import com.seb43_pre_12.preproject.comments.dto.CommentsPostDto;
import com.seb43_pre_12.preproject.comments.dto.CommentsResponseDto;
import com.seb43_pre_12.preproject.comments.entity.Comments;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentsMapper {

    Comments commentsPostDtoToComments(CommentsPostDto commentsPostDto);
    Comments commentsPatchDtoToComments(CommentsPatchDto commentsPatchDto);
    CommentsResponseDto commentsToCommentsResponseDto(Comments comments);
    List<CommentsResponseDto> commentsToCommentsResponseDtos(List<Comments> comments);
}

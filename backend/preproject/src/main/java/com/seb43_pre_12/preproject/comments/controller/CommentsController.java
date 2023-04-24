package com.seb43_pre_12.preproject.comments.controller;

import com.seb43_pre_12.preproject.comments.dto.CommentsPatchDto;
import com.seb43_pre_12.preproject.comments.dto.CommentsPostDto;
import com.seb43_pre_12.preproject.comments.dto.CommentsResponseDto;
import com.seb43_pre_12.preproject.comments.entity.Comments;
import com.seb43_pre_12.preproject.comments.mapper.CommentsMapper;
import com.seb43_pre_12.preproject.comments.service.CommentsService;
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
@RequestMapping("/api/comments")
@Validated
public class CommentsController {

    private final CommentsService commentsService;
    private final CommentsMapper mapper;

    public CommentsController(CommentsService commentsService, CommentsMapper mapper) {
        this.commentsService = commentsService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postComment(@Valid @RequestBody CommentsPostDto requestBody) {
        Comments comment = commentsService.createComment(mapper.commentsPostDtoToComments(requestBody));
        
        URI uri = UriComponentsBuilder.newInstance()
                .path("/api/comments/" + comment.getCommentId())
                .build().toUri();

        return ResponseEntity.created(uri).build();
    }

    @GetMapping("{commentId}")
    public ResponseEntity getComment(@PathVariable @Positive long commentId) {
        Comments comment = commentsService.findComment(commentId);

        return new ResponseEntity(mapper.commentsToCommentsResponseDto(comment), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getComments() {
        List<Comments> comments = commentsService.findComments();

        return new ResponseEntity(mapper.commentsToCommentsResponseDtos(comments), HttpStatus.OK);
    }

    @PatchMapping("{commentId}")
    public ResponseEntity patchComment(@PathVariable @Positive long commentId,
                                       @Valid @RequestBody CommentsPatchDto requestBody) {
        requestBody.setCommentId(commentId);
        Comments comment = commentsService.updateComment(mapper.commentsPatchDtoToComments(requestBody));

        return new ResponseEntity(mapper.commentsToCommentsResponseDto(comment), HttpStatus.OK);
    }

    @DeleteMapping("{commentId}")
    public ResponseEntity deleteComment(@PathVariable @Positive long commentId) {
        commentsService.deleteComment(commentId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}

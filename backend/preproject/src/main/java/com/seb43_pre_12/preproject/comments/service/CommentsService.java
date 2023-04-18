package com.seb43_pre_12.preproject.comments.service;

import com.seb43_pre_12.preproject.comments.entity.Comments;
import com.seb43_pre_12.preproject.comments.repository.CommentsRepository;
import com.seb43_pre_12.preproject.exception.BusinessLogicException;
import com.seb43_pre_12.preproject.exception.ExceptionCode;
import com.seb43_pre_12.preproject.member.service.MemberService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CommentsService {

    private final CommentsRepository commentsRepository;
    private final MemberService memberService;

    public CommentsService(CommentsRepository commentsRepository, MemberService memberService) {
        this.commentsRepository = commentsRepository;
        this.memberService = memberService;
    }

    public Comments createComment(Comments comment) {
        return commentsRepository.save(comment);
    }

    public Comments updateComment(Comments comment) {
        Comments findComment = findVerifiedComment(comment.getCommentId());

        Optional.ofNullable(comment.getComment())
                .ifPresent(text -> findComment.setComment(text));
        findComment.setModifiedAt(LocalDateTime.now());

        return commentsRepository.save(findComment);
    }
    
    public Comments findComment(long commentId) {
        return commentsRepository.findById(commentId).get();
    }

    public List<Comments> findComments() {
        return commentsRepository.findAll();
    }

    public void deleteComment(long commentId) {
        commentsRepository.deleteById(commentId);
    }

    public Comments findVerifiedComment(long commentId) {
        Optional<Comments> optionalComments = commentsRepository.findById(commentId);

        Comments findComment =
                optionalComments.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        return findComment;
    }
}

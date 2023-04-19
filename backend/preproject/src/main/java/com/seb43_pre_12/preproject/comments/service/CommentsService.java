package com.seb43_pre_12.preproject.comments.service;

import com.seb43_pre_12.preproject.answers.entity.Answer;
import com.seb43_pre_12.preproject.answers.service.AnswerService;
import com.seb43_pre_12.preproject.comments.entity.Comments;
import com.seb43_pre_12.preproject.comments.repository.CommentsRepository;

import com.seb43_pre_12.preproject.exception.BusinessLogicException;
import com.seb43_pre_12.preproject.exception.ExceptionCode;
import com.seb43_pre_12.preproject.member.entity.Member;
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
    private final AnswerService answerService;

    public CommentsService(CommentsRepository commentsRepository, MemberService memberService, AnswerService answerService) {
        this.commentsRepository = commentsRepository;
        this.memberService = memberService;
        this.answerService = answerService;
    }

    public Comments createComment(Comments comment) {

        Answer answer = verifyExistingAnswer(comment.getAnswer());
        Member member = verifyExistingMember(comment.getMember());

        comment.setAnswer(answer);
        comment.setMember(member);

        answer.addComment(comment);
        member.addComment(comment);

        return commentsRepository.save(comment);
    }

    public Comments updateComment(Comments comment) {
        Comments findComment = findVerifiedComment(comment.getCommentId());

        Optional.ofNullable(comment.getComment())
                .ifPresent(text -> findComment.setComment(text));
        Optional.ofNullable(comment.getMember())
                .ifPresent(member -> findComment.setMember(member));
        Optional.ofNullable(comment.getAnswer())
                .ifPresent(answer -> findComment.setAnswer(answer));
        findComment.setModifiedAt(LocalDateTime.now());

        return commentsRepository.save(findComment);
    }

    public Comments findComment(long commentId) {
        return findVerifiedComment(commentId);
    }

    public List<Comments> findComments() {
        return commentsRepository.findAll();
    }

    public void deleteComment(long commentId) {
        commentsRepository.deleteById(commentId);
    }

    public Comments findVerifiedComment(long commentId) {
        Optional<Comments> optionalComments = commentsRepository.findById(commentId);

        return optionalComments.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
    }

    // 추가
    private Member verifyExistingMember(Member member) {
        return memberService.findVerifiedMember(member.getMemberId());
    }

    private Answer verifyExistingAnswer(Answer answer) {
        return answerService.findAnswer(answer.getAnswerId());
//        return answerService.findVerifedAnswer(answer.getAnswerId());
    }

}

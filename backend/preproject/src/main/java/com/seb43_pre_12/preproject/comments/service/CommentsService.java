package com.seb43_pre_12.preproject.comments.service;

import com.seb43_pre_12.preproject.comments.entity.Comments;
import com.seb43_pre_12.preproject.comments.repository.CommentsRepository;
import com.seb43_pre_12.preproject.member.entity.Member;
import com.seb43_pre_12.preproject.member.service.MemberService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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

    public Comments findComment(long commentId) {
        return commentsRepository.findById(commentId).get();
    }

    public List<Comments> findComments() {
        return commentsRepository.findAll();
    }

    public Comments updateComment(Comments comment) {
        return commentsRepository.save(comment);
    }

    public void deleteComment(long commentId) {
        commentsRepository.deleteById(commentId);
    }
}

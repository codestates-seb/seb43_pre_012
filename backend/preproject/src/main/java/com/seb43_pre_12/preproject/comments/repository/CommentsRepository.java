package com.seb43_pre_12.preproject.comments.repository;

import com.seb43_pre_12.preproject.comments.entity.Comments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentsRepository extends JpaRepository<Comments, Long> {
}

package com.seb43_pre_12.preproject.question.repository;

import com.seb43_pre_12.preproject.question.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {
}

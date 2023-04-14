package com.seb43_pre_12.preproject.member.repositoy;

import com.seb43_pre_12.preproject.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
}

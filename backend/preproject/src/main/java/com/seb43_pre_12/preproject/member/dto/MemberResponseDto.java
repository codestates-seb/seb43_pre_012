package com.seb43_pre_12.preproject.member.dto;


import com.seb43_pre_12.preproject.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@Getter
@AllArgsConstructor
public class MemberResponseDto {

    private long memberId;
    private String email;
    private String username;
    private String password;

    private Member.MemberStatus memberStatus;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

}

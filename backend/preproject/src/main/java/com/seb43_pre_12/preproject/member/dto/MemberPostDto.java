package com.seb43_pre_12.preproject.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberPostDto {

    private String email;
    private String username;
    private String password;
}

package com.seb43_pre_12.preproject.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@AllArgsConstructor
public class MemberPostDto {

    @NotBlank(message = "email 입력은 필수입니다.")
    @Email
    private String email;

    @NotBlank(message = "username 입력은 필수입니다.")
    private String username;

    @NotBlank(message = "password 입력은 필수입니다.")
    private String password;
}

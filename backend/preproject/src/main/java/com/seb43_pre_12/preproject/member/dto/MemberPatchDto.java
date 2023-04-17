package com.seb43_pre_12.preproject.member.dto;

import com.seb43_pre_12.preproject.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@AllArgsConstructor
public class MemberPatchDto {

    private long memberId;

    @NotBlank(message = "username 입력은 필수입니다.")
    private String username;

    @NotBlank(message = "password 입력은 필수입니다.")
    private String password;
    private Member.MemberStatus memberStatus;

    public void setMemberId(long memberId) {
        this.memberId = memberId;
    }
}

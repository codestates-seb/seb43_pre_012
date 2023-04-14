package com.seb43_pre_12.preproject.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@AllArgsConstructor
public class MemberPatchDto {

    private long memberId;
    private String email;
    private String username;
    private String password;

    public void setMemberId(long memberId) {
        this.memberId = memberId;
    }
}

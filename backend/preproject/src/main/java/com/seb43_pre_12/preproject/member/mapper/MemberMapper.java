package com.seb43_pre_12.preproject.member.mapper;

import com.seb43_pre_12.preproject.member.dto.MemberPatchDto;
import com.seb43_pre_12.preproject.member.dto.MemberPostDto;
import com.seb43_pre_12.preproject.member.dto.MemberResponseDto;
import com.seb43_pre_12.preproject.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {

    Member memberPostDtoToMember(MemberPostDto memberDto);
    Member memberPatchDtoToMember(MemberPatchDto memberDto);
    MemberResponseDto memberToMemberResponseDto(Member member);
    List<MemberResponseDto> memberToMemberResponseDtos(List<Member> members);
}

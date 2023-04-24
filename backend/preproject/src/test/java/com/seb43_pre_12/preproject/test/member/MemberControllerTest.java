package com.seb43_pre_12.preproject.test.member;

import com.google.gson.Gson;
import com.jayway.jsonpath.JsonPath;
import com.seb43_pre_12.preproject.member.controller.MemberController;
import com.seb43_pre_12.preproject.member.dto.MemberPatchDto;
import com.seb43_pre_12.preproject.member.dto.MemberPostDto;
import com.seb43_pre_12.preproject.member.dto.MemberResponseDto;
import com.seb43_pre_12.preproject.member.entity.Member;
import com.seb43_pre_12.preproject.member.mapper.MemberMapper;
import com.seb43_pre_12.preproject.member.service.MemberService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.startsWith;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(MemberController.class)
@AutoConfigureRestDocs
@WithMockUser // 요청할 때 권한을 같이 넘겨준다
public class MemberControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private MemberService memberService;

    @MockBean
    private MemberMapper mapper;

    @Test
    void postMemberTest() throws Exception {
        MemberPostDto memberPostDto = new MemberPostDto("test@gmail.com", "test", "1234");

        given(mapper.memberPostDtoToMember(Mockito.any())).willReturn(new Member());

        Member member = new Member();
        member.setMemberId(1L);
        String content = gson.toJson(memberPostDto);

        given(memberService.createMember(Mockito.any(Member.class))).willReturn(member);

        mockMvc.perform(
                        post("/api/members")
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                                .content(content)
                                .with(csrf()) // 파라미터로 csrf 값을 같이 보내준다
                )
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", is(startsWith("/api/members/"))))
                .andDo(document(
                        "post-member",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                List.of(
                                        fieldWithPath("email").type(JsonFieldType.STRING).description("이메일"),
                                        fieldWithPath("username").type(JsonFieldType.STRING).description("닉네임"),
                                        fieldWithPath("password").type(JsonFieldType.STRING).description("비밀번호")
                                )
                        ),
                        responseHeaders(
                                headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리소스의 URI")
                        )
                ));
    }

    @Test
    void patchMemberTest() throws Exception {
        MemberPatchDto memberPatchDto = new MemberPatchDto(1L,
                "test",
                "1234",
                Member.MemberStatus.MEMBER_ACTIVE);

        MemberResponseDto memberResponseDto = new MemberResponseDto(1L,
                "test@gamil.com",
                "test",
                "1234",
                Member.MemberStatus.MEMBER_ACTIVE,
                LocalDateTime.now(),
                LocalDateTime.now());

        given(mapper.memberPatchDtoToMember(Mockito.any(MemberPatchDto.class))).willReturn(new Member());
        given(memberService.updateMember(Mockito.any(Member.class))).willReturn(new Member());
        given(mapper.memberToMemberResponseDto(Mockito.any(Member.class))).willReturn(memberResponseDto);

        String content = gson.toJson(memberPatchDto);

        long memberId = 1L;
        mockMvc.perform(
                        patch("/api/members/{memberId}", memberId)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                                .with(csrf())
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value(memberPatchDto.getUsername()))
                .andDo(document(
                        "patch-member",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("memberId").description("회원식별자")
                        ),
                        requestFields(
                                List.of(
                                        fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("회원 식별자").ignored(),
                                        fieldWithPath("username").type(JsonFieldType.STRING).description("닉네임").optional(),
                                        fieldWithPath("password").type(JsonFieldType.STRING).description("비밀번호").optional(),
                                        fieldWithPath("memberStatus").type(JsonFieldType.STRING).description("회원 상태: MEMBER_ACTIVE / MEMBER_SLEEP / MEMBER_QUIT").optional()
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                        fieldWithPath("email").type(JsonFieldType.STRING).description("이메일"),
                                        fieldWithPath("username").type(JsonFieldType.STRING).description("닉네임"),
                                        fieldWithPath("password").type(JsonFieldType.STRING).description("비밀번호"),
                                        fieldWithPath("memberStatus").type(JsonFieldType.STRING).description("회원 상태: MEMBER_ACTIVE / MEMBER_SLEEP / MEMBER_QUIT"),
                                        fieldWithPath("createdAt").type(JsonFieldType.STRING).description("회원 생성시간"),
                                        fieldWithPath("modifiedAt").type(JsonFieldType.STRING).description("회원 수정시간")
                                )
                        )
                ));

    }

    @Test
    void getMemberTest() throws Exception {
        Member member = new Member();
        member.setMemberId(1L);
        member.setEmail("test@gmail.com");
        member.setUsername("test");
        member.setPassword("1234");

        MemberResponseDto memberResponseDto = new MemberResponseDto(1L,
                "test@gmail.com",
                "test",
                "1234",
                Member.MemberStatus.MEMBER_ACTIVE,
                LocalDateTime.now(),
                LocalDateTime.now());

        given(memberService.findMember(Mockito.anyLong())).willReturn(new Member());
        given(mapper.memberToMemberResponseDto(Mockito.any(Member.class))).willReturn(memberResponseDto);

        long memberId = 1L;
        mockMvc.perform(
                        get("/api/members/{memberId}", memberId)
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value(member.getUsername()))
                .andExpect(jsonPath("$.email").value(member.getEmail()))
                .andExpect(jsonPath("$.password").value(member.getPassword()))
                .andDo(document(
                        "get-member",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("memberId").description("회원식별자")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                        fieldWithPath("email").type(JsonFieldType.STRING).description("이메일"),
                                        fieldWithPath("username").type(JsonFieldType.STRING).description("닉네임"),
                                        fieldWithPath("password").type(JsonFieldType.STRING).description("비밀번호"),
                                        fieldWithPath("memberStatus").type(JsonFieldType.STRING).description("회원 상태: MEMBER_ACTIVE / MEMBER_SLEEP / MEMBER_QUIT"),
                                        fieldWithPath("createdAt").type(JsonFieldType.STRING).description("회원 생성시간"),
                                        fieldWithPath("modifiedAt").type(JsonFieldType.STRING).description("회원 수정시간")
                                )
                        )
                ));
    }

    @Test
    void getMembersTest() throws Exception {
        List<MemberResponseDto> responseDtos = List.of(
                new MemberResponseDto(1L,
                        "test@gmail.com",
                        "test",
                        "1234",
                        Member.MemberStatus.MEMBER_ACTIVE,
                        LocalDateTime.now(),
                        LocalDateTime.now()),
                new MemberResponseDto(2L,
                        "test2@gmail.com",
                        "test2",
                        "12345",
                        Member.MemberStatus.MEMBER_ACTIVE,
                        LocalDateTime.now(),
                        LocalDateTime.now())
        );

        given(memberService.findMembers()).willReturn(new ArrayList<>());
        given(mapper.memberToMemberResponseDtos(Mockito.anyList())).willReturn(responseDtos);

        ResultActions actions = mockMvc.perform(
                        get("/api/members")
                                .accept(MediaType.APPLICATION_JSON)
                );

        MvcResult result = actions
                .andExpect(status().isOk())
                .andDo(document(
                        "get-members",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        responseFields(
                                List.of(
                                        fieldWithPath("[].memberId").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                        fieldWithPath("[].email").type(JsonFieldType.STRING).description("이메일"),
                                        fieldWithPath("[].username").type(JsonFieldType.STRING).description("닉네임"),
                                        fieldWithPath("[].password").type(JsonFieldType.STRING).description("비밀번호"),
                                        fieldWithPath("[].memberStatus").type(JsonFieldType.STRING).description("회원 상태: MEMBER_ACTIVE / MEMBER_SLEEP / MEMBER_QUIT"),
                                        fieldWithPath("[].createdAt").type(JsonFieldType.STRING).description("회원 생성시간"),
                                        fieldWithPath("[].modifiedAt").type(JsonFieldType.STRING).description("회원 수정시간")
                                )
                        )
                )).andReturn();

        List list = JsonPath.parse(result.getResponse().getContentAsString()).read("$");
        assertThat(list.size(), is(2));;
    }

    @Test
    void deleteMemberTest() throws Exception {
        long memberId = 1L;

        doNothing().when(memberService).deleteMember(memberId);

        ResultActions actions = mockMvc.perform(
                delete("/api/members/{memberId}", memberId)
                        .with(csrf())
        );

        actions.andExpect(status().isNoContent())
                .andDo(document(
                        "delete-member",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("memberId").description("회원식별자")
                        )
                ));
    }
}

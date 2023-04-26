package com.seb43_pre_12.preproject.test.answer;

import com.google.gson.Gson;
import com.seb43_pre_12.preproject.answers.controller.AnswerController;
import com.seb43_pre_12.preproject.answers.dto.AnswerPatchDto;
import com.seb43_pre_12.preproject.answers.dto.AnswerPostDto;
import com.seb43_pre_12.preproject.answers.dto.AnswerResponseDto;
import com.seb43_pre_12.preproject.answers.entity.Answer;
import com.seb43_pre_12.preproject.answers.mapper.AnswerMapper;
import com.seb43_pre_12.preproject.answers.service.AnswerService;
import com.seb43_pre_12.preproject.comments.dto.CommentsResponseDto;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;

import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.startsWith;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


import static org.mockito.BDDMockito.given;

@WebMvcTest(AnswerController.class)
@AutoConfigureRestDocs
@WithMockUser
public class AnswerControllerTest {
    @Autowired
    private MockMvc mockMvc;
    
    @Autowired
    private Gson gson;
    
    @MockBean
    private AnswerService answerService;

    @MockBean
    private AnswerMapper mapper;

    @Test
    void postAnswerTest() throws Exception {
        AnswerPostDto postDto = new AnswerPostDto();
        postDto.setContent("답변 생성 테스트입니다.");
        postDto.setQuestionId(1L);
        postDto.setMemberId(1L);

        String content = gson.toJson(postDto);

        given(mapper.AnswerPostDtoToAnswer(Mockito.any(AnswerPostDto.class))).willReturn(new Answer());

        Answer mockAnswer = new Answer();
        mockAnswer.setAnswerId(1L);
        given(answerService.createAnswer(Mockito.any(Answer.class))).willReturn(mockAnswer);

        ResultActions actions =
                mockMvc.perform(
                        post("/api/answers")
                                .accept(MediaType.APPLICATION_JSON)  // response 데이터 타입 설정
                                .contentType(MediaType.APPLICATION_JSON)  // 서버에서 처리하는 데이터 타입 설정
                                .content(content) // controller 로 전송하는 request body 데이터.
                                .with(csrf())
                );

        actions
                .andExpect(status().isCreated())
                .andExpect(header().string("Location",is(startsWith("/api/answers"))))
                .andDo(document(
                                "post-answer",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestFields(
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("답변 내용"),
                                        fieldWithPath("questionId").type(JsonFieldType.NUMBER).description("질문 식별자"),
                                        fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("회원 식별자")
                                ),
                                responseHeaders(
                                        headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리소스의 URI")
                                )
                        )
                );
    }

    @Test
    void patchAnswerTest() throws Exception {
        AnswerPatchDto patchDto = new AnswerPatchDto();
        patchDto.setAnswerId(1L);
        patchDto.setContent("수정된 내용입니다.");
        patchDto.setSelected(Answer.Selected.ANSWER_SELECTED);
        String patchContent = gson.toJson(patchDto);

        AnswerResponseDto responseDto = new AnswerResponseDto();
        responseDto.setAnswerId(1L);
        responseDto.setContent("수정된 내용입니다.");
        responseDto.setSelected(Answer.Selected.ANSWER_SELECTED);
        responseDto.setCreatedAt(LocalDateTime.now());
        responseDto.setModifiedAt(LocalDateTime.now());
        responseDto.setUsername("홍길금");
        responseDto.setMemberId(1L);
        responseDto.setQuestionId(1L);
        responseDto.setComments(List.of(
                new CommentsResponseDto(
                        1L,
                        "첫번째 댓글입니다.",
                        1L,
                        1L,
                        "홍길동",
                        LocalDateTime.now(),
                        LocalDateTime.now()
                ),
                new CommentsResponseDto(
                        2L,
                        "두번째 댓글입니다.",
                        2L,
                        1L,
                        "홍길은",
                        LocalDateTime.now(),
                        LocalDateTime.now()
                )));
        // 저장시점과 수정시점은...?

        given(mapper.AnswerPatchDtoToAnswer(Mockito.any(AnswerPatchDto.class))).willReturn(new Answer());
        given(answerService.updateAnswer(Mockito.any(Answer.class))).willReturn(new Answer());
        given(mapper.AnswerToAnswerResponseDto(Mockito.any(Answer.class))).willReturn(responseDto);

        ResultActions actions =
                mockMvc.perform(
                        patch("/api/answers/{answer-id}", 1L)
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                                .content(patchContent)
                                .with(csrf())
                );
        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.content").value(patchDto.getContent()))
                .andExpect(jsonPath("$.selected").value(patchDto.getSelected().toString()))
                .andDo(document(
                        "patch-answer",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(              // (1)
                                parameterWithName("answer-id").description("답변 식별자")
                        ),
                        requestFields(
                                List.of(
                                        fieldWithPath("answerId").type(JsonFieldType.NUMBER).description("답변 식별자").ignored(),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("답변 내용").optional(),
                                        fieldWithPath("selected").type(JsonFieldType.STRING).description("답변 채택 여부 : ANSWER_SELECTED / ANSWER_NOT_SELECTED 로 입력해야합니다.").optional()
                                )

                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("answerId").type(JsonFieldType.NUMBER).description("답변 식별자"),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("답변 내용"),
                                        fieldWithPath("selected").type(JsonFieldType.STRING).description("답변 채택 여부 : ANSWER_SELECTED(채택됨) / ANSWER_NOT_SELECTED(채택되지않음)"),
                                        fieldWithPath("username").type(JsonFieldType.STRING).description("답변 회원 닉네임"),
                                        fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                        fieldWithPath("questionId").type(JsonFieldType.NUMBER).description("질문 식별자"),
                                        fieldWithPath("createdAt").type(JsonFieldType.STRING).description("답변 생성 시간"),
                                        fieldWithPath("modifiedAt").type(JsonFieldType.STRING).description("답변 수정 시간"),
                                        fieldWithPath("modifiedAt").type(JsonFieldType.STRING).description("답변 수정 시간"),
                                        fieldWithPath("comments").type(JsonFieldType.ARRAY).description("답변 댓글 정보"),
                                        fieldWithPath("comments[].commentId").type(JsonFieldType.NUMBER).description("댓글 식별자"),
                                        fieldWithPath("comments[].comment").type(JsonFieldType.STRING).description("댓글 내용"),
                                        fieldWithPath("comments[].memberId").type(JsonFieldType.NUMBER).description("댓글 작성 회원 식별자"),
                                        fieldWithPath("comments[].answerId").type(JsonFieldType.NUMBER).description("댓글 작성 답변 식별자"),
                                        fieldWithPath("comments[].username").type(JsonFieldType.STRING).description("댓글 작성 회원 닉네임"),
                                        fieldWithPath("comments[].createdAt").type(JsonFieldType.STRING).description("댓글 생성 시간"),
                                        fieldWithPath("comments[].modifiedAt").type(JsonFieldType.STRING).description("댓글 수정 시간")
                                )
                        )
                ));
    }

    @Test
    void getAnswerTest() throws Exception {
        Answer answer = new Answer();
        answer.setAnswerId(1L);
        answer.setContent("get핸들러메서드 테스트입니다.");
        answer.setSelected(Answer.Selected.ANSWER_NOT_SELECTED);

        AnswerResponseDto responseDto = new AnswerResponseDto();
        responseDto.setAnswerId(1L);
        responseDto.setContent("get핸들러메서드 테스트입니다.");
        responseDto.setSelected(Answer.Selected.ANSWER_NOT_SELECTED);
        responseDto.setCreatedAt(LocalDateTime.now());
        responseDto.setModifiedAt(LocalDateTime.now());
        responseDto.setUsername("홍길금");
        responseDto.setMemberId(1L);
        responseDto.setQuestionId(1L);
        responseDto.setComments(List.of(
                new CommentsResponseDto(
                        1L,
                        "첫번째 댓글입니다.",
                        1L,
                        1L,
                        "홍길동",
                        LocalDateTime.now(),
                        LocalDateTime.now()
                ),
                new CommentsResponseDto(
                        2L,
                        "두번째 댓글입니다.",
                        2L,
                        1L,
                        "홍길은",
                        LocalDateTime.now(),
                        LocalDateTime.now()
                )));

        given(answerService.findAnswer(Mockito.anyLong())).willReturn(new Answer());
        given(mapper.AnswerToAnswerResponseDto(Mockito.any(Answer.class))).willReturn(responseDto);

        ResultActions actions =
                mockMvc.perform(
                        get("/api/answers/{answer-id}",1L)
                                .accept(MediaType.APPLICATION_JSON)  // response 데이터 타입 설정
                );

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").value(answer.getContent()))
                .andExpect(jsonPath("$.selected").value(answer.getSelected().toString()))
                .andDo(document(
                        "get-answer",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("answer-id").description("답변 식별자")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("answerId").type(JsonFieldType.NUMBER).description("답변 식별자"),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("답변 내용"),
                                        fieldWithPath("selected").type(JsonFieldType.STRING).description("답변 채택 여부 : ANSWER_SELECTED(채택됨) / ANSWER_NOT_SELECTED(채택되지않음)"),
                                        fieldWithPath("username").type(JsonFieldType.STRING).description("답변 회원 닉네임"),
                                        fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                        fieldWithPath("questionId").type(JsonFieldType.NUMBER).description("질문 식별자"),
                                        fieldWithPath("createdAt").type(JsonFieldType.STRING).description("답변 생성 시간"),
                                        fieldWithPath("modifiedAt").type(JsonFieldType.STRING).description("답변 수정 시간"),
                                        fieldWithPath("modifiedAt").type(JsonFieldType.STRING).description("답변 수정 시간"),
                                        fieldWithPath("comments").type(JsonFieldType.ARRAY).description("답변 댓글 정보"),
                                        fieldWithPath("comments[].commentId").type(JsonFieldType.NUMBER).description("댓글 식별자"),
                                        fieldWithPath("comments[].comment").type(JsonFieldType.STRING).description("댓글 내용"),
                                        fieldWithPath("comments[].memberId").type(JsonFieldType.NUMBER).description("댓글 작성 회원 식별자"),
                                        fieldWithPath("comments[].answerId").type(JsonFieldType.NUMBER).description("댓글 작성 답변 식별자"),
                                        fieldWithPath("comments[].username").type(JsonFieldType.STRING).description("댓글 작성 회원 닉네임"),
                                        fieldWithPath("comments[].createdAt").type(JsonFieldType.STRING).description("댓글 생성 시간"),
                                        fieldWithPath("comments[].modifiedAt").type(JsonFieldType.STRING).description("댓글 수정 시간")
                                )
                        )
                ));
    }

    @Test
    void getAnswersTest() throws Exception{
        List<Answer> answers = List.of(new Answer(), new Answer());

        List<AnswerResponseDto> responseDtos = List.of(
                new AnswerResponseDto(1L,
                        "답변 내용",
                        Answer.Selected.ANSWER_SELECTED,
                        "홍길동",
                        1L,
                        1L,
                        LocalDateTime.now(),
                        LocalDateTime.now(),
                        List.of(
                                new CommentsResponseDto(
                                        1L,
                                        "첫번째 댓글입니다.",
                                        2L,
                                        1L,
                                        "홍길동",
                                        LocalDateTime.now(),
                                        LocalDateTime.now()
                                )
                        )),
                new AnswerResponseDto(2L,
                        "답변 내용2",
                        Answer.Selected.ANSWER_SELECTED,
                        "홍길동",
                        1L,
                        1L,
                        LocalDateTime.now(),
                        LocalDateTime.now(),
                        List.of(
                                new CommentsResponseDto(
                                        2L,
                                        "두번째 댓글입니다.",
                                        2L,
                                        1L,
                                        "홍길은",
                                        LocalDateTime.now(),
                                        LocalDateTime.now()
                                ))
                ));

        int page = 1;
        int size = 5;
        given(answerService.findAnswers(Mockito.anyInt(), Mockito.anyInt()))
                .willReturn(new PageImpl<>(answers, PageRequest.of(page-1, size, Sort.by("createdAt").descending()),answers.size()));
        given(mapper.AnswersToAnswerResponseDtos(Mockito.anyList())).willReturn(responseDtos);

        //when
        ResultActions actions = mockMvc.perform(
                get("/api/answers?page={page}&size={size}", page, size)
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.date").isArray())
                .andDo(document("get-answers",
                        preprocessResponse(prettyPrint()),
                        responseFields(
                                List.of(
                                        fieldWithPath("date[].answerId").type(JsonFieldType.NUMBER).description("답변 식별자"),
                                        fieldWithPath("date[].content").type(JsonFieldType.STRING).description("답변 내용"),
                                        fieldWithPath("date[].selected").type(JsonFieldType.STRING).description("답변 채택 여부"),
                                        fieldWithPath("date[].username").type(JsonFieldType.STRING).description("답변 작성 회원 닉네임"),
                                        fieldWithPath("date[].memberId").type(JsonFieldType.NUMBER).description("답변 작성 회원 식별자"),
                                        fieldWithPath("date[].questionId").type(JsonFieldType.NUMBER).description("질문 식별자"),
                                        fieldWithPath("date[].createdAt").type(JsonFieldType.STRING).description("답변 생성 시간"),
                                        fieldWithPath("date[].modifiedAt").type(JsonFieldType.STRING).description("답변 수정 시간"),
                                        fieldWithPath("date[].comments").type(JsonFieldType.ARRAY).description("답변 댓글 정보"),
                                        fieldWithPath("date[].comments[].commentId").type(JsonFieldType.NUMBER).description("댓글 식별자"),
                                        fieldWithPath("date[].comments[].comment").type(JsonFieldType.STRING).description("댓글 내용"),
                                        fieldWithPath("date[].comments[].memberId").type(JsonFieldType.NUMBER).description("댓글 작성 회원 식별자"),
                                        fieldWithPath("date[].comments[].answerId").type(JsonFieldType.NUMBER).description("댓글 작성 답변 식별자"),
                                        fieldWithPath("date[].comments[].username").type(JsonFieldType.STRING).description("댓글 작성 회원 닉네임"),
                                        fieldWithPath("date[].comments[].createdAt").type(JsonFieldType.STRING).description("댓글 생성 시간"),
                                        fieldWithPath("date[].comments[].modifiedAt").type(JsonFieldType.STRING).description("댓글 수정 시간"),
                                        fieldWithPath("pageInfo").type(JsonFieldType.OBJECT).description("페이지 정보"),
                                        fieldWithPath("pageInfo.page").type(JsonFieldType.NUMBER).description("페이지 번호"),
                                        fieldWithPath("pageInfo.size").type(JsonFieldType.NUMBER).description("페이지 크기"),
                                        fieldWithPath("pageInfo.totalElements").type(JsonFieldType.NUMBER).description("총 갯수"),
                                        fieldWithPath("pageInfo.totalPages").type(JsonFieldType.NUMBER).description("총 페이지 수")
                                )
                        )
                ));
    }

    @Test
    void deleteAnswerTest() throws Exception {
        doNothing().when(answerService).deleteAnswer(1L);

        ResultActions actions = mockMvc.perform(
                delete("/api/answers/{answer-id}",1L)
                        .with(csrf())
        );
        actions.andExpect(status().isNoContent())
                .andDo(document(
                        "delete-answer",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("answer-id").description("답변 식별자")
                        )
                ));
    }
}

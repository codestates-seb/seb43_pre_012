package com.seb43_pre_12.preproject.test.answer;

import com.google.gson.Gson;
import com.seb43_pre_12.preproject.answers.controller.AnswerController;
import com.seb43_pre_12.preproject.answers.dto.AnswerPatchDto;
import com.seb43_pre_12.preproject.answers.dto.AnswerPostDto;
import com.seb43_pre_12.preproject.answers.dto.AnswerResponseDto;
import com.seb43_pre_12.preproject.answers.entity.Answer;
import com.seb43_pre_12.preproject.answers.mapper.AnswerMapper;
import com.seb43_pre_12.preproject.answers.service.AnswerService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.time.LocalDateTime;
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
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


import static org.mockito.BDDMockito.given;

@WebMvcTest(AnswerController.class)
@AutoConfigureRestDocs
//@SpringBootTest
//@AutoConfigureMockMvc
public class AnswerControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private Gson gson;
    @MockBean
    private AnswerService answerService;
    //    @Autowired
//    private AnswerMapper mapper;
    @MockBean
    private AnswerMapper mapper;

    @Test
    void postAnswerTest() throws Exception {
        AnswerPostDto postDto = new AnswerPostDto();
        postDto.setContent("답변 생성 테스트입니다.");
        String content = gson.toJson(postDto);

        given(mapper.AnswerPostDtoToAnswer(Mockito.any(AnswerPostDto.class))).willReturn(new Answer());

        Answer mockAnswer = new Answer();
        mockAnswer.setAnswerId(1L);
        given(answerService.createAnswer(Mockito.any(Answer.class))).willReturn(mockAnswer);

        ResultActions actions =
                mockMvc.perform(
                        post("/answers")
                                .accept(MediaType.APPLICATION_JSON)  // response 데이터 타입 설정
                                .contentType(MediaType.APPLICATION_JSON)  // 서버에서 처리하는 데이터 타입 설정
                                .content(content) // controller 로 전송하는 request body 데이터.
                );

        actions
                .andExpect(status().isCreated())
                .andExpect(header().string("Location",is(startsWith("/answers"))))
                .andDo(document(
                                "post-answer",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestFields(
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("답변 내용")
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
        // 저장시점과 수정시점은...?

        given(mapper.AnswerPatchDtoToAnswer(Mockito.any(AnswerPatchDto.class))).willReturn(new Answer());
        given(answerService.updateAnswer(Mockito.any(Answer.class))).willReturn(new Answer());
        given(mapper.AnswerToAnswerResponseDto(Mockito.any(Answer.class))).willReturn(responseDto);

        ResultActions actions =
                mockMvc.perform(
                        patch("/answers/{answer-id}", 1L)
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                                .content(patchContent)
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
                                        fieldWithPath("answerId").type(JsonFieldType.NUMBER).description("댭변 식별자").ignored(),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("답변 내용").optional(),
                                        fieldWithPath("selected").type(JsonFieldType.STRING).description("답변 채택 여부 : ANSWER_SELECTED / ANSWER_NOT_SELECTED 로 입력해야합니다.").optional()
                                )

                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("answerId").type(JsonFieldType.NUMBER).description("답변 식별자"),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("답변 내용"),
                                        fieldWithPath("selected").type(JsonFieldType.STRING).description("답변 채택 여부 : ANSWER_SELECTED(채택됨) / ANSWER_NOT_SELECTED(채택되지않음)"),
                                        fieldWithPath("createdAt").type(JsonFieldType.STRING).description("답변 생성 시간"),
                                        fieldWithPath("modifiedAt").type(JsonFieldType.STRING).description("답변 수정 시간")
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

        given(answerService.findAnswer(Mockito.anyLong())).willReturn(new Answer());
        given(mapper.AnswerToAnswerResponseDto(Mockito.any(Answer.class))).willReturn(responseDto);

        ResultActions actions =
                mockMvc.perform(
                        get("/answers/{answer-id}",1L)
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
                                        fieldWithPath("createdAt").type(JsonFieldType.STRING).description("답변 생성 시간"),
                                        fieldWithPath("modifiedAt").type(JsonFieldType.STRING).description("답변 수정 시간")
                                )
                        )
                ));

    }
    //todo GetAnswers 핸들러 메서드 테스팅 작성 필요!

    @Test
    void deleteAnswerTest() throws Exception {
        doNothing().when(answerService).deleteAnswer(1L);

        ResultActions actions = mockMvc.perform(
                delete("/answers/{answer-id}",1L)
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
package com.seb43_pre_12.preproject.test.question;

import com.google.gson.Gson;
import com.seb43_pre_12.preproject.question.controller.QuestionController;
import com.seb43_pre_12.preproject.question.dto.QuestionPatchDto;
import com.seb43_pre_12.preproject.question.dto.QuestionPostDto;
import com.seb43_pre_12.preproject.question.dto.QuestionResponseDto;
import com.seb43_pre_12.preproject.question.entity.Question;
import com.seb43_pre_12.preproject.question.mapper.QuestionMapper;
import com.seb43_pre_12.preproject.question.service.QuestionService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.test.context.support.WithMockUser;
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
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


import static org.mockito.BDDMockito.given;

@WebMvcTest(QuestionController.class)
@AutoConfigureRestDocs
@WithMockUser
public class QuestionControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private Gson gson;
    @MockBean
    private QuestionService questionService;
    @MockBean
    private QuestionMapper mapper;

    @Test
    void postQuestionTest() throws Exception {

        QuestionPostDto questionPostDto = new QuestionPostDto("제목1", "내용1", 1);

        given(mapper.questionPostDtoToQuestion(Mockito.any())).willReturn(new Question());

        Question question = new Question();
        question.setQuestionId(1L);
        question.setCreatedAt(LocalDateTime.now());
        question.setModifiedAt(LocalDateTime.now());
        String content = gson.toJson(questionPostDto);

        given(questionService.createQuestion(Mockito.any(Question.class))).willReturn(question);

        mockMvc.perform(
                        post("/api/questions")
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                                .content(content)
                                .with(csrf())
                )
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", is(startsWith("/api/questions"))))
                .andDo(document(
                        "post-question",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                List.of(
                                        fieldWithPath("title").type(JsonFieldType.STRING).description("질문 제목"),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("질문 내용"),
                                        fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("질문 작성 회원 식별자")
                                )
                        ),
                        responseHeaders(
                                headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리소스의 URI")
                        )

                ));
    }

    @Test
    void patchQuestionTest() throws Exception{
        QuestionPatchDto patchDto = new QuestionPatchDto(1L,"수정된 제목","수정된 내용", Question.QuestionStatus.QUESTION_UPDATE);
        String patchContent = gson.toJson(patchDto);

        QuestionResponseDto responseDto = new QuestionResponseDto();
        responseDto.setQuestionId(1L);
        responseDto.setTitle("수정된 제목");
        responseDto.setContent("수정된 내용");
        responseDto.setQuestionStatus(Question.QuestionStatus.QUESTION_UPDATE);
        responseDto.setModifiedAt(LocalDateTime.now());
        responseDto.setCreatedAt(LocalDateTime.now());
        responseDto.setMemberId(1L);
        responseDto.setAnswerCount(1L);
        responseDto.setUsername("홍길동");

        given(mapper.questionPatchDtoToQuestion(Mockito.any(QuestionPatchDto.class))).willReturn(new Question());
        given(questionService.updateQuestion(Mockito.any(Question.class))).willReturn(new Question());
        given(mapper.questionToQuestionResponseDto(Mockito.any(Question.class))).willReturn(responseDto);

        long questionId = 1L;
        ResultActions actions =
                mockMvc.perform(
                        patch("/api/questions/{question-id}", questionId)
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                                .content(patchContent)
                                .with(csrf())
                );
        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.content").value(patchDto.getContent()))
                .andExpect(jsonPath("$.title").value(patchDto.getTitle()))
                .andExpect(jsonPath("$.questionStatus").value(patchDto.getQuestionStatus().getStatus()))
                .andDo(document(
                        "patch-question",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(parameterWithName("question-id").description("질문 식별자")),
                        requestFields(
                                List.of(
                                        fieldWithPath("questionId").type(JsonFieldType.NUMBER).description("질문 식별자").ignored(),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("질문 내용").optional(),
                                        fieldWithPath("title").type(JsonFieldType.STRING).description("질문 제목").optional(),
                                        fieldWithPath("questionStatus").type(JsonFieldType.STRING).description("질문 상태").optional()
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("questionId").type(JsonFieldType.NUMBER).description("질문 식별자"),
                                        fieldWithPath("title").type(JsonFieldType.STRING).description("질문 제목"),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("질문 내용"),
                                        fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("질문 작성 회원 식별자"),
                                        fieldWithPath("createdAt").type(JsonFieldType.STRING).description("질문 생성 시간"),
                                        fieldWithPath("modifiedAt").type(JsonFieldType.STRING).description("질문 수정 시간"),
                                        fieldWithPath("questionStatus").type(JsonFieldType.STRING).description("질문 상태"),
                                        fieldWithPath("answerCount").type(JsonFieldType.NUMBER).description("답변 개수"),
                                        fieldWithPath("username").type(JsonFieldType.STRING).description("질문 작성 회원 닉네임")
                                )
                        )
                ));
    }

    @Test
    void getQuestionTest() throws Exception{

        Question question = new Question();
        question.setQuestionId(1L);
        question.setContent("get 핸들러 메서드 테스트");
        question.setTitle("제목입니다.");
        question.setQuestionStatus(Question.QuestionStatus.QUESTION_OPEN);

        QuestionResponseDto responseDto = new QuestionResponseDto();
        responseDto.setQuestionId(1L);
        responseDto.setTitle("제목입니다.");
        responseDto.setContent("get 핸들러 메서드 테스트");
        responseDto.setQuestionStatus(Question.QuestionStatus.QUESTION_OPEN);
        responseDto.setModifiedAt(LocalDateTime.now());
        responseDto.setCreatedAt(LocalDateTime.now());
        responseDto.setMemberId(1L);
        responseDto.setAnswerCount(1L);
        responseDto.setUsername("홍길동");

        given(questionService.findQuestion(Mockito.anyLong())).willReturn(new Question());
        given(mapper.questionToQuestionResponseDto(Mockito.any(Question.class))).willReturn(responseDto);

        ResultActions actions =
                mockMvc.perform(
                        get("/api/questions/{question-id}",1L)
                                .accept(MediaType.APPLICATION_JSON)
                );
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").value(question.getContent()))
                .andExpect(jsonPath("$.title").value(question.getTitle()))
                .andExpect(jsonPath("$.questionStatus").value(question.getQuestionStatus().toString()))
                .andDo(document(
                        "get-question",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("question-id").description("질문 식별자")),
                                responseFields(
                                        List.of(
                                                fieldWithPath("questionId").type(JsonFieldType.NUMBER).description("질문 식별자"),
                                                fieldWithPath("title").type(JsonFieldType.STRING).description("질문 제목"),
                                                fieldWithPath("content").type(JsonFieldType.STRING).description("질문 내용"),
                                                fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("질문 작성 회원 식별자"),
                                                fieldWithPath("createdAt").type(JsonFieldType.STRING).description("질문 생성 시간"),
                                                fieldWithPath("modifiedAt").type(JsonFieldType.STRING).description("질문 수정 시간"),
                                                fieldWithPath("questionStatus").type(JsonFieldType.STRING).description("질문 상태"),
                                                fieldWithPath("answerCount").type(JsonFieldType.NUMBER).description("답변 개수"),
                                                fieldWithPath("username").type(JsonFieldType.STRING).description("질문 작성 회원 닉네임")
                                        )
                                )
                        )
                );
    }

    @Test
    void getQuestionsTest() throws Exception{
        int page = 1;
        int size = 5;

        List<Question> questions = List.of(new Question(), new Question(), new Question());

        List<QuestionResponseDto> responseDtos = List.of(
                new QuestionResponseDto(3L, "제목3","내용3", 1L, LocalDateTime.now(), LocalDateTime.now(), Question.QuestionStatus.QUESTION_OPEN, 3, "홍길동"),
                new QuestionResponseDto(2L, "제목2","내용2", 1L, LocalDateTime.now(), LocalDateTime.now(), Question.QuestionStatus.QUESTION_OPEN, 2, "홍길동"),
                new QuestionResponseDto(1L, "제목1","내용1", 1L, LocalDateTime.now(), LocalDateTime.now(), Question.QuestionStatus.QUESTION_OPEN, 1, "홍길동")
        );

        given(questionService.findQuestions(Mockito.anyInt(), Mockito.anyInt()))
                .willReturn(new PageImpl<>(questions, PageRequest.of(page-1, size, Sort.by("createdAt").descending()),questions.size()));

        given(mapper.questionsToQuestionResponses(Mockito.anyList())).willReturn(responseDtos);

        //when
        ResultActions actions = mockMvc.perform(
                get("/api/questions?page={page}&size={size}", page, size)
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.date").isArray())
                .andDo(document("get-questions",
                        preprocessResponse(prettyPrint()),
                        requestParameters(List.of(
                                parameterWithName("page").description("페이지 번호"),
                                parameterWithName("size").description("페이지 크기"))),
                        responseFields(
                                List.of(
                                        fieldWithPath("date").type(JsonFieldType.ARRAY).description("결과 데이터"),
                                        fieldWithPath("date[].questionId").type(JsonFieldType.NUMBER).description("질문 식별자"),
                                        fieldWithPath("date[].title").type(JsonFieldType.STRING).description("질문 제목"),
                                        fieldWithPath("date[].content").type(JsonFieldType.STRING).description("질문 내용"),
                                        fieldWithPath("date[].memberId").type(JsonFieldType.NUMBER).description("질문 작성 회원 식별자"),
                                        fieldWithPath("date[].createdAt").type(JsonFieldType.STRING).description("질문 생성 시간"),
                                        fieldWithPath("date[].modifiedAt").type(JsonFieldType.STRING).description("질문 수정 시간"),
                                        fieldWithPath("date[].questionStatus").type(JsonFieldType.STRING).description("질문 상태"),
                                        fieldWithPath("date[].answerCount").type(JsonFieldType.NUMBER).description("답변 개수"),
                                        fieldWithPath("date[].username").type(JsonFieldType.STRING).description("질문 작성 회원 닉네임"),
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
    void deleteQuestionsTest() throws Exception{
        doNothing().when(questionService).deleteQuestion(1L);

        ResultActions actions = mockMvc.perform(
                delete("/api/questions/{question-id}", 1L)
                        .with(csrf())
        );
        actions.andExpect(status().isNoContent())
                .andDo(document(
                        "delete-question",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("question-id").description("질문 식별자")
                        )
                ));
    }
}

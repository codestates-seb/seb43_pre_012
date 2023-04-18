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
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


import static org.mockito.BDDMockito.given;


@WebMvcTest(QuestionController.class)
@AutoConfigureRestDocs
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

//        QuestionPostDto postDto = new QuestionPostDto();
//        postDto.setContent("질문 생성 테스트입니다.");
//        String content = gson.toJson(postDto);
//
//        given(mapper.questionPostDtoToQuestion(Mockito.any(QuestionPostDto.class))).willReturn(new Question());
//
//        Question mockAnswer = new Question();
//        mockAnswer.setQuestionId(1L);
//        mockAnswer.setContent("질문 생성 테스트입니다.");
//        mockAnswer.setTitle("제목");
//        mockAnswer.setModifiedAt(LocalDateTime.now());
//        mockAnswer.setCreatedAt(LocalDateTime.now());
//        mockAnswer.setQuestionStatus(Question.QuestionStatus.QUESTION_OPEN);
//
//        given(questionService.createQuestion(Mockito.any(Question.class))).willReturn(mockAnswer);
//
//        ResultActions actions =
//                mockMvc.perform(
//                        post("/questions")
//                                .accept(MediaType.APPLICATION_JSON)  // response 데이터 타입 설정
//                                .contentType(MediaType.APPLICATION_JSON)  // 서버에서 처리하는 데이터 타입 설정
//                                .content(content) // controller 로 전송하는 request body 데이터.
//                );
//
//
//        actions
//                .andExpect(status().isCreated())
//                .andExpect(header().string("Location",is(startsWith("/questions"))))
//                .andDo(document(
//                                "post-question",
//                                preprocessRequest(prettyPrint()),
//                                preprocessResponse(prettyPrint()),
//                                requestFields(
//                                        fieldWithPath("content").type(JsonFieldType.STRING).description("답변 내용")
//                                ),
//                                responseHeaders(
//                                        headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리소스의 URI")
//                                )
//                        )
//                );
//        QuestionPostDto postDto = new QuestionPostDto("제목1","내용1");
//        String content = gson.toJson(postDto);
//
//        QuestionResponseDto responseDto = new QuestionResponseDto(1L, "제목1", "내용1",LocalDateTime.now(), LocalDateTime.now(), 1, Question.QuestionStatus.QUESTION_OPEN);
//
//        given(mapper.questionPostDtoToQuestion(Mockito.any(QuestionPostDto.class))).willReturn(new Question());
//        given(questionService.createQuestion(Mockito.any(Question.class))).willReturn(new Question());
//        given(mapper.questionToQuestionResponseDto(Mockito.any(Question.class))).willReturn(responseDto);
//
//        //when
//        ResultActions actions =
//                mockMvc.perform(
//                        post("/questions")
//                                .accept(MediaType.APPLICATION_JSON)  // response 데이터 타입 설정
//                                .contentType(MediaType.APPLICATION_JSON)  // 서버에서 처리하는 데이터 타입 설정
//                                .content(content) // controller 로 전송하는 request body 데이터.
//                );
//
//        //then
//        actions
//                .andExpect(status().isCreated())
//                .andExpect(jsonPath("$.data.content").value(postDto.getContent()))
//                .andExpect(jsonPath("$.data.title").value(postDto.getTitle()))
//                .andExpect(header().string("Location",is(startsWith("/questions"))))
//                .andDo(document(
//                                "post-question",
//                                preprocessRequest(prettyPrint()),
//                                preprocessResponse(prettyPrint()),
//                                requestFields(
//                                        List.of(
//                                                fieldWithPath("content").type(JsonFieldType.STRING).description("질문 내용"),
//                                                fieldWithPath("title").type(JsonFieldType.STRING).description("질문 제목")
//                                        )
//                                ),
//                                responseFields(
//                                        List.of(
//                                                fieldWithPath("questionId").type(JsonFieldType.NUMBER).description("질문 식별자"),
//                                                fieldWithPath("content").type(JsonFieldType.STRING).description("질문 내용"),
//                                                fieldWithPath("title").type(JsonFieldType.STRING).description("질문 제목"),
//                                                fieldWithPath("createdAt").type(JsonFieldType.STRING).description("질문 생성 시간"),
//                                                fieldWithPath("modifiedAt").type(JsonFieldType.STRING).description("질문 수정 시간"),
//                                                fieldWithPath("questionStatus").type(JsonFieldType.STRING).description("질문 상태"),
//                                                fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("질문 작성자 식별자")
//
//                                        )
//                                )
//                        )
//                );
//    }

    /*
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
                .andExpect(header().string("Location",is(startsWith("/answers"))));
    }

     */
    }




    @Test
    void patchQuestionTest() throws Exception{
        QuestionPatchDto patchDto = new QuestionPatchDto(1L,"수정된 제목","수정된 내용", Question.QuestionStatus.QUESTION_UPDATE);
        String patchContent = gson.toJson(patchDto);

        QuestionResponseDto responseDto = new QuestionResponseDto(1L, "수정된 제목","수정된 내용",LocalDateTime.now(), LocalDateTime.now(), 1, Question.QuestionStatus.QUESTION_UPDATE);

        given(mapper.questionPatchDtoToQuestion(Mockito.any(QuestionPatchDto.class))).willReturn(new Question());
        given(questionService.updateQuestion(Mockito.any(Question.class))).willReturn(new Question());
        given(mapper.questionToQuestionResponseDto(Mockito.any(Question.class))).willReturn(responseDto);

        ResultActions actions =
                mockMvc.perform(
                        patch("/questions/1")
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                                .content(patchContent)
                );
        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.content").value(patchDto.getContent()))
                .andExpect(jsonPath("$.title").value(patchDto.getTitle()))
                .andExpect(jsonPath("$.questionStatus").value(patchDto.getQuestionStatus().toString()))
                .andDo(document(
                        "patch-question",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
//                        pathParameters(parameterWithName("question-id").description("질문 식별자")),
                        requestFields(
                                List.of(
                                        fieldWithPath("questionId").type(JsonFieldType.NUMBER).description("질문 식별자").ignored(),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("질문 내용"),
                                        fieldWithPath("title").type(JsonFieldType.STRING).description("질문 제목"),
                                        fieldWithPath("questionStatus").type(JsonFieldType.STRING).description("질문 상태").optional()
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("questionId").type(JsonFieldType.NUMBER).description("질문 식별자"),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("질문 내용"),
                                        fieldWithPath("title").type(JsonFieldType.STRING).description("질문 제목"),
                                        fieldWithPath("createdAt").type(JsonFieldType.STRING).description("질문 생성 시간"),
                                        fieldWithPath("modifiedAt").type(JsonFieldType.STRING).description("질문 수정 시간"),
                                        fieldWithPath("questionStatus").type(JsonFieldType.STRING).description("질문 상태"),
                                        fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("질문 작성자 식별자")

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

        given(questionService.findQuestion(Mockito.anyLong())).willReturn(new Question());
        given(mapper.questionToQuestionResponseDto(Mockito.any(Question.class))).willReturn(responseDto);

        ResultActions actions =
                mockMvc.perform(
                        get("/questions/{question-id}",1L)
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
                                                fieldWithPath("createdAt").type(JsonFieldType.STRING).description("질문 생성 시간"),
                                                fieldWithPath("modifiedAt").type(JsonFieldType.STRING).description("질문 수정 시간"),
                                                fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("질문한 사람"),
                                                fieldWithPath("questionStatus").type(JsonFieldType.STRING).description("질문 상태")


                                        )
                                )
                        )
                );

    }

    @Test
    void getQuestionsTest() throws Exception{
//        //TODO QuestionController의 getQuestions() 핸들러 메서드를 테스트하는 테스트 케이스를 작성하세요
//
//        int page =1;
//        int size=5;
//
//        List<Question> questions = List.of(new Question(), new Question(), new Question());
//
//        List<QuestionResponseDto> responseDtos = List.of(
//                new QuestionResponseDto(3L, "제목3","내용3", LocalDateTime.now(), LocalDateTime.now(), 3, Question.QuestionStatus.QUESTION_OPEN),
//                new QuestionResponseDto(2L, "제목2","내용2", LocalDateTime.now(), LocalDateTime.now(), 2, Question.QuestionStatus.QUESTION_OPEN),
//                new QuestionResponseDto(1L, "제목1","내용1", LocalDateTime.now(), LocalDateTime.now(), 1, Question.QuestionStatus.QUESTION_OPEN)
//        );
//
//        given(questionService.findQuestions(Mockito.anyInt(), Mockito.anyInt()))
//                .willReturn(new PageImpl<>(questions, PageRequest.of(page-1, size, Sort.by("createdAt").descending()),questions.size()));
//
//        given(mapper.questionsToQuestionResponses(Mockito.anyList())).willReturn(responseDtos);
//
//        //when
//        ResultActions actions = mockMvc.perform(
//                get("/questions?page={page}&size={size}", page, size)
//                        .accept(MediaType.APPLICATION_JSON)
//        );
//
//        //then
//        actions
//                .andExpect(status().isOk())
////                .andExpect(jsonPath("$.data").isArray())
//                .andDo(document("get-questions",
//                        preprocessResponse(prettyPrint()),
//                        requestParameters(List.of(
//                                parameterWithName("page").description("페이지 번호"),
//                                parameterWithName("size").description("페이지 크기"))),
//                        responseFields(
//                                List.of(
//                                        fieldWithPath("data").type(JsonFieldType.ARRAY).description("결과 데이터"),
//                                        fieldWithPath("data[].questionId").type(JsonFieldType.ARRAY).description("질문 데이터"),
//                                        fieldWithPath("data[].memberId").type(JsonFieldType.ARRAY).description("질문자 식별 데이터"),
//                                        fieldWithPath("data[].title").type(JsonFieldType.STRING).description("질문 제목"),
//                                        fieldWithPath("data[].content").type(JsonFieldType.STRING).description("질문 내용"),
//                                        fieldWithPath("pageInfo").type(JsonFieldType.OBJECT).description("페이지 정보"),
//                                        fieldWithPath("pageInfo").type(JsonFieldType.NUMBER).description("페이지 정보"),
//                                        fieldWithPath("pageInfo.page").type(JsonFieldType.NUMBER).description("페이지 번호"),
//                                        fieldWithPath("pageInfo.size").type(JsonFieldType.NUMBER).description("페이지 크기"),
//                                        fieldWithPath("pageInfo.totalElements").type(JsonFieldType.NUMBER).description("총 갯수"),
//                                        fieldWithPath("pageInfo.totalPages").type(JsonFieldType.NUMBER).description("총 페이지 수")
//                                )
//                        )
//                ));


    }

    @Test
    void deleteQuestionsTest() throws Exception{
        doNothing().when(questionService).deleteQuestion(1L);

        ResultActions actions = mockMvc.perform(
                delete("/questions/{question-id}", 1L)
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

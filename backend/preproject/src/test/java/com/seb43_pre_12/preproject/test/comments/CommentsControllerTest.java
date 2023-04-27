package com.seb43_pre_12.preproject.test.comments;

import com.google.gson.Gson;
import com.jayway.jsonpath.JsonPath;
import com.seb43_pre_12.preproject.comments.controller.CommentsController;
import com.seb43_pre_12.preproject.comments.dto.CommentsPatchDto;
import com.seb43_pre_12.preproject.comments.dto.CommentsPostDto;
import com.seb43_pre_12.preproject.comments.dto.CommentsResponseDto;
import com.seb43_pre_12.preproject.comments.entity.Comments;
import com.seb43_pre_12.preproject.comments.mapper.CommentsMapper;
import com.seb43_pre_12.preproject.comments.service.CommentsService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
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
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(CommentsController.class)
@AutoConfigureRestDocs
@WithMockUser
public class CommentsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private CommentsService commentsService;

    @MockBean
    private CommentsMapper mapper;

    @Test
    void postCommentTest() throws Exception {
        CommentsPostDto commentsPostDto = new CommentsPostDto();
        commentsPostDto.setComment("댓글입니다.");
        commentsPostDto.setMemberId(1L);
        commentsPostDto.setAnswerId(1L);

        given(mapper.commentsPostDtoToComments(Mockito.any())).willReturn(new Comments());

        Comments comments = new Comments();
        comments.setCommentId(1L);
        String content = gson.toJson(commentsPostDto);

        given(commentsService.createComment(Mockito.any(Comments.class))).willReturn(comments);

        mockMvc.perform(
                        post("/api/comments")
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                                .content(content)
                                .with(csrf())
                )
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", is(startsWith("/api/comments/"))))
                .andDo(document(
                        "post-comment",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                List.of(
                                        fieldWithPath("comment").type(JsonFieldType.STRING).description("댓글"),
                                        fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("댓글 작성 회원 식별자"),
                                        fieldWithPath("answerId").type(JsonFieldType.NUMBER).description("댓글 작성 답변 식별자")
                                )
                        ),
                        responseHeaders(
                                headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리소스의 URI")
                        )
                ));
    }

    @Test
    void patchCommentTest() throws Exception {
        CommentsPatchDto commentsPatchDto = new CommentsPatchDto(1L, "댓글입니다.");

        CommentsResponseDto commentsResponseDto = new CommentsResponseDto(1L,
                "댓글입니다.",
                1L,
                1L,
                "홍길동",
                LocalDateTime.now(),
                LocalDateTime.now());

        given(mapper.commentsPatchDtoToComments(Mockito.any(CommentsPatchDto.class))).willReturn(new Comments());
        given(commentsService.updateComment(Mockito.any(Comments.class))).willReturn(new Comments());
        given(mapper.commentsToCommentsResponseDto(Mockito.any(Comments.class))).willReturn(commentsResponseDto);

        String content = gson.toJson(commentsPatchDto);

        long commentId = 1L;
        mockMvc.perform(
                        patch("/api/comments/{commentId}", commentId)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                                .with(csrf())
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.comment").value(commentsPatchDto.getComment()))
                .andDo(document(
                        "patch-comment",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("commentId").description("댓글식별자")
                        ),
                        requestFields(
                                List.of(
                                        fieldWithPath("commentId").type(JsonFieldType.NUMBER).description("댓글 식별자").ignored(),
                                        fieldWithPath("comment").type(JsonFieldType.STRING).description("댓글").optional()
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("commentId").type(JsonFieldType.NUMBER).description("댓글 식별자"),
                                        fieldWithPath("comment").type(JsonFieldType.STRING).description("댓글"),
                                        fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("댓글 작성 회원 식별자"),
                                        fieldWithPath("answerId").type(JsonFieldType.NUMBER).description("댓글 작성 질문 식별자"),
                                        fieldWithPath("username").type(JsonFieldType.STRING).description("댓글 작성 회원 닉네임"),
                                        fieldWithPath("createdAt").type(JsonFieldType.STRING).description("댓글 생성시간"),
                                        fieldWithPath("modifiedAt").type(JsonFieldType.STRING).description("댓글 수정시간")
                                )
                        )
                ));
    }

    @Test
    void getCommentTest() throws Exception {
        Comments comments = new Comments();
        comments.setCommentId(1L);
        comments.setComment("댓글입니다.");

        CommentsResponseDto commentsResponseDto = new CommentsResponseDto(1L,
                "댓글입니다.",
                1L,
                1L,
                "홍길동",
                LocalDateTime.now(),
                LocalDateTime.now());

        given(commentsService.findComment(Mockito.anyLong())).willReturn(new Comments());
        given(mapper.commentsToCommentsResponseDto(Mockito.any(Comments.class))).willReturn(commentsResponseDto);

        long commentId = 1L;
        mockMvc.perform(
                        get("/api/comments/{commentId}", commentId)
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.comment").value(comments.getComment()))
                .andDo(document(
                        "get-comment",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("commentId").description("댓글식별자")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("commentId").type(JsonFieldType.NUMBER).description("댓글 식별자"),
                                        fieldWithPath("comment").type(JsonFieldType.STRING).description("댓글"),
                                        fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("댓글 작성 회원 식별자"),
                                        fieldWithPath("answerId").type(JsonFieldType.NUMBER).description("댓글 작성 질문 식별자"),
                                        fieldWithPath("username").type(JsonFieldType.STRING).description("댓글 작성 회원 닉네임"),
                                        fieldWithPath("createdAt").type(JsonFieldType.STRING).description("댓글 생성시간"),
                                        fieldWithPath("modifiedAt").type(JsonFieldType.STRING).description("댓글 수정시간")
                                )
                        )
                ));
    }

    @Test
    void getCommentsTest() throws Exception {
        Comments comments1 = new Comments();
        comments1.setCommentId(1L);
        comments1.setComment("첫번째 댓글입니다.");

        Comments comments2 = new Comments();
        comments2.setCommentId(2L);
        comments2.setComment("두번째 댓글입니다.");

        List<CommentsResponseDto> responseDtos = List.of(
                new CommentsResponseDto(1L,
                        "첫번째 댓글입니다.",
                        1L,
                        1L,
                        "홍길동",
                        LocalDateTime.now(),
                        LocalDateTime.now()),
                new CommentsResponseDto(2L,
                        "두번째 댓글입니다.",
                        2L,
                        1L,
                        "홍길은",
                        LocalDateTime.now(),
                        LocalDateTime.now())
        );

        given(commentsService.findComments()).willReturn(new ArrayList<>());
        given(mapper.commentsToCommentsResponseDtos(Mockito.anyList())).willReturn(responseDtos);

        ResultActions actions = mockMvc.perform(
                get("/api/comments")
                        .accept(MediaType.APPLICATION_JSON)
        );

        MvcResult result = actions
                .andExpect(status().isOk())
                .andDo(document(
                        "get-comments",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        responseFields(
                                List.of(
                                        fieldWithPath("[].commentId").type(JsonFieldType.NUMBER).description("댓글 식별자"),
                                        fieldWithPath("[].comment").type(JsonFieldType.STRING).description("댓글"),
                                        fieldWithPath("[].memberId").type(JsonFieldType.NUMBER).description("댓글 작성 회원 식별자"),
                                        fieldWithPath("[].answerId").type(JsonFieldType.NUMBER).description("댓글 작성 질문 식별자"),
                                        fieldWithPath("[].username").type(JsonFieldType.STRING).description("댓글 작성 회원 닉네임"),
                                        fieldWithPath("[].createdAt").type(JsonFieldType.STRING).description("댓글 생성시간"),
                                        fieldWithPath("[].modifiedAt").type(JsonFieldType.STRING).description("댓글 수정시간")
                                )
                        )
                )).andReturn();

        List list = JsonPath.parse(result.getResponse().getContentAsString()).read("$");
        assertThat(list.size(), is(2));;
    }

    @Test
    void deleteCommentTest() throws Exception {
        long commentId = 1L;

        doNothing().when(commentsService).deleteComment(commentId);

        ResultActions actions = mockMvc.perform(
                delete("/api/comments/{commentId}", commentId)
                        .with(csrf())
        );

        actions.andExpect(status().isNoContent())
                .andDo(document(
                        "delete-comment",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("commentId").description("댓글 식별자")
                        )
                ));
    }
}

import styled from "styled-components";
import { useState } from "react";
import { Viewer } from "@toast-ui/react-editor";

import {
  faCheck,
  faXmark,
  faFaceLaughSquint,
  faFaceFrown,
  faBookmark,
  faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  removeAnswer,
  removeComment,
  updateAnswer,
  updateComment,
} from "../hooks/tempUseQuestion";
import MakeComment from "../components/MakeComment";
import EditAnswer from "./EditAnswer";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: start;
  padding: 10px 0;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  margin-bottom: 5px;
  position: relative;
`;

const ScoreSpace = styled.div`
  max-width: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  margin-right: 10px;
`;

const Score = styled.span`
  font-size: 20px;
`;

const Contents = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding-left: 10px;
`;

const Owner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 10px;
`;

const CRUDs = styled.div`
  display: flex;
  align-items: center;
`;

const CRUD = styled.h6`
  color: ${(props) => props.theme.colors.gray};
  font-size: ${(props) => props.theme.fontSizes.md};
  margin-right: 5px;

  &:hover {
    color: #0c0d0e;
    cursor: pointer;
  }
`;

const Date = styled.h6`
  color: ${(props) => props.theme.colors.blue};
  font-size: ${(props) => props.theme.fontSizes.md};
`;

const OwnerInfo = styled.div`
  width: 200px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.div`
  width: 35px;
  height: 35px;
  margin-right: 5px;
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center;
  margin-right: 10px;
`;

const OwnerName = styled.div``;

const Comments = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CommentLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  height: 35px;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  margin-bottom: 2px;
  padding-left: 10px;
`;

const CommentInfos = styled.div`
  display: flex;
  align-items: center;
`;

const CommentInfo = styled.h5`
  font-size: ${(props) => props.theme.fontSizes.lg};
  margin-right: 10px;
`;

const CommentBtn = styled.span`
  margin: 20px;
  font-size: ${(props) => props.theme.fontSizes.lg};
  color: gray;

  &:hover {
    color: #0c0d0e;
    cursor: pointer;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 15;
  width: 100vw;
  height: 100vh;
`;

const EditCommentInput = styled.input`
  width: 60%;
  height: 80%;
  padding-left: 10px;
`;

const SELECTED = "ANSWER_SELECTED";
const NOTSELECTED = "ANSWER_NOT_SELECTED";

export default function Answer({ answer }) {
  const [makeComment, setMakeComment] = useState(false);
  const [editCommentId, setEditCommentId] = useState(-1);
  const [editedComment, setEditedComment] = useState("");
  const [editAnswer, setEditAnswer] = useState(null);

  const handleDeleteComment = async (commentId) => {
    await removeComment(commentId);
    window.location.reload();
    // window.location.replace(`/questions/${answer.questionId}`);
  };

  const handleEditCommentValue = (e) => {
    setEditedComment((prev) => e.target.value);
  };

  const handleEditComment = async (comment) => {
    let edited = { commentId: comment.commentId, comment: editedComment };
    await updateComment(edited);

    setEditCommentId((prev) => -1);
    window.location.reload();
    //window.location.replace(`/questions/${answer.questionId}`);
  };

  const handleAnswerSelect = async (selected) => {
    const { answerId, content } = answer;
    let editedAnswer = { answerId, content, selected };

    await updateAnswer(editedAnswer);
  };

  const handleDeletaAnswer = async (answerId) => {
    await removeAnswer(answerId);
    window.location.reload();
    // window.location.replace(`/questions/${answer.questionId}`);
  };

  return (
    <>
      <Container>
        <ScoreSpace>
          <FontAwesomeIcon
            icon={faCheck}
            style={{ fontSize: "30px" }}
            onClick={() => handleAnswerSelect(SELECTED)}
          />
          <FontAwesomeIcon
            icon={
              answer.selected === SELECTED ? faFaceLaughSquint : faFaceFrown
            }
            style={{ fontSize: "20px" }}
          />
          <FontAwesomeIcon
            icon={faXmark}
            style={{ fontSize: "35px" }}
            onClick={() => handleAnswerSelect(NOTSELECTED)}
          />
          <FontAwesomeIcon
            icon={faBookmark}
            style={{ fontSize: "15px", marginBottom: "5px" }}
          />
          <FontAwesomeIcon
            icon={faClockRotateLeft}
            style={{ fontSize: "15px", marginBottom: "5px" }}
          />
        </ScoreSpace>
        <Contents>
          <Viewer initialValue={answer.content} />
          <Owner>
            <CRUDs>
              <CRUD>Share</CRUD>
              <CRUD onClick={() => setEditAnswer((prev) => answer)}>Edit</CRUD>
              <CRUD onClick={() => handleDeletaAnswer(answer.answerId)}>
                Delete
              </CRUD>
            </CRUDs>
            <Date>{`Created At ${answer.createdAt}`}</Date>
            <OwnerInfo>
              <Icon
                bgImage={
                  "https://cdn.pixabay.com/photo/2022/11/22/22/06/bird-7610726_1280.jpg"
                }
              />
              <OwnerName>{answer.username}</OwnerName>
            </OwnerInfo>
          </Owner>
          {answer.comments && answer.comments.length > 0 ? (
            <Comments>
              {answer.comments.map((comment, index) => (
                <CommentLine key={comment.commentId + ""}>
                  {editCommentId === comment.commentId ? (
                    <>
                      <EditCommentInput
                        placeholder="Edit comment"
                        onChange={handleEditCommentValue}
                      />
                      <CommentBtn onClick={() => handleEditComment(comment)}>
                        Edit
                      </CommentBtn>
                    </>
                  ) : (
                    <>
                      <CommentInfos>
                        <CommentInfo>{index + 1}</CommentInfo>
                        <CommentInfo>{comment.comment}</CommentInfo>
                        <CommentInfo>{comment.username}</CommentInfo>
                      </CommentInfos>
                      <CommentInfos>
                        <CommentBtn
                          onClick={() => handleDeleteComment(comment.commentId)}
                        >
                          Delete
                        </CommentBtn>
                        <CommentBtn
                          onClick={() =>
                            setEditCommentId((prev) => comment.commentId)
                          }
                        >
                          Edit
                        </CommentBtn>
                      </CommentInfos>
                    </>
                  )}
                </CommentLine>
              ))}
            </Comments>
          ) : null}
          <CommentBtn onClick={() => setMakeComment((prev) => true)}>
            Add a comment
          </CommentBtn>
        </Contents>
      </Container>
      {makeComment && (
        <>
          <Overlay onClick={() => setMakeComment((prev) => null)} />
          <MakeComment
            answerId={answer.answerId}
            questionId={answer.questionId}
          />
        </>
      )}
      {editAnswer && (
        <>
          <Overlay onClick={() => setEditAnswer((prev) => false)} />
          <EditAnswer answer={editAnswer} />
        </>
      )}
    </>
  );
}

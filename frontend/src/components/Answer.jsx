import styled from "styled-components";
import { Viewer } from "@toast-ui/react-editor";
import {
  faCaretUp,
  faCaretDown,
  faBookmark,
  faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { removeAnswer } from "../hooks/tempUseQuestion";

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

export default function Answer({ answer, setEditAnswer }) {
  return (
    <Container>
      <ScoreSpace>
        <FontAwesomeIcon icon={faCaretUp} style={{ fontSize: "40px" }} />
        <Score>{answer.score}</Score>
        <FontAwesomeIcon icon={faCaretDown} style={{ fontSize: "40px" }} />
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
        <Viewer initialValue={answer.content || answer.body} />
        <Owner>
          <CRUDs>
            <CRUD>Share</CRUD>
            <CRUD onClick={() => setEditAnswer((prev) => answer)}>Edit</CRUD>
            <CRUD onClick={() => removeAnswer(answer.answerId || answer.id)}>
              Delete
            </CRUD>
          </CRUDs>
          <Date>{`Created At ${
            answer.creation_date || answer.createdAt
          }`}</Date>
          <OwnerInfo>
            <Icon
              bgImage={
                answer.owner.profile_image ||
                "https://cdn.pixabay.com/photo/2022/11/22/22/06/bird-7610726_1280.jpg"
              }
            />
            <OwnerName>
              {answer.owner.display_name || answer.username}
            </OwnerName>
          </OwnerInfo>
        </Owner>
      </Contents>
    </Container>
  );
}

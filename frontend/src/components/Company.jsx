import styled from "styled-components";
import Tag from "../components/Tag";
import { useState } from "react";

const Container = styled.div`
  width: 100%;
  height: 150px;
  border-radius: 5px;
  padding: 20px 40px 20px 25px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray};
`;

const Icon = styled.div`
  width: 65px;
  height: 65px;
  background-color: black;
  margin-right: 25px;
`;

const Infos = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Title = styled.h4`
  font-size: ${(props) => props.theme.fontSizes.lg};
  color: ${(props) => props.theme.colors.blue};
`;

const OtherInfos = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
`;

const OtherInfo = styled.h5`
  margin-right: 10px;
`;

const Content = styled.h5`
  position: relative;
`;

const Tags = styled.div`
  display: flex;
  align-items: center;
`;

const DontSee = styled.div`
  width: 25px;
  height: 25px;
  position: absolute;
  right: -25px;
  top: 0;
  font-size: ${(props) => props.theme.fontSizes.lg};

  display: ${(props) => (props.canBlock ? "block" : "none")};
`;

export default function Company({ company }) {
  const [canBlock, setCanBlock] = useState(false);

  return (
    <Container>
      <Icon />
      <Infos>
        <Title>{company.name}</Title>
        <OtherInfos>
          <OtherInfo>{company.location}</OtherInfo>
          <OtherInfo>
            {company.works.map((work) => (
              <span key={work}>{work}</span>
            ))}
          </OtherInfo>
        </OtherInfos>
        <Content
          onMouseEnter={() => setCanBlock((prev) => true)}
          onMouseOut={() => setCanBlock((prev) => false)}
        >
          {company.content.length > 300
            ? company.content.slice(0, 300) + "..."
            : company.content}
          <DontSee canBlock={canBlock}>X</DontSee>
        </Content>
        <Tags>
          {company.tags.map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
        </Tags>
      </Infos>
    </Container>
  );
}

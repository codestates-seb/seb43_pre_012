import React, { useState } from "react";
import styled from "styled-components";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageBtns from "../components/PageBtns";
import Company from "../components/Company";
import FilterBox from "../components/FilterBox";
import Nav from "../components/Nav";

const dummyCompanies = [
  {
    id: 1,
    icon: "",
    name: "Westpac",
    location: "Surfers Paradise; Sydney; Kogarah",
    works: [
      "Banking",
      "Financial Technology",
      "Software Development / Engineering",
    ],
    tags: ["corejava", "java", "spring"],
    content:
      "Our engineers are vital to the success of our digital future. So, we’ve created the best possible environment for you to collaborate and innovate. We’re ensuring the work is challenging yet satisfying by building and assembling using the latest technologies and methods. Everything we do is designed to give you more freedom, more choice, more support, and less red tape so you can get on with the fun stuff – building the systems that change the future. ",
  },
  {
    id: 2,
    icon: "",
    name: "Westpac",
    location: "Surfers Paradise; Sydney; Kogarah",
    works: [
      "Banking",
      "Financial Technology",
      "Software Development / Engineering",
    ],
    tags: ["corejava", "java", "spring"],
    content:
      "Our engineers are vital to the success of our digital future. So, we’ve created the best possible environment for you to collaborate and innovate. We’re ensuring the work is challenging yet satisfying by building and assembling using the latest technologies and methods. Everything we do is designed to give you more freedom, more choice, more support, and less red tape so you can get on with the fun stuff – building the systems that change the future. ",
  },
  {
    id: 3,
    icon: "",
    name: "Westpac",
    location: "Surfers Paradise; Sydney; Kogarah",
    works: [
      "Banking",
      "Financial Technology",
      "Software Development / Engineering",
    ],
    tags: ["corejava", "java", "spring"],
    content:
      "Our engineers are vital to the success of our digital future. So, we’ve created the best possible environment for you to collaborate and innovate. We’re ensuring the work is challenging yet satisfying by building and assembling using the latest technologies and methods. Everything we do is designed to give you more freedom, more choice, more support, and less red tape so you can get on with the fun stuff – building the systems that change the future. ",
  },
  {
    id: 4,
    icon: "",
    name: "Westpac",
    location: "Surfers Paradise; Sydney; Kogarah",
    works: [
      "Banking",
      "Financial Technology",
      "Software Development / Engineering",
    ],
    tags: ["corejava", "java", "spring"],
    content:
      "Our engineers are vital to the success of our digital future. So, we’ve created the best possible environment for you to collaborate and innovate. We’re ensuring the work is challenging yet satisfying by building and assembling using the latest technologies and methods. Everything we do is designed to give you more freedom, more choice, more support, and less red tape so you can get on with the fun stuff – building the systems that change the future. ",
  },
  {
    id: 5,
    icon: "",
    name: "Westpac",
    location: "Surfers Paradise; Sydney; Kogarah",
    works: [
      "Banking",
      "Financial Technology",
      "Software Development / Engineering",
    ],
    tags: ["corejava", "java", "spring"],
    content:
      "Our engineers are vital to the success of our digital future. So, we’ve created the best possible environment for you to collaborate and innovate. We’re ensuring the work is challenging yet satisfying by building and assembling using the latest technologies and methods. Everything we do is designed to give you more freedom, more choice, more support, and less red tape so you can get on with the fun stuff – building the systems that change the future. ",
  },
  {
    id: 6,
    icon: "",
    name: "Westpac",
    location: "Surfers Paradise; Sydney; Kogarah",
    works: [
      "Banking",
      "Financial Technology",
      "Software Development / Engineering",
    ],
    tags: ["corejava", "java", "spring"],
    content:
      "Our engineers are vital to the success of our digital future. So, we’ve created the best possible environment for you to collaborate and innovate. We’re ensuring the work is challenging yet satisfying by building and assembling using the latest technologies and methods. Everything we do is designed to give you more freedom, more choice, more support, and less red tape so you can get on with the fun stuff – building the systems that change the future. ",
  },
  {
    id: 7,
    icon: "",
    name: "Westpac",
    location: "Surfers Paradise; Sydney; Kogarah",
    works: [
      "Banking",
      "Financial Technology",
      "Software Development / Engineering",
    ],
    tags: ["corejava", "java", "spring"],
    content:
      "Our engineers are vital to the success of our digital future. So, we’ve created the best possible environment for you to collaborate and innovate. We’re ensuring the work is challenging yet satisfying by building and assembling using the latest technologies and methods. Everything we do is designed to give you more freedom, more choice, more support, and less red tape so you can get on with the fun stuff – building the systems that change the future. ",
  },
  {
    id: 8,
    icon: "",
    name: "Westpac",
    location: "Surfers Paradise; Sydney; Kogarah",
    works: [
      "Banking",
      "Financial Technology",
      "Software Development / Engineering",
    ],
    tags: ["corejava", "java", "spring"],
    content:
      "Our engineers are vital to the success of our digital future. So, we’ve created the best possible environment for you to collaborate and innovate. We’re ensuring the work is challenging yet satisfying by building and assembling using the latest technologies and methods. Everything we do is designed to give you more freedom, more choice, more support, and less red tape so you can get on with the fun stuff – building the systems that change the future. ",
  },
  {
    id: 9,
    icon: "",
    name: "Westpac",
    location: "Surfers Paradise; Sydney; Kogarah",
    works: [
      "Banking",
      "Financial Technology",
      "Software Development / Engineering",
    ],
    tags: ["corejava", "java", "spring"],
    content:
      "Our engineers are vital to the success of our digital future. So, we’ve created the best possible environment for you to collaborate and innovate. We’re ensuring the work is challenging yet satisfying by building and assembling using the latest technologies and methods. Everything we do is designed to give you more freedom, more choice, more support, and less red tape so you can get on with the fun stuff – building the systems that change the future. ",
  },
  {
    id: 10,
    icon: "",
    name: "Westpac",
    location: "Surfers Paradise; Sydney; Kogarah",
    works: [
      "Banking",
      "Financial Technology",
      "Software Development / Engineering",
    ],
    tags: ["corejava", "java", "spring"],
    content:
      "Our engineers are vital to the success of our digital future. So, we’ve created the best possible environment for you to collaborate and innovate. We’re ensuring the work is challenging yet satisfying by building and assembling using the latest technologies and methods. Everything we do is designed to give you more freedom, more choice, more support, and less red tape so you can get on with the fun stuff – building the systems that change the future. ",
  },
];

const lg = "1280px";

const Container = styled.main`
  max-width: 1077px;
  width: 100%;
  margin-bottom: 50px;

  @media screen and (max-width: 1280px) {
    margin-right: 40px;
  }
`;

const Header = styled.section`
  width: 100%;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding-left: 25px;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray};
  position: relative;
`;

const Titles = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: ${(props) => props.fontSize};
`;

const Inputs = styled.form`
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: start;
  position: relative;
`;

const Input = styled.input`
  max-width: 400px;
  width: 100%;
  height: 100%;
  margin-right: 5px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.colors.gray}; ;
`;

const SearchBtn = styled.button`
  min-width: 80px;
  margin-right: 5px;
  border: none;
  height: 45px;
  background-color: ${(props) => props.theme.colors.skyblue};
  color: white;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

const FilterByTag = styled.div`
  min-width: 125px;
  margin-right: 5px;
  height: 45px;
  color: ${(props) => props.theme.colors.gray};
  border: 1px solid ${(props) => props.theme.colors.gray};
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.theme.fontSizes.lg};
  font-weight: bold;
`;

const CompaniesNum = styled.h6`
  margin-top: 10px;
  font-size: ${(props) => props.theme.fontSizes.sm};
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 15;

  width: 100vw;
  height: 100vh;
`;

export default function Companies() {
  const [isFilterClicked, setIsFilterClicked] = useState(false);

  return (
    <>
      {" "}
      <>
        <Nav />
        <Container>
          <Header>
            <Titles>
              <Title fontSize={"25px"}>Companies</Title>
              <Title fontSize={"15px"}>
                Learn about what it's like to work at companies
              </Title>
            </Titles>
            <Inputs>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "7px",
                  fontSize: "25px",
                }}
              />
              <Input
                placeholder="Search all companies"
                style={{ paddingLeft: "40px" }}
              />
              <Input placeholder="Search company by location" />
              <SearchBtn>Search</SearchBtn>
              <FilterByTag
                onClick={() => {
                  setIsFilterClicked((prev) => true);
                }}
              >
                Filter By Tag
              </FilterByTag>
            </Inputs>
            <CompaniesNum>122 companies</CompaniesNum>
            {isFilterClicked && (
              <>
                <Overlay
                  onClick={() => {
                    setIsFilterClicked((prev) => false);
                  }}
                />
                <FilterBox></FilterBox>
              </>
            )}
          </Header>
          {dummyCompanies.map((company) => (
            <Company key={company.id} company={company} />
          ))}
          <PageBtns />
        </Container>
      </>
    </>
  );
}

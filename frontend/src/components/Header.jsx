import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import largeLogo from "../static/large-logo.png";
import smallLogo from "../static/small-logo.png";
import { Link } from "react-router-dom";
import { Fade as Hamburger } from "hamburger-react";

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: #fffefe;
  height: 50px;
  border-top: 3px solid ${({ theme }) => theme.colors.orange};
  box-shadow: 0 0 3px gray;
`;
const Logo = styled.img`
  width: 200px;
  padding-right: 40px;
  &.smallLogo {
    display: none;
  }
  @media screen and (max-width: ${({ theme }) => theme.screen.md}) {
    &.largeLogo {
      padding-right: 40px;
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.screen.sm}) {
    &.largeLogo {
      display: none;
    }
    &.smallLogo {
      width: 35px;
      padding-left: 20px;
      display: block;
    }
  }
`;

const Menu = styled.div`
    font-size: 15px;
    padding-right: 22px;
    color : black;
    white-space: nowrap;
    text-decoration-line: none;
    @media screen and (max-width: ${({ theme }) => theme.screen.md}) {
        &.about, &.forteams {
            display : none;
        }
}
`;
const Scope = styled.div`
  display: none;
  font-size: 20px;
  padding-right: 9px;
  @media screen and (max-width: ${({ theme }) => theme.screen.sm}) {
    display: block;
  }
`;

const SearchBar = styled.div`
  width: 40%;
  height: 33px;
  border-radius: 4px;
  border: solid 1px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: start;
  align-items: center;
  z-index: 1;
  opacity: 1;
  margin-right: 10px;

  .search-bar__input {
    width: 90%;
    border: none;
    text-align: start;
    margin-left: 5px;
    overflow: auto;
    z-index: -3;
    font-size: 15px;

    &:focus {
      outline: none;
      width: 300px;
      text-align: left;
    }
  }

  .searchIcon {
    font-size: 20px;
    margin-left: 10px;
  }
  @media screen and (max-width: ${({ theme }) => theme.screen.md}) {
    width: 300px;
  }
  @media screen and (max-width: ${({ theme }) => theme.screen.sm}) {
    display: none;
  }
`;

const Button = styled.button`
  height: 34px;
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid #7aa8c7;
  margin-right: 5px;
  border-radius: 3px;
  white-space: nowrap;
  &.login {
    background-color: ${({ theme }) => theme.colors.tagblue};
    color: #7aa8c7;
  }
  &.signup {
    background-color: ${({ theme }) => theme.colors.skyblue};
    color: white;
  }
`;

export default function Header() {

    const [isOpen, setIsOpen] = useState(false);
    
    const openModalHandler = () => {
        // isOpen의 상태를 변경하는 메소드를 구현
        // !false -> !true -> !false
        setIsOpen(!isOpen) 
    };

    return (
        <HeaderWrapper>
            <Hamburger color='black' size={18} onClick={openModalHandler} />
            <Link to = "/">
                <Logo className='largeLogo' src={largeLogo} />
                <Logo className='smallLogo' src={smallLogo} />
            </Link>
            <Link to="Questions">
                <Menu >Questions</Menu>
			</Link>
            <Link to="Tags">
                <Menu >Tags</Menu>
			</Link>
            <Link to="Companies">
                <Menu >Companies</Menu>
			</Link>
            <SearchBar>
                <FontAwesomeIcon className = "searchIcon" icon={faMagnifyingGlass} color='#838C95'/>
                <input className="search-bar__input" type="search" placeholder="Search..." />
            </SearchBar>
            <Scope className='scope'>
            <FontAwesomeIcon className = "searchIcon" icon={faMagnifyingGlass} color='#838C95'/>
            </Scope>
            <Link to="login">
                <Button className='login'>Log in</Button>
			</Link>
            <Link to="signup">
                <Button className='signup'>Sign up</Button>
			</Link>

        </HeaderWrapper>
    )
}

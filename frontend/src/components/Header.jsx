import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';
import largeLogo from "../static/large-logo.png"
import smallLogo from "../static/small-logo.png"
import { Link } from "react-router-dom";
import { Fade as Hamburger } from 'hamburger-react'

const HeaderWrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
background-color: white;
color: #fffefe;
height: 50px;
border-top : 3px solid ${({ theme }) => theme.colors.orange};
box-shadow : 0 0 3px gray;

`;
const Logo = styled.img`
width: 200px;
padding-right : 40px;
&.smallLogo{
    display : none;
}
@media screen and (max-width: ${({ theme }) => theme.screen.md}) {
    &.largeLogo {
        padding-right : 40px;
    }
}

@media screen and (max-width: ${({ theme }) => theme.screen.sm}) {
    &.largeLogo {
        display : none;
    }
    &.smallLogo{
        width: 35px;
        padding-left : 20px;
        display : block;
    }
}
`;
const Menu = styled.a`
font-size: 13px;
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
display : none;
padding-right : 9px;
@media screen and (max-width: ${({ theme }) => theme.screen.sm}) {
    display : block;
}
`
const Input = styled.input`
width : 40%;
height : 33px;
margin-right : 5px;
border-radius : 3px;
border : 1px solid gray;
@media screen and (max-width: ${({ theme }) => theme.screen.md}) {
    width : 300px;
}
@media screen and (max-width: ${({ theme }) => theme.screen.sm}) {
    display : none;
}
`
const Button = styled.button`
height : 34px;
width : 60px;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
border : 1px solid #7AA8C7;
margin-right : 5px;
border-radius : 3px;
white-space: nowrap;
&.login{
    background-color : ${({ theme }) => theme.colors.tagblue};
    color : #7AA8C7;
}
&.signup{
    background-color : ${({ theme }) => theme.colors.skyblue};
    color : white;
}

`




export default function Header() {

    return (

        <HeaderWrapper>
            <Hamburger color='black' size={18} />
            <Link to = "/">
                <Logo className='largeLogo' src={largeLogo} />
                
                <Logo className='smallLogo' src={smallLogo} />
            </Link>
            <Menu className='about' href="About.js">About</Menu>
            <Menu className='products' href="Products.js">Products</Menu>
            <Menu className='forteams' href="ForTeams">For Teams</Menu>
            <Input placeholder='🔍 Search....'></Input>
            <Scope className='scope'>
                <AiOutlineSearch size={28} color="#000"/>
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


import styled from 'styled-components';
import largeLogo from "../static/large-logo.png"
import smallLogo from "../static/small-logo.png"

const HeaderWrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
background-color: white;
color: #faf9f9;
height: 50px;
border-top : 3px solid ${({ theme }) => theme.colors.orange};
box-shadow : 0 0 3px gray;

`;
const Logo = styled.img`
width: 150px;
padding-right : 40px;
&.smallLogo{
    display : none;
}
@media screen and (max-width: ${({ theme }) => theme.screen.md}) {
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
width : 300px;
height : 30px;
margin-right : 5px;
border-radius : 3px;
border : 1px solid gray;
@media screen and (max-width: ${({ theme }) => theme.screen.sm}) {
    display : none;
}
`
const Button = styled.button`
height : 34px;
display: flex;
justify-content: center;
align-items: center;
border : 1px solid ${({ theme }) => theme.colors.skyblue};
margin-right : 5px;
border-radius : 3px;
white-space: nowrap;
&.login{
    background-color : ${({ theme }) => theme.colors.tagblue};
    color : navy;
}
&.signup{
    background-color : ${({ theme }) => theme.colors.skyblue};
    color : white;
}

`

export default function Header() {

    return (
        <HeaderWrapper>
            <Logo className='largeLogo' src={largeLogo} />
            <Logo className='smallLogo' src={smallLogo} />
            <Menu className='about' href="About.js">About</Menu>
            <Menu className='products' href="Products.js">Products</Menu>
            <Menu className='forteams' href="ForTeams">For Teams</Menu>
            <Input placeholder='🔍 Search...'></Input>
            <Scope className='scope'>🔍</Scope>
            <Button className='login'>Log in</Button>
            <Button className='signup'>Sign up</Button>
        </HeaderWrapper>
    )
}


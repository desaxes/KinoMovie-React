import styled from 'styled-components';

export const AppWrapper = styled.div`
padding:20px 0;
position:absolute;
width:100%;
min-height:100%;
background-color: #000000;
color:white;
/* padding:2rem; */
`
export const Main = styled.div<{ wid?: string, hig?: string, disp?: string }>`
width:${props => props.wid};
height:${props => props.hig};
display:${props => props.disp};
`
export const Header = styled.div<{ wid?: string, hig?: string }>`
width:${props => props.wid};
height:${props => props.hig};
`
export const Footer = styled.div<{ wid?: string, hig?: string }>`
width:${props => props.wid};
height:${props => props.hig};
`
export const StyledTitle = styled.h1<{
    fz?: string, wid?: string, align?: string, opacity?: string, hover?: string, lh?: string, dec?: string
}>`
color:${props => props.color};
font-size: ${props => props.fz};
width:${props => props.wid};
text-align:${props => props.align};
opacity:${props => props.opacity};
line-height:${props => props.lh};
text-decoration:${props => props.dec};
`
export const StyledBox = styled.div<{
    wid?: string, hig?: string, bdr?: string, mar?: string, pad?: string
}>`
max-width:${props => props.wid};
max-height: ${props => props.hig};
border-radius:${props => props.bdr};
margin:${props => props.mar};
padding:${props => props.pad};
position:relative;
`
export const StyledImg = styled.img<{ wid?: string, hig?: string, bdr?: string, hover?: string }>`
width:${props => props.wid};
height: ${props => props.hig};
border-radius:${props => props.bdr};
src:${props => props.src};
`
export const StyledButton = styled.button<{
    bgc?: string, color?: string, hover?: string, wid?: string, hig?: string,
    bordrad?: string, bord?: string, pad?: string
}>`
width:${props => props.wid};
height: ${props => props.hig};
cursor: pointer;
border-radius:${props => props.bordrad ? props.bordrad : '20px'};
border:${props => props.bord ? props.bord : 'none'};
font-weight:900;
background-color: ${props => props.bgc};
font-size:24px;
font-style:italic;
text-align:center;
color:${props => props.color};
transition: 0.3s;
padding:${props => props.pad};
&:hover{
    background-color:${props => props.hover}; 
}
&:active{
    border:solid 1px white;
}
`
export const Flex = styled.div<{
    dir?: string, align?: string, jstf?: string,
    gap?: string, fz?: string, fw?: string, fs?: string,
    wid?: string, hig?: string, mr?: string, mt?: string, ml?: string, mb?: string,
    cursor?: string, hover?: string, pad?: string, dec?: string
}>`
display:flex;
flex-direction:${props => props.dir};
align-items:${props => props.align};
justify-content:${props => props.jstf};
gap:${props => props.gap};
font-size:${props => props.fz};
font-weight:${props => props.fw};
font-style:${props => props.fs};
text-decoration:${props => props.dec};
width:${props => props.wid};
height:${props => props.hig};
margin-right:${props => props.mr};
margin-top:${props => props.mt};
margin-left:${props => props.ml};
margin-bottom:${props => props.mb};
padding:${props => props.pad};
cursor: ${props => props.cursor};
&:hover{
    color:${props => props.hover}
}
`
export const Grid = styled.div<{ wid?: string, hig?: string, row: string, col: string, rgap?: string, cgap?: string, mar?: string }>`
display:grid;
width:${props => props.wid};
height: ${props => props.hig};
grid-template-rows: ${props => props.row};
grid-template-columns: ${props => props.col};
row-gap:${props => props.rgap};
column-gap:${props => props.cgap};
margin:${props => props.mar};
justify-content:center;
align-items:center;
`
export const Container = styled.div`
width:100%;
max-width:1600px;
margin:0 auto;
`
export const StyledInput = styled.input<{ textalign?: string }>`
border:none;
border-bottom:solid red 3px;
background-color: transparent;
color:white;
width:90%;
height:50px;
font-size:40px;
padding:0 10px;
border-radius: 0.25rem;
outline:none;
text-align:${props => props.textalign}
`
export const StyledUserMenu = styled.div<{ disp: string }>`
position:absolute;
display:${props => props.disp};
width:300px;
height:30px;
top:100%;
right:0;
border:solid 1px white;
border-radius:5px;
`


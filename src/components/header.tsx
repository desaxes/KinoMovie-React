import React, { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react'
import { Flex, StyledImg, StyledTitle, StyledButton, Header, StyledUserMenu, StyledBox } from "../styledcomponents/styled-components.ts"
// @ts-ignore
import logo from '../img/logo.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthMenu } from './auth-menu.tsx';
import { useWindowSize } from '../hooks/windowSize.ts';
export const HeaderComponent: FC<{ theme: string[], setTheme: Dispatch<SetStateAction<string[]>> }> = (props) => {
    const windowSize = useWindowSize()
    const location = useLocation()
    const navigate = useNavigate()
    const link = (url: string) => {
        navigate(url)
    }
    return (
        <Header hig='50px'>
            <Flex hig='100%' jstf='space-around' gap='20px' align='center' dir={windowSize.innerWidth > 1000 ? 'row' : 'column'}>
                <Flex align='center' gap='10px'>
                    <Flex cursor='pointer' onClick={() => link('/main')} gap={windowSize.innerWidth > 1000 ? '20px' : '10px'} align='center'>
                        <StyledImg wid='85px' src={logo}></StyledImg>
                        <StyledTitle fz='24px'>KinoMovie</StyledTitle>
                    </Flex>
                    {windowSize.innerWidth <= 1000 && <AuthMenu theme={props.theme} setTheme={props.setTheme} />}
                </Flex>
                <Flex mb='15px' jstf='center' gap={windowSize.innerWidth > 1000 ? '20px' : '10px'} align={'center'} mr={windowSize.innerWidth > 1000 ? '7%' : '0'}>
                    {/* <StyledButton
                        wid='120px' hig='50px'
                        hover={location.pathname === '/main' ? '#fff' : '#ff0000'}
                        color={location.pathname === '/main' ? '#000' : '#fff'}
                        bgc={location.pathname === '/main' ? '#fff' : '#000'}
                        onClick={() => link('/main')}>Main</StyledButton> */}
                    <StyledButton
                        wid={windowSize.innerWidth > 1000 ? '120px' : '70px'} hig='50px'
                        hover={location.pathname === '/main' ? props.theme[1] : '#ff0000'}
                        color={location.pathname === '/main' ? props.theme[0] : props.theme[1]}
                        bgc={location.pathname === '/main' ? props.theme[1] : props.theme[0]}
                        fz={windowSize.innerWidth > 1000 ? '24px' : '16px'}
                        onClick={() => link('/main')}>Main</StyledButton>
                    <StyledButton
                        wid={windowSize.innerWidth > 1000 ? '120px' : '70px'} hig='50px'
                        hover={location.pathname === '/search' ? props.theme[1] : '#ff0000'}
                        color={location.pathname === '/search' ? props.theme[0] : props.theme[1]}
                        bgc={location.pathname === '/search' ? props.theme[1] : props.theme[0]}
                        fz={windowSize.innerWidth > 1000 ? '24px' : '16px'}
                        onClick={() => link('/search')}>Search</StyledButton>
                    {/* <StyledButton
                        wid='120px' hig='50px'
                        hover={location.pathname === '/series' ? '#fff' : '#ff0000'}
                        color={location.pathname === '/series' ? '#000' : '#fff'}
                        bgc={location.pathname === '/series' ? '#fff' : '#000'}
                        onClick={() => link('/series')}>Series</StyledButton> */}
                    <StyledButton
                        wid={windowSize.innerWidth > 1000 ? '120px' : '70px'} hig='50px'
                        hover={location.pathname === '/collection' ? props.theme[1] : '#ff0000'}
                        color={location.pathname === '/collection' ? props.theme[0] : props.theme[1]}
                        bgc={location.pathname === '/collection' ? props.theme[1] : props.theme[0]}
                        fz={windowSize.innerWidth > 1000 ? '24px' : '16px'}
                        onClick={() => link('/collection')}>Collection</StyledButton>
                </Flex>
                {windowSize.innerWidth > 1000 && <AuthMenu theme={props.theme} setTheme={props.setTheme} />}
                {/* <Flex gap='10px'>
                    {auth ?
                        <StyledBox>
                            <Flex cursor='pointer'>
                                <StyledButton hover='red' bgc={props.theme[0]}>
                                    <StyledTitle fz='30px' onClick={switchMenu} color={props.theme[1]}>{loginInfo.name}</StyledTitle>
                                </StyledButton>
                            </Flex>
                            <StyledUserMenu disp={menu ? 'block' : 'none'}>
                                <Flex align='center' jstf='space-around'>
                                    <StyledButton hover='red' onClick={leaveAcc} bgc={props.theme[0]} color={props.theme[1]}>Leave Account</StyledButton>
                                </Flex>
                            </StyledUserMenu>
                        </StyledBox> :
                        <StyledButton
                            wid='200px' hig='50px'
                            // hover={location.pathname === '/+' ? '#fff' : '#ff0000'}
                            color={props.theme[1]}
                            bgc={props.theme[0]}
                            onClick={() => link('/auth')}>LogIn/Registration
                        </StyledButton>
                    }
                    <StyledButton
                        wid='30px' hig='30px'
                        hover={'#ff0000'}
                        color={location.pathname === '/main' ? props.theme[0] : props.theme[1]}
                        bgc={location.pathname === '/main' ? props.theme[1] : props.theme[0]}
                        onClick={setTheme}>☀</StyledButton>
                </Flex> */}
            </Flex>
        </Header>)
}
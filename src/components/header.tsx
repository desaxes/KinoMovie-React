import React, { Dispatch, FC, SetStateAction } from 'react'
import { Flex, StyledImg, StyledTitle, StyledButton, Header } from "../styledcomponents/styled-components.ts"
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
                    <Flex cursor='pointer' onClick={() => link('/KinoMovie-React/main')} gap={windowSize.innerWidth > 1000 ? '20px' : '10px'} align='center'>
                        <StyledImg wid='85px' src={logo}></StyledImg>
                        <StyledTitle fz='24px'>KinoMovie</StyledTitle>
                    </Flex>
                    {windowSize.innerWidth <= 1000 && <AuthMenu theme={props.theme} setTheme={props.setTheme} />}
                </Flex>
                <Flex mb='15px' jstf='center' gap={windowSize.innerWidth > 1000 ? '20px' : '10px'} align={'center'} mr={windowSize.innerWidth > 1000 ? '7%' : '0'}>
                    <StyledButton
                        wid={windowSize.innerWidth > 1000 ? '120px' : '70px'} hig='50px'
                        hover={location.pathname === '/KinoMovie-React/main' ? props.theme[1] : '#ff0000'}
                        color={location.pathname === '/KinoMovie-React/main' ? props.theme[0] : props.theme[1]}
                        bgc={location.pathname === '/KinoMovie-React/main' ? props.theme[1] : props.theme[0]}
                        fz={windowSize.innerWidth > 1000 ? '24px' : '16px'}
                        onClick={() => link('/KinoMovie-React/main')}>Main</StyledButton>
                    <StyledButton
                        wid={windowSize.innerWidth > 1000 ? '120px' : '70px'} hig='50px'
                        hover={location.pathname === '/KinoMovie-React/search' ? props.theme[1] : '#ff0000'}
                        color={location.pathname === '/KinoMovie-React/search' ? props.theme[0] : props.theme[1]}
                        bgc={location.pathname === '/KinoMovie-React/search' ? props.theme[1] : props.theme[0]}
                        fz={windowSize.innerWidth > 1000 ? '24px' : '16px'}
                        onClick={() => link('/KinoMovie-React/search')}>Search</StyledButton>
                    <StyledButton
                        wid={windowSize.innerWidth > 1000 ? '120px' : '70px'} hig='50px'
                        hover={location.pathname === '/KinoMovie-React/collection' ? props.theme[1] : '#ff0000'}
                        color={location.pathname === '/KinoMovie-React/collection' ? props.theme[0] : props.theme[1]}
                        bgc={location.pathname === '/KinoMovie-React/collection' ? props.theme[1] : props.theme[0]}
                        fz={windowSize.innerWidth > 1000 ? '24px' : '16px'}
                        onClick={() => link('/KinoMovie-React/collection')}>Collection</StyledButton>
                </Flex>
                {windowSize.innerWidth > 1000 && <AuthMenu theme={props.theme} setTheme={props.setTheme} />}
            </Flex>
        </Header>)
}
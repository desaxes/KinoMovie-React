import React, { useState } from 'react'
import { Flex, StyledImg, StyledTitle, StyledButton, Header, StyledUserMenu, StyledBox } from "../styledcomponents/styled-components.ts"
// @ts-ignore
import logo from '../img/logo.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux.ts'
import { movieSlice } from '../store/reducers/main-reducer.ts'
export const HeaderComponent = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const link = (url) => {
        navigate(url)
    }
    const dispatch = useAppDispatch()
    const auth = useAppSelector(state => state.gameReducer.auth)
    const loginInfo = useAppSelector(state => state.gameReducer.loginInfo)
    const [menu, setMenu] = useState<boolean>(false)
    const leaveAcc = () => {
        dispatch(movieSlice.actions.logOut())
        setMenu(false)
        link('/main')
    }
    const switchMenu = () => {
        setMenu(!menu)
        console.log(menu)
    }
    return (
        <Header hig='50px'>
            <Flex hig='100%' jstf='space-around' gap='20px' align='center'>
                <Flex cursor='pointer' onClick={() => link('/main')} gap='20px' align='center'>
                    <StyledImg wid='85px' src={logo}></StyledImg>
                    <StyledTitle fz='24px'>KinoMovie</StyledTitle>
                </Flex>
                <Flex jstf='center' gap='20px' align='center' mr='7%'>
                    <StyledButton
                        wid='120px' hig='50px'
                        hover={location.pathname === '/main' ? '#fff' : '#ff0000'}
                        color={location.pathname === '/main' ? '#000' : '#fff'}
                        bgc={location.pathname === '/main' ? '#fff' : '#000'}
                        onClick={() => link('/main')}>Main</StyledButton>
                    <StyledButton
                        wid='120px' hig='50px'
                        hover={location.pathname === '/search' ? '#fff' : '#ff0000'}
                        color={location.pathname === '/search' ? '#000' : '#fff'}
                        bgc={location.pathname === '/search' ? '#fff' : '#000'}
                        onClick={() => link('/search')}>Search</StyledButton>
                    <StyledButton
                        wid='120px' hig='50px'
                        hover={location.pathname === '/movies' ? '#fff' : '#ff0000'}
                        color={location.pathname === '/movies' ? '#000' : '#fff'}
                        bgc={location.pathname === '/movies' ? '#fff' : '#000'}
                        onClick={() => link('/movies')}>Movies</StyledButton>
                    <StyledButton
                        wid='120px' hig='50px'
                        hover={location.pathname === '/series' ? '#fff' : '#ff0000'}
                        color={location.pathname === '/series' ? '#000' : '#fff'}
                        bgc={location.pathname === '/series' ? '#fff' : '#000'}
                        onClick={() => link('/series')}>Series</StyledButton>
                    <StyledButton
                        wid='120px' hig='50px'
                        hover={location.pathname === '/collection' ? '#fff' : '#ff0000'}
                        color={location.pathname === '/collection' ? '#000' : '#fff'}
                        bgc={location.pathname === '/collection' ? '#fff' : '#000'}
                        onClick={() => link('/collection')}>Collection</StyledButton>
                </Flex>
                {auth ?
                    <StyledBox>
                        <Flex cursor='pointer'><StyledTitle onClick={switchMenu} color='white'>{loginInfo.name}</StyledTitle></Flex>
                        <StyledUserMenu disp={menu ? 'block' : 'none'}>
                            <Flex gap='30px' align='center' jstf='space-around'>
                                <StyledButton bgc='#000000' color='white'>Settings</StyledButton>
                                <StyledButton onClick={leaveAcc} bgc='#000000' color='white'>Leave</StyledButton>
                            </Flex>
                        </StyledUserMenu>
                    </StyledBox> :
                    <StyledButton
                        wid='200px' hig='50px'
                        // hover={location.pathname === '/+' ? '#fff' : '#ff0000'}
                        color='#fff'
                        bgc='#000'
                        onClick={() => link('/auth')}>LogIn/Registration
                    </StyledButton>}
            </Flex>
        </Header>)
}
import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { Flex, StyledBox, StyledButton, StyledTitle, StyledUserMenu } from "../styledcomponents/styled-components.ts"
import { useAppDispatch, useAppSelector } from '../hooks/redux.ts'
import { useLocation, useNavigate } from 'react-router-dom'
import { movieSlice } from '../store/reducers/main-reducer.ts'
import { useWindowSize } from '../hooks/windowSize.ts'

export const AuthMenu: FC<{ theme: string[], setTheme: Dispatch<SetStateAction<string[]>> }> = (props) => {

    const windowSize = useWindowSize()

    const auth = useAppSelector(state => state.gameReducer.auth)
    const location = useLocation()
    const navigate = useNavigate()
    const link = (url) => {
        navigate(url)
    }
    const dispatch = useAppDispatch()
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
    const setTheme = () => {
        if (props.theme[0] === 'black') {
            props.setTheme(['white', 'black'])
            return
        }
        props.setTheme(['black', 'white'])
    }
    return (
        <Flex gap='10px' align='center'>
            {auth ?
                <StyledBox>
                    <Flex cursor='pointer'>
                        <StyledButton hover='red' bgc={props.theme[0]}>
                            <StyledTitle fz='24px' onClick={switchMenu} color={props.theme[1]}>{windowSize.innerWidth > 500 ? loginInfo.name : '😈'}</StyledTitle>
                        </StyledButton>
                    </Flex>
                    <StyledUserMenu disp={menu ? 'block' : 'none'}>
                        <Flex align='center' jstf='space-around'>
                            <StyledButton fz='20px' hover='red' onClick={leaveAcc} bgc={props.theme[0]} color={props.theme[1]}>Leave Account</StyledButton>
                        </Flex>
                    </StyledUserMenu>
                </StyledBox> :
                <StyledButton
                    wid={windowSize.innerWidth > 500 ? '200px' : '90px'} hig='50px'
                    fz='20px'
                    color={props.theme[1]}
                    bgc={props.theme[0]}
                    onClick={() => link('/auth')}>{windowSize.innerWidth > 500 ? 'LogIn/Registration' : 'LogIn ☹'}
                </StyledButton>
            }
            <StyledButton
                wid='30px' hig='30px'
                hover={'#ff0000'}
                color={location.pathname === '/main' ? props.theme[0] : props.theme[1]}
                bgc={location.pathname === '/main' ? props.theme[1] : props.theme[0]}
                onClick={setTheme}>☀</StyledButton>
        </Flex>
    )
}
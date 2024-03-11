import React, { FC, useState } from 'react'
import { Flex, StyledBox, StyledButton, StyledInput, StyledTitle } from "../styledcomponents/styled-components.ts"
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux.ts';
import { logIn } from '../store/reducers/ActionCreators.ts';
import { useWindowSize } from '../hooks/windowSize.ts';

type FormValues = {
    login: string
    password: string
}

export const AuthPage: FC<{ theme: string[] }> = (props) => {

    const windowSize = useWindowSize()

    const navigate = useNavigate()
    const link = (url: string) => {
        navigate(url)
    }
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ mode: 'onBlur' });
    const dispatch = useAppDispatch()
    const auth = useAppSelector(state => state.gameReducer.auth)
    const [error, setError] = useState<boolean>(false)
    const onSubmit = async (e) => {
        setError(false)
        const response = await dispatch(logIn({ login: e.login, password: e.password }))
        if (response.meta.requestStatus === 'rejected') {
            setError(true)
        }
        else{
            link('/main')
        }
    }
    return (
        <>
            {!auth && <StyledBox wid='100%' mar='150px 0'>
                <form onSubmit={handleSubmit(onSubmit)} action="">
                    <Flex ml='auto' mr='auto' wid={windowSize.innerWidth > 1000 ? '40%' : '100%'} align='center' jstf='center' dir='column' gap='60px'>
                        <StyledInput color={props.theme[1]} autoComplete='off' required minLength={5} {...register('login')} maxLength={12} defaultValue={''} placeholder='Login' type="text" textalign='center' />
                        <StyledInput color={props.theme[1]} autoComplete='off' required minLength={5} {...register('password')} maxLength={12} defaultValue={''} placeholder='Password' type="password" textalign='center' />
                        {error && <StyledTitle fz='20px' color='red' dec='underline'>Wrong Login or Password</StyledTitle>}
                        <Flex gap='20px' dir='column'>
                            <StyledButton type='submit' bgc="#ffffff" wid="160px" hig="40px" hover={'#ff0000'}>LogIn</StyledButton>
                        </Flex>
                    </Flex>
                </form>
                <StyledBox mar='30px'><StyledButton onClick={() => link('/registration')} bgc="#ffffff" wid="160px" hig="30px" hover={'#ff0000'}>Registration</StyledButton></StyledBox>
            </StyledBox>}
        </>
    )
}
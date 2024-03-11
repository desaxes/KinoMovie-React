import React, { FC, useState } from 'react'
import { Flex, StyledBox, StyledButton, StyledInput, StyledTitle } from "../styledcomponents/styled-components.ts"
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/redux.ts';
import { registAccount } from '../store/reducers/ActionCreators.ts';
import { useWindowSize } from '../hooks/windowSize.ts';

type FormValues = {
    login: string
    password: string
    username: string
}

export const RegPage:FC<{ theme: string[] }> = (props) => {
    
    const windowSize = useWindowSize()

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ mode: 'onBlur' });
    const dispatch = useAppDispatch()
    const [error, setError] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    const onSubmit = async (e) => {
        setError(false)
        setSuccess(false)
        const response = await dispatch(registAccount({ login: e.login, password: e.password, name: e.username }))
        const status = response.meta.requestStatus
        if (status === 'rejected') {
            setSuccess(false)
            setError(true)
        }
        else if (status === 'fulfilled') {
            setError(false)
            setSuccess(true)
        }
    }
    const navigate = useNavigate()
    const link = (url: string) => {
        navigate(url)
    }
    return (
        <>
            <StyledBox wid='100%' mar='150px 0'>
                <form onSubmit={handleSubmit(onSubmit)} action="">
                    <Flex ml='auto' mr='auto' wid={windowSize.innerWidth > 1000 ? '40%' : '100%'} align='center' jstf='center' dir='column' gap='60px'>
                        <StyledInput color={props.theme[1]} autoComplete='off' required minLength={5} {...register('login')} maxLength={12} defaultValue={''} placeholder='Login' type="text" textalign='center' />
                        <StyledInput color={props.theme[1]} autoComplete='off' required minLength={5} {...register('password')} maxLength={12} defaultValue={''} placeholder='Password' type="password" textalign='center' />
                        <StyledInput color={props.theme[1]} autoComplete='off' required minLength={5} {...register('username')} maxLength={12} defaultValue={''} placeholder='User Name' type="text" textalign='center' />
                        {error && <StyledTitle fz='20px' color='red' dec='underline'>User with this login or name already exist</StyledTitle>}
                        {success && <StyledTitle fz='20px' color='green' dec='underline'>Account created!</StyledTitle>}
                        <Flex gap='20px' dir='column'>
                            <StyledButton type='submit' bgc="#ffffff" wid="160px" hig="40px" hover={'#ff0000'}>Registration</StyledButton>
                        </Flex>
                    </Flex>
                </form>
            </StyledBox>
        </>
    )
}
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux.ts'
import { Flex, Grid, StyledBox, StyledButton, StyledTitle } from '../styledcomponents/styled-components.ts'
import { useNavigate } from 'react-router-dom'
import { Movie } from './movie.tsx'
import { getMoviesToCollection } from '../store/reducers/ActionCreators.ts'
export const Collection = () => {
    const auth = useAppSelector(state => state.gameReducer.auth)
    const loginInfo = useAppSelector(state => state.gameReducer.loginInfo)
    const movies = useAppSelector(state => state.gameReducer.movies)
    const moviesComp = movies.map(
        e => <Movie key={e.movieid} id={e.movieid} title={e.title} poster={e.poster} year={e.year} />)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const link = (url: string) => {
        navigate(url)
    }
    useEffect(() => {
        const response = dispatch(getMoviesToCollection({ id: loginInfo.user_id }))
    }, [])
    return (
        <>
            {auth ?
                <div>
                    <Flex mt='50px'>
                        <Grid wid='100%' row={'repeat(2)'} col={'repeat(5,20%)'} rgap='20px' cgap='20px' mar='0 50px'>
                            {moviesComp}
                        </Grid>
                    </Flex>
                </div>
                : <StyledBox mar='200px 0'>
                    <Flex dir='column' align='center' gap='30px'>
                        <StyledTitle>Create Account or LogIn</StyledTitle>
                        <StyledButton onClick={() => link('/KinoMovie-React/auth')} bgc="#ffffff" hover={'#ff0000'} wid='160px' hig='40px'>Authorization</StyledButton>
                    </Flex>
                </StyledBox>}
        </>
    )
}
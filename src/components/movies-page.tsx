import { FC, useEffect } from "react"
import React from 'react'
import { Title } from "./title.tsx"
import { Flex, Grid, StyledBox } from "../styledcomponents/styled-components.ts"
import { useAppSelector } from "../hooks/redux.ts"
import { Movie } from "./movie.tsx"
import ReactPlayer from "react-player"
import myVideo from '../../src/bb.mp4'

export const MoviesPage: FC<{ theme: string[] }> = (props) => {
    const newMovies = useAppSelector(state => state.mainPageReducer.newMovies).map(
        e => <Movie key={e.imdbID} id={e.imdbID} title={e.Title} year={e.Year} type={e.Type} poster={e.Poster} />)
    const popularMovies = useAppSelector(state => state.mainPageReducer.popularMovies).map(
        e => <Movie key={e.imdbID} id={e.imdbID} title={e.Title} year={e.Year} type={e.Type} poster={e.Poster} />)
    const newSeries = useAppSelector(state => state.mainPageReducer.newSeries).map(
        e => <Movie key={e.imdbID} id={e.imdbID} title={e.Title} year={e.Year} type={e.Type} poster={e.Poster} />)
    const popularSeries = useAppSelector(state => state.mainPageReducer.popularSeries).map(
        e => <Movie key={e.imdbID} id={e.imdbID} title={e.Title} year={e.Year} type={e.Type} poster={e.Poster} />)
    useEffect(() => {
        window.scrollTo(0, 0)
    })
    return (
        <>
            <StyledBox wid='100%' mar='50px 0 20px 0'>
                <StyledBox mar="0 0 20px 0" wid='100%' hig="800px">
                    <ReactPlayer loop width='100%' height='100%' playing muted={true} url={myVideo} />
                </StyledBox>
                <Flex dir="column" align="start">
                    <StyledBox>
                        <Title fz='44px' color={props.theme[1]}>New Movies</Title>
                        <Flex wid='100%' jstf='center'>
                            <Grid wid='100%' row={'repeat(1)'} col={'repeat(5,20%)'} rgap='20px' cgap='20px' mar='20px 50px'>
                                {newMovies}
                            </Grid>
                        </Flex>
                    </StyledBox>
                    <StyledBox>
                        <Title fz='44px' color={props.theme[1]}>Popular Movies</Title>
                        <Flex wid='100%' jstf='center'>
                            <Grid wid='100%' row={'repeat(2)'} col={'repeat(5,20%)'} rgap='20px' cgap='20px' mar='20px 50px'>
                                {popularMovies}
                            </Grid>
                        </Flex>
                    </StyledBox>
                    <StyledBox>
                        <Title fz='44px' color={props.theme[1]}>New Series</Title>
                        <Flex wid='100%' jstf='center'>
                            <Grid wid='100%' row={'repeat(2)'} col={'repeat(5,20%)'} rgap='20px' cgap='20px' mar='20px 50px'>
                                {newSeries}
                            </Grid>
                        </Flex>
                    </StyledBox>
                    <StyledBox>
                        <Title fz='44px' color={props.theme[1]}>Popular Series</Title>
                        <Flex wid='100%' jstf='center'>
                            <Grid wid='100%' row={'repeat(2)'} col={'repeat(5,20%)'} rgap='20px' cgap='20px' mar='20px 50px'>
                                {popularSeries}
                            </Grid>
                        </Flex>
                    </StyledBox>
                </Flex>
            </StyledBox>
        </>
    )
}
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from "../hooks/redux.ts";
import { searchMoreMovies, searchMovies } from "../store/reducers/ActionCreators.ts";
import { Movie } from './movie.tsx';
import { Flex, Grid, StyledBox, StyledButton, StyledInput } from '../styledcomponents/styled-components.ts';
import { Title } from './title.tsx';
import { useDebouncedState } from '@mantine/hooks';
import { movieSlice } from '../store/reducers/main-reducer.ts';

export const SearchPage = () => {
    const dispatch = useAppDispatch()
    const [searchValue, setSearchValue] = useDebouncedState<string>('', 1000)
    const movies = useAppSelector(state => state.gameReducer.searchMovies.Search)?.map(
        e => <Movie key={e.imdbID} id={e.imdbID} title={e.Title} year={e.Year} type={e.Type} poster={e.Poster} />)
    const searchType = useAppSelector(state => state.gameReducer.searchType)
    const pageCount = useAppSelector(state => Math.ceil(parseInt(state.gameReducer.searchMovies.totalResults) / 10))
    let [pages, setPages] = useState(0)
    const setSearchType = (type: string) => {
        dispatch(movieSlice.actions.changeSearchType(type))
    }
    useEffect(() => {
        if (searchValue != '') {
            dispatch(searchMovies({ title: searchValue, type: searchType, page: 1 }))
            setPages(2)
        }
    }, [searchValue, searchType])
    const showMore = () => {
        dispatch(searchMoreMovies({ title: searchValue, type: searchType, page: pages }))
        setPages(pages + 1)
    }
    return (
        <StyledBox wid='100%'>
            <StyledBox wid='100%' mar='40px 0 20px 0'>
                <Flex wid='100%' jstf='space-between'>
                    <Title fz='44px' color={'White'}>Search Movies / Series</Title>
                    <Flex gap='20px' align='center'>
                        <StyledButton
                            wid='120px' hig='30px'
                            hover={searchType === 'movie' ? '#fff' : '#ff0000'}
                            color={searchType === 'movie' ? '#000' : '#fff'}
                            bgc={searchType === 'movie' ? '#fff' : '#000'}
                            onClick={() => setSearchType('movie')}
                        >Movies</StyledButton>
                        <StyledButton
                            wid='120px' hig='30px'
                            hover={searchType === 'series' ? '#fff' : '#ff0000'}
                            color={searchType === 'series' ? '#000' : '#fff'}
                            bgc={searchType === 'series' ? '#fff' : '#000'}
                            onClick={() => setSearchType('series')}
                        >Series</StyledButton>
                    </Flex>
                </Flex>
            </StyledBox>
            <StyledBox mar='30px 0'>
                <Flex wid='100%' align='flex-end' jstf='center'>
                    <StyledInput defaultValue={searchValue} onChange={(e) => setSearchValue(e.currentTarget.value)} autoComplete='off' placeholder='Search' type="text" />
                </Flex>
            </StyledBox>
            {searchValue != '' && <Flex wid='100%' jstf='center'>
                <Grid wid='100%' row={'repeat(2)'} col={'repeat(5,20%)'} rgap='20px' cgap='20px' mar='0 50px'>
                    {movies}
                </Grid>
            </Flex>}
            <Flex mt='40px' jstf='center' align='center' wid='100%'>
                <StyledButton
                    hover={'#ff0000'}
                    disabled={pages > pageCount} onClick={() => showMore()}
                    wid='150px' hig='30px'>Show More</StyledButton>
            </Flex>
        </StyledBox>)
}
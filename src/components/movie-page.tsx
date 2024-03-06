import React, { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from '../hooks/redux.ts';
import { addMovieToCollection, checkCollection, fetchMovieById, removeFromCollection } from '../store/reducers/ActionCreators.ts';
import { useParams } from "react-router-dom";
import { Flex, StyledBox, StyledButton, StyledImg, StyledImgOverlay, StyledPlayer, StyledTitle } from '../styledcomponents/styled-components.ts';
import ReactPlayer from "react-player";
export const MoviePage: FC = () => {

    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }
    const [windowSize, setWindowSize] = useState(getWindowSize());
    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const params = useParams()
    const dispatch = useAppDispatch()
    const movie = useAppSelector(state => state.gameReducer.currentMovie)
    const auth = useAppSelector(state => state.gameReducer.auth)
    const userId = useAppSelector(state => state.gameReducer.loginInfo.user_id)
    const [inCollection, setInCollection] = useState<boolean>(false)
    console.log(movie)
    const addToCol = async () => {
        if (auth) {
            await dispatch(addMovieToCollection({
                movieId: params.id as string,
                userId: userId as number,
                title: movie.Title as string,
                poster: movie.Poster as string,
                type: movie.Type as string,
                userrait: 0,
                genre: movie.Genre as string,
                year: movie.Year as string
            }))
            setInCollection(true)
        }
    }
    const removeFromCol = () => {
        dispatch(removeFromCollection({ id: params.id as string, userid: userId as number }))
        setInCollection(false)
    }
    const checkCol = async () => {
        const check = await dispatch(checkCollection({ id: params.id as string, userid: userId as number }))
        if (check.meta.requestStatus === 'rejected') {
            setInCollection(false)
        }
        else {
            setInCollection(true)
        }
    }
    const [playerState, setPlayerState] = useState<string>('none')
    const showHidePlayer = (state: string) => {
        setPlayerState(state)
    }
    useEffect(() => {
        dispatch(fetchMovieById(params.id))
    })
    useEffect(() => {
        checkCol()
        console.log(inCollection)
    }, [inCollection])
    return (
        <div>
            <StyledImgOverlay opacity={playerState === 'none' ? '100%' : '10%'} pevents={playerState === 'none' ? 'auto' : 'none'}>
                <Flex dir='column'>
                    <Flex mt="30px" align="center" jstf="space-between" dir={windowSize.innerWidth > 900 ? "row" : "column"} gap="10px">
                        <Flex dir="column" align="center" wid="350px" gap="30px">
                            <StyledTitle fz='50px'>
                                {movie.Title}
                            </StyledTitle>
                            <Flex wid="100%" jstf="space-between">
                                <StyledTitle fz="26px" opacity="60%">
                                    {movie.Year}
                                </StyledTitle>
                                <StyledTitle fz="26px" opacity="60%">
                                    {movie.Runtime}
                                </StyledTitle>
                                <StyledTitle fz="26px" opacity="60%">
                                    {movie.Rated}
                                </StyledTitle>
                            </Flex>
                            <Flex wid="100%" jstf="center">
                                <StyledTitle fz="26px" opacity="60%">
                                    {movie.Genre}
                                </StyledTitle>
                            </Flex>
                            <Flex wid="100%" jstf="space-between" gap="20px">
                                <StyledButton bgc="#ffff52" wid="160px" hig="40px" hover={'#ff0000'}>Watch</StyledButton>
                                <StyledButton onClick={() => {
                                    if (playerState === 'none') {
                                        showHidePlayer('block')
                                    }
                                    else {
                                        showHidePlayer('none')
                                    }
                                }} wid="160px" hig="40px" hover={'#ff0000'}>Trailer</StyledButton>
                            </Flex>
                        </Flex>
                        <Flex dir="column">
                            <StyledBox>
                                <StyledImg src={movie.Poster} alt="" bdr='15%' />
                            </StyledBox>
                            <Flex mt="30px" jstf="center" gap="30px">
                                <StyledBox>
                                    {!inCollection ? <Flex pad="15px 0" cursor="pointer" hover="#ff0000" align="center" gap="10px">
                                        <StyledTitle onClick={addToCol} fz='26px' opacity="60%">Add to collection</StyledTitle>
                                    </Flex>
                                        :
                                        <Flex pad="15px 0" cursor="pointer" hover="#ff0000" align="center" gap="10px">
                                            <StyledTitle onClick={removeFromCol} fz='26px' color="#ff0000" opacity="60%">Remove from Collection</StyledTitle>
                                        </Flex>}
                                </StyledBox>
                                {/* <StyledBox>
                                    <Flex pad="15px 0" cursor="pointer" hover="#ff0000" align="center" gap="10px">
                                        <StyledTitle fz='26px' opacity="60%">Watch Later</StyledTitle>
                                    </Flex>
                                </StyledBox> */}
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex align="flex-start" gap="30px" dir="column" mt="30px">
                        <StyledTitle dec="underline" fz="40px">Plot</StyledTitle>
                        <StyledTitle fz="20px" align="start">
                            {movie.Plot}
                        </StyledTitle>
                    </Flex>
                    <Flex align="flex-end" gap="30px" dir="column" mt="30px">
                        <StyledTitle dec="underline" fz="40px">Info</StyledTitle>
                        <StyledTitle fz="20px" align="start">
                            <Flex jstf="space-between" gap="30px">
                                <p>Country:</p>
                                {movie.Country}
                            </Flex>
                            <Flex jstf="space-between" gap="30px">
                                <p>Release Date:</p>
                                {movie.Released}
                            </Flex>
                            <Flex jstf="space-between" gap="30px">
                                <p>Language:</p>
                                {movie.Language}
                            </Flex>
                            <Flex jstf="space-between" gap="30px">
                                <p>Director:</p>
                                {movie.Director}
                            </Flex>
                            <Flex jstf="space-between" gap="30px">
                                <p>Writer:</p>
                                {movie.Writer}
                            </Flex>
                            {movie.Type === 'series' && <Flex jstf="space-between" gap="30px">
                                <p>Total Seasons:</p>
                                {movie.totalSeasons}
                            </Flex>}
                            {movie.BoxOffice && <Flex jstf="space-between" gap="30px">
                                <p>Box Office:</p>
                                {movie.BoxOffice}
                            </Flex>}
                        </StyledTitle>
                    </Flex>
                    <Flex align="flex-start" gap="30px" dir="column" mt="30px">
                        <StyledTitle fz="40px" dec="underline">Raiting</StyledTitle>
                        <Flex>
                            <Flex align="center" gap="60px">
                                <StyledTitle>IMDb</StyledTitle>
                                <StyledTitle color={
                                    parseFloat(movie.imdbRating as string) > 6 ? "#2bff00" : '#ff0000'
                                } fz="50px">{movie.imdbRating}</StyledTitle>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex align="flex-end" gap="30px" dir="column" mt="30px">
                        <StyledTitle dec="underline" fz="40px">Actors</StyledTitle>
                        <StyledTitle fz="20px" align="start">
                            <Flex fz="26px" align="flex-end" dir="column" jstf="space-between" gap="20px">
                                {movie.Actors}
                            </Flex>
                        </StyledTitle>
                    </Flex>
                </Flex>
            </StyledImgOverlay>
            <StyledPlayer disp={playerState}>
                <Flex dir="column" wid="100%" hig="100%">
                    <Flex jstf="end" wid="100%">
                        <StyledButton onClick={() => {
                            showHidePlayer('none')
                        }} wid="5%" hig="30px" hover={'#ff0000'}>X</StyledButton>
                    </Flex>
                    <ReactPlayer controls={true} width='100%' height='100%' url='https://www.youtube.com/watch?v=JCd9Z6cc_6Y' />
                </Flex>
            </StyledPlayer>
        </div>
    )
}
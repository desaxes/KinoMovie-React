import React from 'react'
import { useNavigate } from "react-router-dom"
import { Flex, StyledBox, StyledImg } from "../styledcomponents/styled-components.ts"
import { Title } from './title.tsx'
// @ts-ignore
import image from '../img/no-image.jpg'

export const Movie = (props: any) => {
    const navigate = useNavigate()
    return (
        <Flex hover='#ff0000' cursor='pointer' onClick={() => navigate('/moviepage/' + props.id)} dir='column' align='center' gap='10px'>
            <StyledBox wid='100%' hig='500px' mar='0 0 auto 0'>
                <StyledImg
                    wid='100%' hig='100%' src={props.poster != 'N/A' ? props.poster : image} alt="" bdr='15%' />
            </StyledBox>
            <Title hover='#ff0000' align='start' fz='24px' wid='100%'>
                {props.title}
            </Title>
            <Title align='start' fz='20px' wid='100%' opacity='0.5'>
                {props.year}
            </Title>
        </Flex>
    )
}
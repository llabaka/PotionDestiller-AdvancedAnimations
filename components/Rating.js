import React from "react";
import styled from "styled-components";
import Icon from 'react-native-vector-icons/FontAwesome';

const Container = styled.View`
    flex-direction: row;
    margin-vertical: 4px;
    align-items: center;
    justify-content: center;
`
export default function Rating({rating}){
    const totalOfFullStars = Math.floor(rating / 2)
    const starOutLineArray = Array(5 - totalOfFullStars).fill('star-outline')
    const fullStarArray = Array(totalOfFullStars).fill('star')
    const ratingStars = [...fullStarArray, ...starOutLineArray]

    return(
        <Container>
            {ratingStars.map((icon, index) => {
                return <Icon key={index} name={icon} size={16} color="gray"/>
            })}
        </Container>
    )
}
"use client";
import Center from "./Center";
import styled from "styled-components";
import Link from 'next/link';
const Bg = styled.div`
  // background-color: #222;
  background-color: #EBE4D4;
  color: white;
  padding: 0 0;
`;
const StyledImage = styled.img`
  max-width: 100%;
`;

const FeaturedLink = styled(Link)`
  
`;

const CategoryButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2,1fr);
  max-width: 70%;
  gap: 1em;
  margin:0 auto;
  margin-top: 1.5em;
  
 
  @media (min-width: 600px) {
    grid-template-columns: repeat(3,1fr);
    max-width: 60%;
    margin-top: 1.8em;
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(6,1fr);
    max-width: 80%;
    margin-top: 2.8em;

  }

`;

const CategoryButton = styled(Link)`
  background-color: #003942;
  color:#EBE4D4;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.1rem;
  border-radius: 0.3rem;
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1em 0;
  height: 1.8rem; 
  margin-bottom: 1.2em;

  @media (min-width: 768px) {
    font-size: 1.2rem;
    padding: 1.2em 1.2em;
    height: 2.2rem; 
    border-radius: 0.5rem;
  }
  @media (min-width: 1124px) {
    padding: 1.8em 0;
    font-size: 1.8rem;
    border-radius: 0.8rem;
    max-height: 1rem;
    
  }

`;

export default function Featured() {  
  return (
    <Bg>
      <Center>
        <FeaturedLink href={'/featured'}>
          <StyledImage src="/Julysale.jpeg" alt="logo" />
        </FeaturedLink>

        <CategoryButtonContainer>
          <CategoryButton href={'/nutrition/protein'}> Protein</CategoryButton>
          <CategoryButton href={'/nutrition/power&strength'}> Strength</CategoryButton>
          <CategoryButton href={'/nutrition/musclebuilding'}> Muscle </CategoryButton>
          <CategoryButton href={'/nutrition/weightmanagement'}> Weight </CategoryButton>
          <CategoryButton href={'/nutrition/vitamins'}> Vitamins</CategoryButton>
          <CategoryButton href={'/nutrition/health&wellness'}>Health</CategoryButton>
        </CategoryButtonContainer>
      </Center>
    </Bg>
  )
}
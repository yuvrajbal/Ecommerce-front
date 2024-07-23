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
  // margin: 0 auto;
  min-height: 300px;
  object-fit:cover;
  object-position: center;
//   @media (max-width: 768px) {
//   object-position: center;
// }
//   @media (max-width: 468px) {
//   object-position: center;
// }

`;

const FeaturedLink = styled(Link)`
`;

const CategoryButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2,1fr);
  max-width: 80%;
  gap: 1em;
  margin:0 auto;
  margin-top: 1.5em;
  
 
  @media (min-width: 600px) {
    grid-template-columns: repeat(3,1fr);
    // max-width: 60%;
    margin-top: 1.8em;
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(6,1fr);
    max-width: 75%;
    margin-top: 2.8em;

  }

`;

const 
CategoryButton = styled(Link)`
  background-color: #003942;
  color:#EBE4D4;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.1rem;
  border-radius: 0.3rem;
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2em 1em;
  margin-bottom: 1.2em;

  @media (min-width: 768px) {
    font-size: 1.2rem;
    border-radius: 0.5rem;
  }
  @media (min-width: 1124px) {

    border-radius: 0.8rem;
    
    
  }

`;

const FeaturedContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default function CategoryLinks() {  
  return (
    <Bg>
        <FeaturedContainer>
        <FeaturedLink href={'/featured'}>
          <StyledImage src="/Julysale.jpeg" alt="logo" />
        </FeaturedLink>
        </FeaturedContainer>
        <Center>
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
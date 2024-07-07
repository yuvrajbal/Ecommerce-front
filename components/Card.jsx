import styled from "styled-components";
import Link from "next/link";

const StyledLink = styled(Link)`
  // font-size: 2rem;
  color: white;
  text-decoration: none;
  margin: 0 0;
  cursor: pointer;
  max-width: fit-content;
  transition: background-color 0.3s ease;
  display: flex;

  &:hover: {
    background-color: pink;
  }
  svg {
  width: 1.3rem;
  height: 1.3rem;
  margin-right: 0.9em;

  }
`;

const CardContainer = styled.div`
 display: flex;
  flex-direction: column;
  gap: 1.2em;
  margin: 1.2em 0;
  `;

export default function Card({links}){
  return(
    <CardContainer>
      {links.map((link,index)=> (
    
        <StyledLink key={index} href={link.href}>
          {link.name}
        </StyledLink>
      ))}
    </CardContainer>
  )
}
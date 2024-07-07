import Center from "./Center";
import Link from 'next/link';
import styled from "styled-components";

const StyledImage = styled.img`
  max-width: 100%;

`;

export default function PickYourProtein() {
  return (
    <Center>
      <Link href={"/products/protein"}>
      <StyledImage src="/PickProtein.webp" alt="Protein" />
      </Link>
   </Center>
  );
}
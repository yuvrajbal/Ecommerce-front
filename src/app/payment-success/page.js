"use client";
import styled from "styled-components";

const Main = styled.main`
  max-width: 6xl;
  margin: 10px auto;
  padding: 10px;
  text-align: center;
  border: 1px solid;
  border-radius: 12px;
  background: linear-gradient(to top right, #4299e1, #9f7aea);
  color: white;
`;

const Container = styled.div`
  margin-bottom: 10px;
`;

const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
`;

const SubTitle = styled.h2`
  font-size: 1.5rem;
`;

const Amount = styled.div`
  background: white;
  padding: 0.5rem;
  border-radius: 0.375rem;
  margin-top: 1.25rem;
  color: #9f7aea;
  font-size: 2.25rem;
  font-weight: bold;
`;

export default function PaymentSuccess({ searchParams: { amount } }) {
  return (
    <Main>
      <Container>
        <Title>Thank you!</Title>
        <SubTitle>You successfully paid</SubTitle>
        <Amount>INR {amount}</Amount>
      </Container>
    </Main>
  );
}

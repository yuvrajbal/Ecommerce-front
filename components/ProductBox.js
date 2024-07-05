import styled from "styled-components";
const WhiteBox = styled.div`
  background-color: white;
  padding: 1em;
  max-height: 20rem;
  text-align: center;
  display: flex;
  justify-content: center;
  border-radius: 0.5rem;
  img {
    max-width: 100%;
    max-height: 20rem;
  }
`;

const DetailContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuickBuyButton = styled.div`
  background-color: #003942;
  color: white;
  text-transform: uppercase;
  max-width: 8rem;
  padding: 0.5em 1em;
  text-align: center;
  margin-top: 1em;
`;

export default function ProductBox({
  _id,
  title,
  description,
  price,
  images,
  properties,
  categories,
}) {
  return (
    <div>
      <WhiteBox>
        <img src={images[0]} alt={title} />
      </WhiteBox>
      <DetailContainer>
        <h2>{title}</h2>
        <div>From INR {price}</div>
        <div>Save upto </div>
        <QuickBuyButton>Quick Buy</QuickBuyButton>
      </DetailContainer>
    </div>
  );
}

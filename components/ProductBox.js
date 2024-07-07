import Link from "next/link";
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

const ProductBoxLink = styled(Link)`
  text-decoration: none;
  color: black;
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
    <ProductBoxLink href={`/product/${_id}`}>
      <WhiteBox>
        <img src={images[0]} alt={title} />
      </WhiteBox>
      <DetailContainer>
        <h3>{title}</h3>
        <div>from INR {price}</div>
        <div>Save upto </div>
      </DetailContainer>
    </ProductBoxLink>
  );
}

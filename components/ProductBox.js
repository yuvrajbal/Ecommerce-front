import Link from "next/link";
import styled from "styled-components";

const ProductBoxLink = styled(Link)`
  text-decoration: none;
  color: black;
  // border: 1px solid #003942;
  // margin-bottom: 1em;
`;
const WhiteBox = styled.div`
  background-color: white;
  position: relative;
  // padding: 1em;
  max-height: 20rem;
  text-align: center;
  display: flex;
  justify-content: center;
  border-radius: 0.5rem;
  // border: 1px solid #003942;

  img {
    // max-width: 100%;
    // max-height: auto;
    width: 100%;
    height: auto;
    margin-top: 2em;
  }
`;

const DetailContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 1rem 0;
`;

const ProductPrice = styled.div`
  font-size: 1.2rem;
  color: #003942;
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    text-decoration: line-through;
    margin-left: 0.5em;
  }

  svg {
    height: 1.2rem;
    width: 1.2rem;
    margin-left: 0.2em;
  }
`;

const Strikethrough = styled.span`
  text-decoration: line-through;
  // margin-left: 0.5em;
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 1rem;
  color: gray;
  padding-left: 1em;
  svg {
    height: 1.2rem;
    width: 1.2rem;
    margin: 0;
  }
`;

const DiscountBox = styled.div`
  // background-color: #003942;
  color: red;
  text-transform: uppercase;
  // max-width: 8rem;
  width: 90%;
  padding: 0.5em 1em;
  text-align: center;
  margin-top: 1em;
  font-size: 1rem;
  border: 1px solid #003942;
`;

const DiscountBadge = styled.div`
  position: absolute;
  top: 0;
  left: 10px;
  color: white;
  background-color: red;
  text-transform: uppercase;
  padding: 0.5em 1em;
`;

export default function ProductBox({
  _id,
  title,
  description,
  price,
  images,
  properties,
  categories,
  discount,
}) {
  const siteWideDiscount = 25;
  const higherDiscount =
    discount > siteWideDiscount ? discount : siteWideDiscount;
  const originalPrice = Math.ceil(
    Number(price) * (100 / (100 - Number(higherDiscount)))
  );

  console.log("originalPrice", originalPrice);
  return (
    <ProductBoxLink href={`/product/${_id}`}>
      <WhiteBox>
        <DiscountBadge> {higherDiscount}% off </DiscountBadge>

        <img src={images[0]} alt={title} />
      </WhiteBox>
      <DetailContainer>
        <ProductTitle>{title}</ProductTitle>
        <ProductPrice>
          From
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          {price}
          <Strikethrough>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            {originalPrice}
          </Strikethrough>
        </ProductPrice>

        <DiscountBox>
          <div>Get {higherDiscount}% off </div>
        </DiscountBox>

        {/* <div>Save upto </div> */}
      </DetailContainer>
    </ProductBoxLink>
  );
}

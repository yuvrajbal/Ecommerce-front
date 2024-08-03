import styled from "styled-components";

const Strikethrough = styled.span`
  text-decoration: line-through;
  // margin-left: 0.5em;
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 0.9rem;
  color: gray;
  padding-left: 1em;
  svg {
    height: 1.2rem;
    width: 1.2rem;
    margin: 0;
  }
`;

export default function OriginalPrice({ discount, price }) {
  const originalPrice = Math.ceil(
    Number(price) * (100 / (100 - Number(discount)))
  );
  return (
    <Strikethrough>
      <span>{originalPrice}</span>
    </Strikethrough>
  );
}

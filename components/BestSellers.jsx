import styled from "styled-components";
import Center from "./Center";
import ProductBox from "./ProductBox";


const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1em;
`;

export default function BestSellers({ products }) {
  console.log(products);
  return (
    <Center>
    <div>
      <h1>Best Sellers</h1>
      <ProductsGrid>

        {products.map((product) => (
          <ProductBox {...product} />
        ))}
      
      </ProductsGrid>
    </div>
    </Center>
  );
}
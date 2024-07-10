import styled from "styled-components";
import { CartContext } from "../../../components/CartContext";
import { useContext } from "react";
const ShoppingCartContainer = styled.div` 

  // border: 1px solid red;
  margin:0;
  @media (min-width: 768px) {
     max-width: 100%;
  `;

const TableHeadingContainer = styled.div`
  display: flex;
  margin-bottom: 0.5em;
  margin-right: 1em;
  margin-left: 1em;
  
  `;

const CartHeading = styled.div`
  font-family: Apparel;
  // padding:0.5em 2em; 
  text-align: left;
  width: 100%;
  `;

const CartHeadingPrice = styled.div`
   font-family: Apparel;
   width: 100%;
   text-align: right;
   margin-right: 1em;
   `;  




const CartItemContainer = styled.div`
  display: flex;
  gap: 4em;  
  border-top: 1px solid #ddd;
  margin-right: 1em;
  align-items: center;
  padding: 1em 0.5em;


`;

const ImageContainer = styled.div`
  display: flex;
  width:30%;
  img {
    width: 100%;
    max-width: 100px;
    height: auto;
  }
`;



const ItemspecContainer = styled.div`
  width:100%;
`;

const ItemSpecs = styled.div`
 display: flex;
  flex-direction: column;
`;

const ItemCount = styled.div`
`;

const ModifyCountButton = styled.button`
  `;

const ItemDelete_PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  width:30%;
  button{
    border: none;
    background-color: white;
    cursor: pointer;
    width: fit-content;
    padding:0;

  svg{
    height: 1.2rem;
    width: 1.2rem;

    }
  }
  `;


const ButtonContainer = styled.div`
  display: flex;
  justify-content: right;
`;
const Price = styled.div`
    margin-top: 1em;
  
    display: flex;
    justify-content: right;
    svg{
      height: 1.2rem;
      width: 1.2rem;
      }
`;

 

export default function CartItem({ products, ids}) {
  const { addProduct, cart, decreaseProductCount, removeProduct } = useContext(CartContext);

  function decreaseCount(productId){
    decreaseProductCount(productId);
    
  }
  function increaseCount(productId){
    addProduct(productId);

  }

  function deleteProduct(productId){
    removeProduct(productId);}

  return (
    <ShoppingCartContainer>
      {/* There are {products?.length} items in the cart. */}
      <TableHeadingContainer>
        <CartHeading>Items</CartHeading>
        <CartHeading>Quantity</CartHeading>
        <CartHeadingPrice>Price</CartHeadingPrice>
      </TableHeadingContainer>

      {products.length> 0 && products?.map((product) => (
        <CartItemContainer key={product._id}>
          
          <ImageContainer>
            <img src={product.images[0]} alt="" />
          </ImageContainer>

          <ItemspecContainer>
            <ItemSpecs>
              <div>{product.title}</div>

            </ItemSpecs>
            <ItemCount>
              <ModifyCountButton onClick={() => decreaseCount(product._id)}> -
              </ModifyCountButton>
              <span> {ids.filter(id => id === product._id).length} </span>
              <ModifyCountButton onClick={() => increaseCount(product._id)}> +
              </ModifyCountButton>
            </ItemCount>
          </ItemspecContainer>

          <ItemDelete_PriceContainer>
            <ButtonContainer>
              <button onClick={() => deleteProduct(product._id)  }>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </button>
            </ButtonContainer>
            <Price>INR 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              {product.price}
            </Price>

          </ItemDelete_PriceContainer>
      
        </CartItemContainer>
      ))}

    </ShoppingCartContainer>
  );
}
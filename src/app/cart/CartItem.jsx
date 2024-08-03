import styled from "styled-components";
import { CartContext } from "./CartContext";
import { useContext, useEffect,useState } from "react";
import axios from "axios";
import {useUser} from "@clerk/nextjs";
const ShoppingCartContainer = styled.div` 


  margin:0;
  @media (min-width: 768px) {
    //  max-width: 100%;
  `;

const TableHeadingContainer = styled.div`
  display: flex;
  margin-bottom: 0.5em;
  margin-right: 1em;
  margin-left: 1em;
  color: gray;
  font-weight: 600;
  
  `;

const CartHeadingItem = styled.div`
  font-family: Apparel;
  text-align: left;
  width: 70%;
  margin-left: 1em;
`;

const CartHeadingQuantity = styled.div`
  font-family: Apparel;
  text-align: left;
  width: 100%;
  padding-left: 1em;
  @media (min-width: 1168px) {
   text-align: right;
   padding-right: 5em;
     padding-left: 0em;
  `;

const CartHeadingPrice = styled.div`
   font-family: Apparel;
   width: 100%;
   text-align: right;
   margin-right: 4em;
    @media (min-width: 1168px) {
      text-align: center;
      width:60%
   `;  



const CartItemContainer = styled.div`
  display: flex;
  gap: 1em;  
  border-top: 1px solid #ddd;
  margin-right: 1em;
  align-items: top;
  padding: 1em 0.5em;



`;

const ImageContainer = styled.div`
  display: flex;
  // border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  width:60%;
  img {
    width: 100%;
    max-width: 100px;
    height: auto;
  }
  @media (min-width: 1168px) {
    width: 30%;
  }
`;



const ItemspecContainer = styled.div`
  width:100%;
  display: flex;
  flex-direction: column;
  justify-content:space-between;
  // height: 100%;
  margin-top: 0.8em;

  @media (min-width: 1168px) {
   flex-direction: row;
}
`;

const ItemSpecs = styled.div`
  display: flex;


`;

const ItemCount = styled.div`
  margin-top: 1em;
  display: flex;
  align-items: start;
  @media (min-width: 1168px) {
    margin-top: 0;
    
  }
`;


  
const ModifyCountButton = styled.button`
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.4rem;
  color:black;
  font-size: 1.5rem;
  
  `;

const CountElement = styled.div`
  margin: 0 1em;
  align-self: center;
  @media (min-width: 1168px) {
  align-self: start;
  margin-top: 0.5em;
`;

const ItemDelete_PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  width:50%;

  margin-top: 1em;


  button{
    border: none;
    background-color: white;
    cursor: pointer;
    padding:0;
    svg{
    height: 1.5rem;
    width: 1.5rem;
    }
  }

  @media (min-width: 1168px) {
    flex-direction: row-reverse;
      padding-right: 2em;
    gap: 4em;
    
  }
  `;


const DeleteButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  // border: solid 1px pink;
  align-items: start;
  padding-top:0.3rem;

  
`;

const DeleteButton = styled.button`
  // display: flex;
  // align-items: center;
  // padding: 0.5em 1em;

 
  
`;


const Price = styled.div`
    margin: 0.5em 0;
    font-size: 1.rem;
    display: flex;
    justify-content: right;
    text-align: lewft;
    svg{
      height: 1.2rem;
      width: 1.2rem;
      margin:0 0.2em;
      }
`;

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
 

export default function CartItem() {
  const { addProduct, cart, decreaseProductCount, removeProduct } = useContext(CartContext);
  
  const {user} = useUser();

  console.log("user", user);
  
  async function sendCartItems() {
    try {
      const response = await axios.post("/api/cart", cart);
      console.log("response", response.data);
      console.log("Sent cart items to the server");
    } catch (error) {
      console.error(error);
    }
  }
  // useEffect(() => {
  //     sendCartItems();
      
  // }, [cart]);


  // product is cart item type which has { productId, flavour, weight, quantity, price, title, imageLink },
  function decreaseCount(product){
    decreaseProductCount(product.productId, product.flavour, product.weight, 1, product.price,product.title,product.imageLink);
  }

  function increaseCount (product) {
    addProduct(product.productId, product.flavour, product.weight, 1, product.price,product.title,product.imageLink);
  }

  function deleteProduct(product){
    removeProduct(product.productId, product.flavour, product.weight);
  }

  return (
    <ShoppingCartContainer>
      
      <TableHeadingContainer>
        <CartHeadingItem>Items</CartHeadingItem>
        <CartHeadingQuantity>Quantity</CartHeadingQuantity>
        <CartHeadingPrice>Price</CartHeadingPrice>
      </TableHeadingContainer>

      {cart?.length> 0 && cart?.map((product) => (
        <CartItemContainer key={product.productId + product.flavour + product.weight}>
          
          <ImageContainer>
            <img src={product.imageLink} alt="" />
          </ImageContainer>

          <ItemspecContainer>
            <ItemSpecs>
              {product.title } 
              {product.flavour && " " + product.flavour}
              {product.weight && " " + product.weight}
              
            </ItemSpecs>
            <ItemCount>
              <ModifyCountButton onClick={() => decreaseCount(product)}> -
              </ModifyCountButton>
              <CountElement> {product.quantity} </CountElement>
              <ModifyCountButton onClick={() => increaseCount(product)}> +
              </ModifyCountButton>
            </ItemCount>
          </ItemspecContainer>

          <ItemDelete_PriceContainer>
            <DeleteButtonContainer>
              <DeleteButton onClick={() => deleteProduct(product)  }>
    
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
       
              </DeleteButton>
            </DeleteButtonContainer>
            
            <Price> INR  
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              {product.quantity * product.price}
              <Strikethrough>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              {product.quantity * product.originalPrice}
              </Strikethrough>
            </Price>

          </ItemDelete_PriceContainer>
      
        </CartItemContainer>
      ))}

    </ShoppingCartContainer>
  );
}
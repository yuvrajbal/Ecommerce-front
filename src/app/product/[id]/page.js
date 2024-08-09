"use client";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import Center from "../../../../components/Center";
import { CartContext } from "../../cart/CartContext";
import { set } from "mongoose";

const Container = styled.div`
  padding: 0 1em;
  border: 1px solid #ccc;
`;

const StyledTitle = styled.h1`
  font-size: 1.8rem;
`;

const StyledDescription = styled.p`
  font-size: 1rem;
  color: #707070;
`;

const WhiteBox = styled.div`
  background-color: white;
  padding: 2em 3em;
  text-align: center;
  display: flex;
  justify-content: center;
  border-radius: 0.5rem;
  margin-bottom: 3em;
  // border: 4px solid pink;
  box-shadow: 0 4px 4px -4px rgba(0, 0, 0, 0.5);
  img {
    width: 100%;
    max-width: 500px;
    height: auto;
    // border: 1px solid #ccc;
  }
`;

const Styledh4 = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  padding: 0;
  margin-bottom: 0.3em;
  display: flex;

  svg {
    height: 1.2rem;
    width: 1.2rem;
    margin: 0 0.2em;
  }
`;

const StyledSelect = styled.select`
  padding: 0.5em;
  margin: 0.5em 0;
  background-color: #f2f2f2;
  width: 100%;
  border: none;
`;

const ItemCount = styled.div`
  margin-top: 0.5em;
  display: flex;
  align-items: start;
  @media (min-width: 1168px) {
    margin-top: 0;
  }
`;

const CountElement = styled.div`
  margin: 0 1em;
  align-self: center;
  @media (min-width: 1168px) {
  align-self: start;
  margin-top: 0.5em;
`;

const ModifyCountButton = styled.button`
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.4rem;
  color: black;
  font-size: 1.5rem;
`;

const StyledButton = styled.button`
  margin: 2em 0;
  background-color: #003942;
  color: white;
  padding: 0.5em 1em;
  border: none;
  text-transform: uppercase;
  width: 100%;
  font-size: 0.9rem;
`;

const ComponentHeading = styled.button`
  font-size: 0.9rem;
  font-weight: 600;
  background-color: transparent;
  color: black;
  border: none;
  border-top: 1px solid #ccc;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1em 0;

  svg {
    height: 1.2rem;
    width: 1.2rem;
    transition: transform 0.3s ease;
  }
  &.open svg {
    transform: rotate(180deg);
  }
`;

const StyledListItem = styled.li`
  font-size: 1rem;
  margin-bottom: 0.5em;
`;

const NutritionImageContainer = styled.div`
  padding: 1em 0;
  width: 80%;
  margin: 0 auto;
  img {
    width: 100%;
    height: auto;
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

const ProdPage = styled.div`
  // padding-top: 4.5rem;
`;

// Product details
function AboutProduct({ product }) {
  const [activeComponent, setActiveComponent] = useState("ProductOverview");

  // set activeComponent to when item is collected
  const handleToggle = (id) => {
    setActiveComponent(id === activeComponent ? null : id);
  };

  const components = [
    {
      id: "ProductOverview",
      heading: "Product Overview",
      description: product?.overview,
    },

    {
      id: "SuggestedUse",
      heading: "Suggested Use",
      description: product?.suggestedUse,
    },
    {
      id: "WhyChoose",
      heading: "Why Choose?",
      description: product?.warnings,
    },
    {
      id: "Ingredients",
      heading: "Ingredients",
      description: product?.ingredients,
    },
    // {
    //   id: "NutritionalInformation",
    //   heading: "Nutritional Information",
    //   description: product?.nutritionalInformation,
    // },
  ];

  // component with heading and description
  function AboutProductComponent({
    id,
    heading,
    description,
    isActive,
    onToggle,
  }) {
    return (
      <div>
        <ComponentHeading onClick={() => onToggle(id)}>
          {heading}

          {isActive ? (
            // down arrow
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
                d="m4.5 15.75 7.5-7.5 7.5 7.5"
              />
            </svg>
          ) : (
            // up arrow
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
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          )}
        </ComponentHeading>

        {isActive && <StyledDescription>{description}</StyledDescription>}
      </div>
    );
  }

  // key benefits component as list
  function KeyBenefitsComponent({
    id,
    heading,
    description,
    isActive,
    onToggle,
  }) {
    return (
      <div>
        <ComponentHeading onClick={() => onToggle(id)}>
          {heading}

          {isActive ? (
            // down arrow
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
                d="m4.5 15.75 7.5-7.5 7.5 7.5"
              />
            </svg>
          ) : (
            // up arrow
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
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          )}
        </ComponentHeading>

        {isActive && (
          <StyledDescription>
            {description?.map((benefit) => (
              <StyledListItem>{benefit}</StyledListItem>
            ))}
          </StyledDescription>
        )}
      </div>
    );
  }

  function NutritionLabel({ id, heading, imageLink, isActive, onToggle }) {
    // console.log("imageLink", imageLink);
    return (
      <>
        <ComponentHeading onClick={() => onToggle(id)}>
          {heading}

          {isActive ? (
            // down arrow
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
                d="m4.5 15.75 7.5-7.5 7.5 7.5"
              />
            </svg>
          ) : (
            // up arrow
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
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          )}
        </ComponentHeading>

        {isActive && (
          <NutritionImageContainer>
            <img src={imageLink} />
          </NutritionImageContainer>
        )}
      </>
    );
  }

  return (
    <div>
      {components.map((component) => (
        <AboutProductComponent
          key={component.id}
          id={component.id}
          heading={component.heading}
          description={component.description}
          isActive={component.id === activeComponent}
          onToggle={handleToggle}
        />
      ))}

      <KeyBenefitsComponent
        id={"KeyBenefits"}
        heading={"Key Benefits"}
        description={product?.keyBenefits}
        isActive={activeComponent === "KeyBenefits"}
        onToggle={handleToggle}
      />
      <NutritionLabel
        id={"NutritionLabel"}
        heading={"Nutrition Infomration"}
        imageLink={product?.images[2]}
        isActive={activeComponent === "NutritionLabel"}
        onToggle={handleToggle}
      />
    </div>
  );
}

export default function ProductInfoPage({ params }) {
  const [product, setProduct] = useState(null);
  const [price, setPrice] = useState(null);
  const [originalPrice, setOriginalPrice] = useState(null);
  const { id } = params;
  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [selectedWeight, setSelectedWeight] = useState("");
  const [count, setCount] = useState(1);
  const siteWideDiscount = 25;

  const handleFlavorChange = (event) => {
    setSelectedFlavor(event.target.value);
  };

  const handleWeightChange = (event) => {
    setSelectedWeight(event.target.value);
    updatePrice(event.target.value);
  };

  const higherDiscount =
    product?.discount > siteWideDiscount ? product?.discount : siteWideDiscount;

  // update price based on price and flavour
  const updatePrice = (weight) => {
    if (!weight) {
      return;
    }
    const weightPropertyIndex = product.categoryProperties.findIndex(
      (category) => category.name === "Weight"
    );
    // console.log("weight property index", weightPropertyIndex);

    const pricePropertyIndex = product.categoryProperties.findIndex(
      (category) => category.name === "Price"
    );
    // console.log("pricePropertyIndex", pricePropertyIndex);

    const weightIndex = product.categoryProperties[
      weightPropertyIndex
    ]?.values.findIndex((value) => value === weight);

    // console.log("weightIndex", weightIndex);
    setPrice(
      product.categoryProperties[pricePropertyIndex]?.values[weightIndex]
    );

    const newOriginalPrice = Math.ceil(
      Number(price) * (100 / (100 - Number(higherDiscount)))
    );
    console.log("newOriginalPrice", newOriginalPrice);
    // setOriginalPrice(newOriginalPrice);
  };

  // update original price based on price and discount
  useEffect(() => {
    const newOriginalPrice = Math.ceil(
      Number(price) * (100 / (100 - Number(higherDiscount)))
    );
    // console.log("newOriginalPrice", newOriginalPrice);
    // setOriginalPrice(newOriginalPrice);
    setOriginalPrice(newOriginalPrice);
  }, [price]);

  // Fetch product data from the database
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) {
          return;
        }
        const response = await axios.get("/api/products/" + id);

        setProduct(response.data);
        setPrice(response.data.price);

        const higherOriginalPrice = Math.ceil(
          Number(response.data.price) * (100 / (100 - Number(higherDiscount)))
        );
        setOriginalPrice(higherOriginalPrice);

        const flavourCategory = response.data.categoryProperties.find(
          (category) => category.name === "Flavour"
        );
        const weightCategory = response.data.categoryProperties.find(
          (category) => category.name === "Weight"
        );
        setSelectedFlavor(flavourCategory?.values[0]);
        setSelectedWeight(weightCategory?.values[0]);

        console.log("product", response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [id]);

  // Filter the category properties to get the flavour and weight
  const filteredCategories = product?.categoryProperties.filter(
    (category) => category.name === "Flavour" || category.name === "Weight"
  );

  const { addProduct, cart, decreaseProductCount, removeProduct } =
    useContext(CartContext);

  // manage state count
  function decreaseCount(productId) {
    // decreaseProductCount(productId);
    if (count === 1) {
      return;
    }
    setCount(count - 1);
  }
  function increaseCount(productId) {
    // addProduct(productId);
    setCount(count + 1);
  }

  // console.log("price", price);

  function handleAddtoCart(
    productId,
    selectedFlavor,
    selectedWeight,
    count,
    price,
    title,
    imageLink,
    originalPrice
  ) {
    console.log(selectedFlavor, selectedWeight);
    console.log("count", count);
    addProduct(
      productId,
      selectedFlavor,
      selectedWeight,
      count,
      price,
      title,
      imageLink,
      originalPrice
    );
    console.log("added product", cart);
  }

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
  //   if (cart && cart.length > 0) {
  //     console.log("Cart updated, sending cart items to the server...");
  //     sendCartItems();
  //   } else {
  //     console.log("Cart is empty, not sending cart items to the server.");
  //   }
  // }, [cart]);

  return (
    <ProdPage>
      <Center>
        <Container>
          <StyledTitle>{product?.title}</StyledTitle>

          {/* Short description */}
          <StyledDescription>{product?.description}</StyledDescription>

          {/* Product image */}
          <WhiteBox>
            <img src={product?.images[0]} />{" "}
          </WhiteBox>

          {/* Price */}
          <Styledh4>
            INR
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
          </Styledh4>

          {/* Properties */}
          {filteredCategories?.map((category) => (
            <div key={category._id}>
              <Styledh4>{category.name}</Styledh4>
              <StyledSelect
                onChange={
                  category.name === "Flavour"
                    ? handleFlavorChange
                    : handleWeightChange
                }
              >
                {category.values.map((property) => (
                  <option key={property._id} value={property}>
                    {property}
                  </option>
                ))}
              </StyledSelect>
            </div>
          ))}

          {/* Quantity */}
          <Styledh4>Quantity</Styledh4>
          <ItemCount>
            <ModifyCountButton onClick={() => decreaseCount(product._id)}>
              -
            </ModifyCountButton>
            <CountElement> {count} </CountElement>
            <ModifyCountButton onClick={() => increaseCount(product._id)}>
              +
            </ModifyCountButton>
          </ItemCount>

          {/* Add to cart */}
          <StyledButton
            onClick={() =>
              handleAddtoCart(
                product._id,
                selectedFlavor,
                selectedWeight,
                count,
                price,
                product.title,
                product.images[0],
                originalPrice
              )
            }
          >
            add to cart
          </StyledButton>

          {/* Description */}
          {/* <StyledDescription>{product?.description}</StyledDescription> */}

          {/* About the product */}
          <AboutProduct product={product} />
        </Container>
      </Center>
    </ProdPage>
  );
}

import styled from "styled-components";
import { useEffect, useState, useCallback } from "react";
import {useRouter} from "next/navigation";
import debounce from 'lodash.debounce';
import Link from "next/link";
const InputContainer = styled.div`  
  display: flex;
  border-radius:1rem;
  `;
const StyledInput = styled.input`
 border:none;
 border-radius:1rem 0 0 1rem;
 `;
const StyledButton = styled.button`
  background-color: white;
  border-radius: 0 1rem 1rem 0;
  border:none;
  `;

const ProductImage = styled.img`
 width: 70px;
 `;

 const Product__Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  // border-bottom: 1px solid #ccc;
  cursor: pointer;
  transition: background-color 0.3s;
  gap: 1rem;
  border: 1px solid #ccc;
  &:hover {

    background-color: #f9f9f9;
  }
  `;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  `;


export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchData = useCallback(
    debounce(async (query) => {
      if(!query.trim()){
        setResults([]);
        return;
      }
      setLoading(true);
      try{
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (!response.ok){
          throw new Error("An error occurred while fetching the data");
        }
        const data = await response.json();
        setResults(data.products);

      }catch(error){
        console.error("error fetching search results", error);
        setResults([]);

      } finally {
        setLoading(false);
      }
    },300),[]
  );

  useEffect(() => {
    fetchData(search);
  }, [search, fetchData]);


  function ProductInfo({images, title, _id}){
    return (
      <div>
        <StyledLink href={"/product/"+ _id}>
        <Product__Container>
        <ProductImage src={images[0]} alt={title} />
        <div>{title}</div>

        </Product__Container>
       
        </StyledLink>
        
        
      </div>
    );
  }



  return (
    <div>
      <InputContainer>
              <StyledInput
                type="text"
                placeholder="Try Our Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus = {() => setIsInputFocused(true)}
                

              /> 
           
      </InputContainer>

      {isInputFocused && (
        <div>
          
          {loading? (<p>Loading...</p>):(
            <div>
              {results.map((product) => (
                <ProductInfo key={product._id} {...product} />
              ))}
            </div>
          ) 
          }
        </div>
      )}
    </div>
  );
} 
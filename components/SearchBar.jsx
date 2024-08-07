import styled from "styled-components";
import { useEffect, useState, useCallback, useRef } from "react";
import {useRouter} from "next/navigation";
import debounce from 'lodash.debounce';
import Link from "next/link";
import { set } from "mongoose";
import Overlay from "./Overlay";


const SearchOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1000;
  border:solid 1px #ccc;

  `;
const InputContainer = styled.div`  
  display: flex;
  background-color:#EBE4D4 ;
  align-items: center;
  `;

const StyledInput = styled.input`
  width: 100%;
  border:none;
  border-radius:1rem 1rem 1rem 1rem;
  padding: 1em 0.5em;
  margin: 1em 0 1em 1em;
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

const ProductTitle = styled.div`
  font-size: 1rem;

`;

const ClearButton = styled.button`  

  background-color:transparent;
  border:none;
  cursor: pointer;
  padding: 0.5rem;
  svg{
    width:1.5rem;
  }
  `;



const SearchResultContainer = styled.div`
  // position: absolute;
  width: 100%;
  background-color: white;
  `;


export default function SearchBar({onClose}) {
  const [search, setSearch] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  // const router = useRouter();
  const [clear, setClear] = useState(false);
  const inputRef = useRef(null);
  const searchOverlayRef = useRef(null);

  const fetchData = useCallback(
    debounce(async (query) => {
      const trimmedQuery = query.trim();

      if(trimmedQuery.length < 3){
        setResults([]);
        
        return;
      }
      setLoading(true);
      setClear(true);
      try{
        const response = await fetch(`/api/search?q=${encodeURIComponent(trimmedQuery)}`);
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
    setClear(search.length > 0);
  }, [search, fetchData]);



  function ProductInfo({images, title, _id}){
    return (
      <div onClick={onClose}>
        <StyledLink href={"/product/"+ _id}>
          <Product__Container>
            <ProductImage src={images[0]} alt={title} />
            <ProductTitle>{title}</ProductTitle>

          </Product__Container>
       
        </StyledLink>
        
        
      </div>
    );
  }

  const handleClear = () => {
    setSearch("");
    setResults([]);
    setClear(false);
  };

  useEffect (() => {
    if (inputRef.current){
      inputRef.current.focus();
    }

    const handleClickOutside = (event) => {
      if (searchOverlayRef.current && !searchOverlayRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  },[]);




  return (
    <>
    {/* <Overlay onClick={onClose} /> */}
    <SearchOverlay ref = {searchOverlayRef}>
      <InputContainer>
              <StyledInput
                ref = {inputRef}
                type="text"
                placeholder="Try Our Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus = {() => setIsInputFocused(true)}
               
                
              /> 
              {clear && (
                 <ClearButton onClick={handleClear}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>

               </ClearButton>)
                }
             
           
      </InputContainer>

      {isInputFocused && (
        <SearchResultContainer>
          
          {loading? (<p>Loading...</p>):(
            <div>
              {results.map((product) => (
                <ProductInfo key={product._id} {...product} />
              ))}
            </div>
          ) 
          }
        </SearchResultContainer>
      )}
    </SearchOverlay>
    </>
  );
} 
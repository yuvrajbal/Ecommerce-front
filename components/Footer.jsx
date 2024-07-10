
import Center from "./Center";
import styled from 'styled-components';
import Link from 'next/link';
import Card from "./Card";
import { useState } from "react";
import { useMediaQuery } from 'react-responsive';
import { useEffect } from "react";
const Bg = styled.div` 
  background-color: #333;
  color: white;
  margin-top: 2em;
  padding: 2em;
`;

const StyledLink = styled(Link)`
  display: block;
  color: white;
  text-decoration: none;
  margin: 0 0;
  cursor: pointer;
  max-width: fit-content;
  transition: background-color 0.3s ease;
  display: flex;

  &:hover: {
    background-color: pink;
  }
  svg {
  width: 1.3rem;
  height: 1.3rem;
  margin-right: 0.9em;

  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: min(90%,70rem);
  margin-bottom: 4em;

  @media (max-width: 768px) {
  flex-direction: column;
  gap: 3em;
  `;

const SocialsContainer = styled.div`
  display: flex;
  gap: 2em;

  @media (min-width: 768px) {
    gap: 3em;
  }
`;

const SocialsLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  
  svg{
  
    color: white;
    width: 1.5rem;
    height: 1.5rem;
    // align-items: center;
    margin-top:0.4rem;
    }
`;

const SignupButton = styled.button`
  background-color: white;
  text-transform: uppercase;
  padding: 0.5em 1em;
  cursor: pointer;
  border:none;
  border-radius: 0.3rem;
  font-size: 1rem;
  width: 8rem;
  `;

const HelpInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  margin-bottom: 2em;
  padding-top: 1em;
  `;

const Cardheading = styled.button`
  font-size: 1rem;
  font-weight: 600;
  padding: 1em 0;
  font-family: Roboto;
  background-color: transparent;
  color: white;
  border:none;
  border-top: solid 1px white;
  // border-bottom: solid 1px white;
  max-width: 20rem;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
  height: 1.2rem;
  width: 1.2rem;
  transition: transform 0.3s ease;

  }
  &.open svg{
    transform: rotate(180deg);
  }
  `;

const FooterContainer = styled.div`
  @media (min-width: 800px) {
  padding: 2em;
}
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  // margin-top: 1em;
  // border: solid 2px pink;
  width:100%;
`;

const FlexContainer = styled.div`
  
  @media (min-width: 800px) {
    display: flex;
    justify-content: space-between;
    gap:2em;
  }
  `;

function HelpInfoCard() {
  return (
    <HelpInfoContainer>
      <StyledLink href={"/"}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-1">
          <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
          </svg>

          Customer Services
      </StyledLink>
      <StyledLink href={"/"}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
          </svg>
            Contact us
          
      </StyledLink>
      <StyledLink href={"/"}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
</svg>

          Help Centre
      </StyledLink>
          <StyledLink href={"/"}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
          </svg>

          Returns Policy
          </StyledLink>
          <StyledLink href={"/"}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
          </svg>


          Track my order
          </StyledLink>

          <StyledLink href={"/"}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
        </svg>

          Delivery Information
          </StyledLink>
          </HelpInfoContainer>
  );
}

export default function Footer() {

  const products = [
    {
      name: "Protein",
      href: "/",
    },
    {
      name: "Nutrition",
      href: "/",
    },
    {
      name: "Bars & Snacks",
      href: "/",
    },
    {
      name: "Clothing & Accessories",
      href: "/",
    },
    {
      name: "Health & Wellness",
      href: "/",
    },
    {
      name: "Vitamins",
      href: "/",
    },
    {
      name: "Articles & Advice",
      href: "/",
    }
  ]

  const companyInformation = [
    {
      name: "About Us",
      href: "/",
    },
    {
      name: "Careers",
      href: "/",
    },
    {
      name: "Affiliates",
      href: "/",
    },
    {
      name: "Press",
      href: "/",
    },
    {
      name: "Sustainability",
      href: "/",
    },
    {
      name: "Inclusion & Diversity",
      href: "/",
    }
    ]

    const loyalty = [
      {
        name: "About Us",
        href: "/",
      },
      {
        name: "Careers",
        href: "/",
      },
      {
        name: "Affiliates",
        href: "/",
      },
      {
        name: "Press",
        href: "/",
      },
      {
        name: "Sustainability",
        href: "/",
      },
      {
        name: "Inclusion & Diversity",
        href: "/",
      }
      ]


  function CardComponent({heading, links}) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [isMediumScreen, setIsMediumScreen] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkMediaQuery = () => {
      setIsMediumScreen(window.matchMedia('(min-width: 768px)').matches);
    };
    checkMediaQuery();
    window.addEventListener('resize', checkMediaQuery);
    return () => {
      window.removeEventListener('resize', checkMediaQuery);
    };
  }, []);



    const handleToggleDropdown = () => {
      if(!isMediumScreen){
      setDropdownOpen(!dropdownOpen);
      }
    };
    return (
    <>
      <Cardheading onClick={handleToggleDropdown}>
      {heading}
      
      {isMediumScreen ? (null) : (
          dropdownOpen? 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
          </svg> : 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
      )}
          
      </Cardheading>
      {isClient && isMediumScreen ?( <Card links={links} />) : (
          dropdownOpen && <Card links={links} />)}
    </>
    );
  }


  return (
    <Bg>
    <Center>
      <FooterContainer>
        <ButtonContainer>

          <SignupButton>Sign up </SignupButton>
          <SocialsContainer>
            <SocialsLink href={"/"}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
            </svg>
            </SocialsLink>
            <SocialsLink href={"/"}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter-x" viewBox="0 0 16 16">
            <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                </svg>
              </SocialsLink>
            <SocialsLink href={"/"}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
          <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
              </svg>
            </SocialsLink>
            <SocialsLink href={"/"}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-youtube" viewBox="0 0 16 16">
              <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"/>
            </svg>
            </SocialsLink>
          </SocialsContainer>

        </ButtonContainer>

        <FlexContainer>
          <CardContainer>
            <Cardheading>Help and Information</Cardheading>
            <HelpInfoCard />
          </CardContainer>

          <CardContainer>
            <CardComponent heading="Products" links={products} />
          </CardContainer>

          <CardContainer>
            <CardComponent heading="Company Information" links={companyInformation} />
          </CardContainer>

          <CardContainer>
            <CardComponent heading="Loyalty & Rewards" links={loyalty} />
          </CardContainer>

        </FlexContainer>
      </FooterContainer>

     
    </Center>
    </Bg>
  );  
}
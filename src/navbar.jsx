import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NavbarContainer = styled.nav`
  background-color: black;
  position: fixed;
  top: 0;
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
z-index: 1000;


  

  h3{
  font-size: 25px;
  font-size: 2rem;
  font-weight: bold;
  background: linear-gradient(135deg, #007bff, #00d4ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'Poppins', sans-serif;
  }

  button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  color: #00d4ff;
  font-size: 15px;
  background: none;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease; /* Smooth transitions */
}

button:hover {
  background: linear-gradient(135deg, #007bff, #00d4ff);
  color: white; /* Change text color for contrast on hover */
}

  
`;

const Logo = styled.img`
  height: 40px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  font-weight: 500;
  &:hover {
    color: grey;
    text-decoration: underline;
    text-decoration-color: #00d4ff;

  }
`;

const SearchBar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
`;

const SearchIcon = styled.span`
  position: absolute;
  right: 1rem;
  pointer-events: none;
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-right:40px
`;

const Icon = styled.span`
  font-size: 1.5rem;
  cursor: pointer;
  &:hover {
    color: #1f2937;
  }
`;

function Navbar() {
  return (
    <NavbarContainer>
      
      <h3>InnovateHub</h3>
      
      <NavLinks>
        <NavLink href="/">Home</NavLink>
        <NavLink href="#about">About</NavLink>
        <NavLink href="/dish">Challenges</NavLink>
        <NavLink href="#contact">Contact</NavLink>
      </NavLinks>
      <IconsContainer>
        <SearchBar>
          <SearchInput type="search" placeholder="Search" />
          <SearchIcon>🔍</SearchIcon>
        </SearchBar>
        {/* <Icon><Link to="/cart">🛒</Link></Icon> 
        <Icon><Link to="/view">👤</Link></Icon>  */}
        <button><Link to="/register" style={{color: "#00d4ff"}}>Sign In.</Link></button>
      </IconsContainer>
     
    </NavbarContainer>
  );
}

export default Navbar;















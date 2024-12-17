import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  background-color: #F7E9EC;
  padding: 10px 15px;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 425px) {
    padding: 8px 10px;
  }

  @media (max-width: 320px) {
    padding: 6px 8px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  @media (max-width: 425px) {
    gap: 8px;
  }

  @media (max-width: 320px) {
    gap: 6px;
  }
`;

const Logo = styled.img`
  width: 280px;
  height: auto;
  max-width: 100%;

  @media (max-width: 425px) {
    width: 240px;
  }

  @media (max-width: 375px) {
    width: 220px;
  }

  @media (max-width: 320px) {
    width: 200px;
  }
`;

const Text = styled.p`
  margin: 0;
  text-align: center;
  font-size: 1rem;
  line-height: 1.4;
  padding: 0 10px;

  @media (max-width: 425px) {
    font-size: 0.9rem;
    padding: 0 8px;
  }

  @media (max-width: 375px) {
    font-size: 0.85rem;
    padding: 0 6px;
  }

  @media (max-width: 320px) {
    font-size: 0.8rem;
    padding: 0 5px;
  }
`;

function Header() {
    return (
        <HeaderContainer>
            <ContentWrapper>
                <Logo 
                    src="/LogoCanella.png"
                    alt="Logo"
                />
                <Text>
                    <strong>Ajude-nos a melhorar! Deixe aqui sua avaliação sobre nossos Serviços</strong>
                </Text>
            </ContentWrapper>
        </HeaderContainer>
    );
}

export default Header;
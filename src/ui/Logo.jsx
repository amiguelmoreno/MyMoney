import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;

  @media (width <= 850px) {
    display: none;
  }
`;

const Img = styled.img`
  height: 7rem;
  width: auto;

  @media (width <= 1050px) {
    height: 4rem;
  }
`;

const StyledName = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1;

  @media (width <= 1050px) {
    font-size: 1.2rem;
  }
`;

const StyledWord = styled.h1`
  font-size: 2rem;
  font-weight: 600;

  @media (width <= 1050px) {
    font-size: 1.6rem;
  }
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src="/mymoney.png" alt="Logo" />
      <StyledName>
        <span>my</span>
        <StyledWord>Money</StyledWord>
      </StyledName>
    </StyledLogo>
  );
}

export default Logo;

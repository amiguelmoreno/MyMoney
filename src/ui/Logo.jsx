import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 7rem;
  width: auto;
`;

const StyledName = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1;
`;

const StyledWord = styled.h1`
  font-size: 2rem;
  font-weight: 600;
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

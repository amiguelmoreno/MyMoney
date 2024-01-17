import styled from "styled-components";
import Heading from "./Heading";
import { formatCurrency } from "../utils/helpers";

const DetailsCard = styled.div`
  padding: 2rem;
  display: grid;
  align-items: center;

  font-size: 1.8rem;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: 1fr 3fr 1fr;
`;
const Title = styled.div`
  font-size: 3.4rem;
  font-weight: 500;
  white-space: nowrap;
  grid-column: 1/8;
`;
const Status = styled.div`
  text-transform: uppercase;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  font-weight: 500;

  span {
    font-size: 4rem;
  }
`;
const Account = styled.div`
  grid-column: 1/4;

  span {
    margin-left: 0.3rem;
    font-weight: 600;
    font-size: 2rem;
  }
`;
const Description = styled.div`
  grid-column: 5/9;
`;
const Amount = styled.div`
  grid-column: 8/9;
  font-weight: 500;
  font-size: 5rem;
`;
const Date = styled.div`
  white-space: nowrap;
  grid-column: 1/2;
  font-weight: 600;
`;
const FromTo = styled.div`
  grid-column: 2/8;
  justify-self: center;
  display: flex;
  align-items: self-start;
  font-size: 1.7rem;
  justify-content: center;

  span {
    margin: 0 0.5rem;
    font-weight: 500;
    font-size: 2.2rem;
  }
`;

function Details({ transaction }) {
  console.log(transaction);
  return (
    <>
      <DetailsCard>
        <Title>{transaction.concept}</Title>
        <Status>
          <p>{transaction.status}</p>
          {transaction.status === "sent" && <span>💸</span>}
          {transaction.status === "received" && <span>✅</span>}
          {transaction.status === "pending" && <span>🟠</span>}
        </Status>
        <Account>
          Account: <span>{transaction.account}</span>
        </Account>
        {transaction.description ? (
          <Description>
            <Heading as="h3">Details:</Heading>
            <p>{transaction.description}</p>
          </Description>
        ) : (
          <Description>
            <p>No details specified</p>
          </Description>
        )}
        <Date>{transaction.date}</Date>
        <FromTo>
          <p>
            from <span>{transaction.from}</span> to{" "}
            <span>{transaction.to}</span>
          </p>
        </FromTo>
        <Amount>{formatCurrency(transaction.amount)}</Amount>
      </DetailsCard>
    </>
  );
}

export default Details;

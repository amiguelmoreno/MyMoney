import { createContext, useContext } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  //border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  //overflow: hidden;
`;
const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;
  border: 1px solid var(--color-grey-200);
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  border-radius: 5px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  margin-bottom: 1em;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;
  display: flex;
  justify-content: space-around;
  white-space: nowrap;

  span {
    font-size: 2rem;
    line-height: 0;
    cursor: pointer;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  border-radius: 5px;

  background-color: ${(props) =>
    props.type === "income"
      ? "var(--color-brand-100)"
      : props.type === "expense"
      ? "#f49999;"
      : "inherit"};
`;

const StyledBody = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const TableContext = createContext();

function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader role="row" columns={columns} as="header">
      {children}
    </StyledHeader>
  );
}

function Row({ children, type }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow role="row" columns={columns} type={type}>
      {children}
    </StyledRow>
  );
}

function Body({ data, render }) {
  if (!data.length) return <Empty>No data to show at the moment</Empty>;

  return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;

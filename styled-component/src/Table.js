import { Row } from "./Row";
import styled from "styled-components";

function Table() {
  const StyledTable = styled.table`
    width: 100%;
  `;
  return (
    <StyledTable>
      <tbody>
        {Array.from(Array(20)).map((_row, index) => (
          <Row columns={20} key={index} />
        ))}
      </tbody>
    </StyledTable>
  );
}

export default Table;

import styled from "styled-components";

  const StyledTd = styled.td`
    max-width: 384px;
    height: 38px;
    background-color: rgb(255, 255, 255);
    color: rgb(52, 53, 56);
    box-shadow: rgb(246 247 248) 0px 1px 0px inset;
    font-size: 15px;
    line-height: 22px;
    font-weight: normal;
  `;
  const StyledDivInner = styled.div`
    display: flex;
    align-items: center;
    padding: 16px 16px 16px 0px;
    text-align: left;
  `;
  const StyledDiv = styled.div`
    width: 100%;
    height: 16px;
    border-radius: 8px;
    background-color: rgb(232, 233, 235);
    position: relative;
    overflow: hidden;
    &:before {
      left: 0px;
      width: 55%;
      content: "";
      position: absolute;
      height: 100%;
      background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 0.75),
        rgba(255, 255, 255, 0)
      );
      /* animation-name: animation-wax5px; */
      animation-duration: 1000ms;
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;
    }
  `;
export const Row = ({columns}) => {
    return (
      <tr>
        {Array.from(Array(columns)).map((_column, index) => (
          <StyledTd key={index}>
            <StyledDivInner>
              <StyledDiv />
            </StyledDivInner>
          </StyledTd>
        ))}
      </tr>
    );
}

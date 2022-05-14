import "./App.css";
import { Row } from "./Row";

function Table() {
  const tableStyles = {
    width: "100%",
  };
  return (
    <table style={tableStyles}>
      <tbody>
        {Array.from(Array(20)).map((_row, index) => (
          <Row columns={20} key={index} />
        ))}
      </tbody>
    </table>
  );
}

export default Table;

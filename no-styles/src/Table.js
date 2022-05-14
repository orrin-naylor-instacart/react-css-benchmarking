import { Row } from "./Row";

function Table() {
  return (
    <table>
      <tbody>
        {Array.from(Array(20)).map((_row, index) => (
          <Row columns={20} key={index} />
        ))}
      </tbody>
    </table>
  );
}

export default Table;

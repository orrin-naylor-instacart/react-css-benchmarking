import './Row.css'
export const Row = ({columns}) => {
    return (
      <tr>
        {Array.from(Array(columns)).map((_column, index) => (
          <td className="tdStyles" key={index}>
            <div className="div-style">
              <div className="row-animation" />
            </div>
          </td>
        ))}
      </tr>
    );
}

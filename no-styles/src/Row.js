export const Row = ({columns}) => {
    return (
      <tr>
        {Array.from(Array(columns)).map((_column, index) => (
          <td key={index}>
            <div>
              <div/>
            </div>
          </td>
        ))}
      </tr>
    );
}

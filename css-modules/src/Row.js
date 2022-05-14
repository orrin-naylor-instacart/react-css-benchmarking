import styles from "./Row.module.css";
export const Row = ({columns}) => {
    return (
      <tr>
        {Array.from(Array(columns)).map((_column, index) => (
          <td className={styles.tdStyles} key={index}>
            <div className={styles["div-style"]}>
              <div className={styles["row-animation"]} />
            </div>
          </td>
        ))}
      </tr>
    );
}

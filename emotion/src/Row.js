/** @jsxImportSource @emotion/react */

export const Row = ({ columns }) => {
  const tdStyles = {
    maxWidth: "384px",
    height: "38px",
    backgroundColor: "rgb(255, 255, 255)",
    color: "rgb(52, 53, 56)",
    boxShadow: "rgb(246 247 248) 0px 1px 0px inset",
    fontSize: "15px",
    lineHeight: "22px",
    fontWeight: "normal",
  };
  const divStyles = {
    width: "100%",
    height: "16px",
    borderRadius: "8px",
    backgroundColor: "rgb(232, 233, 235)",
    position: "relative",
    overflow: "hidden",

    ":before": {
      left: "0px",
      width: "55%",
      content: '""',
      position: "absolute",
      height: "100%",
      background:
        "linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0))",
      animationName: "animation-wax5px",
      animationDuration: "1000ms",
      animationTimingFunction: "ease-in-out",
      animationIterationCount: "infinite",
    },
  };
  const innerDivStyles = {
    display: "flex",
    alignItems: "center",
    padding: "16px 16px 16px 0px",
    textAlign: "left",
  };
  return (
    <tr>
      {Array.from(Array(columns)).map((_column, index) => (
        <td css={tdStyles} key={index}>
          <div css={innerDivStyles}>
            <div css={divStyles} />
          </div>
        </td>
      ))}
    </tr>
  );
};

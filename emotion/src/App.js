import { useState, useEffect } from "react";
import Table from "./Table";

function App() {
  const [renderTrigger, setRenderTrigger] = useState(0);
  const [startTime, setStartTime] = useState(new Date().getTime());
  const [hasReset, setHasReset] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      if (startTime > 10000 && !hasReset) {
        setHasReset(true);
        setStartTime(new Date().getTime());
        setRenderTrigger(0);
      } else {
        setRenderTrigger(renderTrigger + 1);
      }
    });
  });

  return (
    <>
      <h1>{(1000 * renderTrigger) / (new Date().getTime() - startTime + 1)}</h1>
      {renderTrigger % 3 !== 0 && <Table />}
    </>
  );
}

export default App;

import { useEffect, useState } from 'react';

export function App({
  counterObj,
  counterAtr,
  wc,
}: {
  counterObj: { value: number };
  counterAtr: number;
  wc: HTMLElement;
}) {
  const [c, setC] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setC(c + 1);
    }, 1000);

    wc.dispatchEvent(
      new CustomEvent('counter-event', { detail: 'hello from web component' })
    );

    return () => clearInterval(interval);
  }, [c, wc, setC]);

  return (
    <div>
      <h1>Web component!</h1>
      <p>{c}</p>

      <h2>Counter value from object, data property</h2>
      <p>{counterObj.value}</p>

      <h2>Counter value from attribute</h2>
      <p>{counterAtr}</p>
    </div>
  );
}

export default App;

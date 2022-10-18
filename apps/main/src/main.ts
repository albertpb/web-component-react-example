const wc = document.querySelector('react-wc') as any;

console.log(wc);

let count = 0;

setInterval(() => {
  count++;
  wc.counterObj = { value: count }; // eslint-disable-line
  wc.setAttribute('counter-attr', count.toString());
}, 5000);

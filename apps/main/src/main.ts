interface HTMLCustom extends HTMLElement {
  counterObj: { value: number };
}

const wc = document.querySelector('react-wc') as HTMLCustom;

console.log(wc);

let count = 0;

setInterval(() => {
  count++;
  wc.counterObj = { value: count };
  wc.setAttribute('counter-attr', count.toString());
}, 5000);

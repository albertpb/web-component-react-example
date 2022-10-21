interface HTMLCustom extends HTMLElement {
  counterObj: { value: number };
}

const wc = document.querySelector('react-wc') as HTMLCustom;
wc.addEventListener('counter-event', (e: CustomEvent) => {
  console.log('event received ->', e.detail);
});

let count = 0;

setInterval(() => {
  count++;
  wc.counterObj = { value: count };
  wc.setAttribute('counter-attr', count.toString());
}, 5000);

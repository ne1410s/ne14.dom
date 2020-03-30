import { ChainSource } from "./models";
import { ChainedQuery } from "./chained-query";

export function ready(func: () => void, doc?: Document): void {
  doc = doc || document;
  doc.addEventListener('readystatechange', () => {
    if (doc.readyState === 'interactive') func();
  });
};

export function q(...input: ChainSource[]): ChainedQuery {
  return new ChainedQuery(...input);
}

// TODO: Move throttle and debounce to chained-query...
// However, this needs the backing array to accept additional object type(s)
// For example ne_dom.q(window).debounce('resize' () => console.log('resized'))

// export function throttle<T>(func: (arg: T) => void, delay = 200): (arg: T) => void {
//   let active: boolean;
//   return function (args) {
//     if (!active) {
//       if (active == null) func.call(this, args);
//       active = true;
//       const that = this;
//       setTimeout(() => { 
//         active = !!func.call(that, args);
//         setTimeout(() => active = active || null, delay / 10);
//       }, delay);
//     }
//   };
// }

// export function debounce<T>(func: (arg: T) => void, delay = 200): (arg: T) => void {
//   let timeout: NodeJS.Timeout;
//   return function (arg) {
//     clearTimeout(timeout);
//     const that = this;
//     timeout = setTimeout(() => func.call(that, arg), delay);
//   };
// }
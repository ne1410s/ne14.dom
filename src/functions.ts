import { QuickParam } from "./models";
import { ChainedQuery } from "./chained-query";

export function ready(func: () => void): void {
  document.addEventListener('readystatechange', () => {
    if (document.readyState === 'interactive') func();
  });
};

export function q(...input: (string | QuickParam | Element)[]): ChainedQuery {
  return new ChainedQuery(...input);
}
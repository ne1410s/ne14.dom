export interface QuickParam {
  tag: string;
  text?: string;
  attr?: Record<string, string>;
  evts?: Record<string, EventListenerOrEventListenerObject>;
}

export type Chainable = ParentNode | EventTarget;
export type ChainSource = string | QuickParam | Chainable;
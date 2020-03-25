export interface QuickParam {
  tag: string;
  text?: string;
  attr?: Record<string, string>;
  evts?: Record<string, EventListenerOrEventListenerObject>;
}
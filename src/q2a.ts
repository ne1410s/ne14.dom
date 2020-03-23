export class $Q {

  private _elems: Element[] = [];

  static From = (selector: string, root?: ParentNode) => new $Q().add(selector, root);
  static FromNew = (...elems: Element[]) => new $Q().addNew(...elems);
  static FromRaw = (html: string) => new $Q().addRaw(html);
  static FrowQuick = (param: QuickParam) => new $Q().addQuick(param);

  get = (index: number) => this._elems[index];

  add(selector: string, root?: ParentNode): $Q {

    var x = document.querySelectorAll(selector);
    console.log('x', x);

    const elems = $Q.Query(selector, root);
    this._elems.push(...elems);
    return this;
  }

  addNew(...elems: Element[]): $Q {
    this._elems.push(...elems);
    return this;
  }

  addRaw(html: string): $Q {
    const template = document.createElement('template');
    template.innerHTML = html;
    $Q.ListToArray(template.content.childNodes).forEach(node => {
      this._elems.push(node as Element);
    });
    
    return this;
  }

  addQuick(param: QuickParam): $Q {
    const el = document.createElement(param.tag);
    el.textContent = param.text;

    for (let key in param.attr || {}) {
      el.setAttributeNS(null, key, param.attr[key]);
    }

    for (let key in param.evts || {}) {
      el.addEventListener(key, param.evts[key]);
    }

    this._elems.push(el);
    return this;
  }

  each(func: (elem: Element, i?: number) => void): $Q {
    this._elems.filter((el, i) => { func(el, i); return true; });
    return this;
  }

  empty(): $Q {
    return this.each(el => {
      while (el.firstChild) { el.removeChild(el.firstChild); }
    });
  }

  fire<T>(eventName: string, detail?: T): $Q {
    const evt = new CustomEvent(eventName, { detail });
    return this.each(el => el.dispatchEvent(evt));
  }

  on(eventNames: string, func: EventListenerOrEventListenerObject): $Q {
    const evts = eventNames.split(' ');
    return this.each(el => {
      evts.forEach(name => el.addEventListener(name, func));
    });
  }

  private static Query(selector: string, root?: ParentNode): Element[] {
    const parent = root || document;
    const elems = parent.querySelectorAll(selector);
    return $Q.ListToArray(elems);
  }

  private static ListToArray<T extends Node>(nodeList: NodeListOf<T>): T[] {
    return Array.prototype.slice.call(nodeList);
  }
}

export interface QuickParam {
  tag: string;
  text?: string;
  attr?: Record<string, string>;
  evts?: Record<string, EventListenerOrEventListenerObject>;
}
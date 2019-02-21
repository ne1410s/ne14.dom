export abstract class Control {
    
    public static toggleClass(elem: Element, cn: string, val?: boolean): void {

        const doAdd = val == null ? !elem.classList.contains(cn) : val,
              fn = doAdd ? 'add' : 'remove';
        
        elem.classList[fn](cn);
    }
}
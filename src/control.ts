abstract class Control {
    
    /**
     * Toggles a class for a given element.
     * @param elem The element.
     * @param cn The class name.
     * @param val Optional override to force add/removal.
     */
    public static toggleClass(elem: Element, cn: string, val?: boolean): void {

        const doAdd = val == null ? !elem.classList.contains(cn) : val,
              fn = doAdd ? 'add' : 'remove';
        
        elem.classList[fn](cn);
    }
}
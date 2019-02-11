import { Pi } from './constants';

export abstract class Dom {
    
    public static circumference(radius: number) {
        return 2 * Pi * radius;
    }
}
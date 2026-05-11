import { makeAutoObservable } from "mobx";

export class UIStore {
    isLoading = false;
    constructor() {
         makeAutoObservable(this);
    }
    isbusy = () => {
        this.isLoading = true;
    }
    isidle = () => {
        this.isLoading = false;
    }
    
}
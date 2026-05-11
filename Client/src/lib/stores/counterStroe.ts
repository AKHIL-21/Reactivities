import {  makeAutoObservable, } from "mobx";

export default class CounterStore {
    title = 'Counter Store';
    count = 0;
    events: string[] = [
        `Intialized with count: ${this.count}`,
    ];

    constructor() {
       makeAutoObservable(this);
    }

    increment = (amount = 1) => {
        this.count += amount;
        this.events.push(`Incremented by ${amount}, new count: ${this.count}`);
    }

    decrement = (amount = 1) => {
        this.count-= amount;
        this.events.push(`Decremented by ${amount}, new count: ${this.count}`);
    }
    get eventCount() {
        return this.events.length;
    }
}

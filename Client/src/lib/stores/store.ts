import CounterStore from "./counterStroe";
import { createContext } from "react";
import { UIStore } from "./uistore";

interface Store {
    // Define the shape of your store here
    counterStore: CounterStore;
    uiStore : UIStore;
}
export const store: Store = {
    counterStore: new CounterStore(),
    uiStore: new UIStore()
}
export const StoreContext = createContext(store);


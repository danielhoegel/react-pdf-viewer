export type StoreState = Record<string, any>;
export type StoreKey<T extends StoreState> = string & keyof T;
export type StoreHandler<T> = (params: T) => void;
export interface Store<T extends StoreState> {
    subscribe<K extends StoreKey<T>>(eventName: K, handler: StoreHandler<NonNullable<T[K]>>): void;
    unsubscribe<K extends StoreKey<T>>(eventName: K, handler: StoreHandler<NonNullable<T[K]>>): void;
    update<K extends StoreKey<T>>(eventName: K, params: T[K]): void;
    updateCurrentValue<K extends StoreKey<T>>(eventName: K, updater: (currentValue: T[K]) => T[K]): void;
    get<K extends StoreKey<T>>(eventName: K): T[K] | undefined;
}

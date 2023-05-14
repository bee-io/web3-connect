export default class TimeoutCache {
    timeout;
    time
    data

    constructor(timeout) {
        this.timeout = timeout;
        this.time = new Map()
        this.data = new Map()
    }

   public set(key, value): void{
        this.time.set(key, Date.now() + this.timeout)
        this.data.set(key, value)
    }

   public get(key): any{
        if(this.data.has(key) && this.time.get(key) > Date.now() ){
            return this.data.get(key)
        }
        return undefined;
    }
}

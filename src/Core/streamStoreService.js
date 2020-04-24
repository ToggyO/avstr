class StreamStoreService {
    constructor() {
        this.nextId = 1;
        this.store = [{}];
    }

    saveStream = (stream) => {
        this.store.push({
            id: this.nextId,
            stream,
        });
        const id = this.nextId;
        this.nextId += 1;
        return id;
    };

    getStream = (id) => {
        if (!id) return null;
        const obj = this.store.find((storeObj) => storeObj.id === id);
        return obj.stream;
    }
}

const streamStoreService = new StreamStoreService();

export default streamStoreService;

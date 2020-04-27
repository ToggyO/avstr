class StreamStoreService {
    constructor() {
        this.nextId = 1;
        this.store = [{}];
    }

    saveTranslation = (stream, connection) => {
        this.store.push({
            id: this.nextId,
            stream,
            connection,
        });
        const id = this.nextId;
        this.nextId += 1;
        return id;
    };

    getStream = (id) => {
        if (!id) return null;
        const obj = this.store.find((storeObj) => storeObj.id === id);
        return obj.stream;
    };

    getConnection = (id) => {
        if (!id) return null;
        const obj = this.store.find((storeObj) => storeObj.id === id);
        return obj.connection;
    };
}

const streamStoreService = new StreamStoreService();

export default streamStoreService;

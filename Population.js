class Population {
    constructor(url) {
        this.url = url;
        this.dataLoader = new DataLoader(url);
        this.onload = () => {
            this.data = this.dataLoader.data;
        }
        this.loadData();
    }

    loadData() {
        this.dataLoader.extractData(this.onload);
    }
}
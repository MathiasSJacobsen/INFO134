class DataSet {
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

class DataLoader {
    constructor(url) {
        this.url = url;
    }

    extractData(callback) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", this.url);
        xhr.responseType = "json";
        xhr.onreadystatechange =  () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                this.data = xhr.response.elementer;
                if (callback) {
                    callback();
                }
            }
        }
        xhr.send();
    }
}

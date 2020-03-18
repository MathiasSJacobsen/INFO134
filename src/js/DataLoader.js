class DataLoader {
    constructor(url) {
        this.url = url;
    }

    extractData = (callback) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", this.url);
        xhr.responseType = "json";
        xhr.onreadystatechange =  () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                this.data = xhr.response;
                if (callback) {
                    callback();
                }
            }
        };
        xhr.send();
    }
}

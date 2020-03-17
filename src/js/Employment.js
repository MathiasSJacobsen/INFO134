class Employment {
    constructor(url) {
        this.url = url;
        this.dataLoader = new DataLoader(url);
        this.onload = () => {
            this.data = this.dataLoader.data;
        }
        this.loadData();
    }

    getLastYearMeasured(municipalityName) {
        let year = 2020;
        while (!this.data.elementer[municipalityName]["Menn"][year.toString()]) {
            year--;
        }
        return year;
    }
    
    loadData() {
        this.dataLoader.extractData(this.onload);
    }
}
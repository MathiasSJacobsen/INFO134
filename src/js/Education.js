class Education {
    constructor(url) {
        this.url = url;
        this.dataLoader = new DataLoader(url);
        this.onload = () => {
            this.data = this.dataLoader.data;
        }
        this.loadData();
    }

    getHigherEducationPercent(municipalityName) {
        let bachelorMen = this.data.elementer[municipalityName]["03a"]["Menn"]["2017"];
        let bachelorWomen = this.data.elementer[municipalityName]["03a"]["Kvinner"]["2017"];
        let masterMen = this.data.elementer[municipalityName]["04a"]["Menn"]["2017"];
        let masterWomen = this.data.elementer[municipalityName]["04a"]["Kvinner"]["2017"];
        let total = new Number(bachelorMen + bachelorWomen + masterMen + masterWomen);
        return total.toFixed(2);
    }

    getHigherEducationQuantity(municipalityName) {
        let percent = this.getHigherEducationPercent(municipalityName);
        let totalPopulation = population.getTotalPopulation(municipalityName);
        return Number(totalPopulation * percent / 100).toFixed(0);
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
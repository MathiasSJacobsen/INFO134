class Employment {
    constructor(url) {
        this.url = url;
        this.dataLoader = new DataLoader(url);
        this.onload = () => {
            this.data = this.dataLoader.data;
        }
        this.loadData();
    }

    getEmploymentPercent(municipalityName) {
        let employmentMen = this.data.elementer[municipalityName]["Menn"][this.getLastYearMeasured(municipalityName)];
        let employmentWomen = this.data.elementer[municipalityName]["Kvinner"][this.getLastYearMeasured(municipalityName)];
        let total = new Number(employmentMen + employmentWomen);
        return total.toFixed(2);
    }

    getEmploymentQuantity(municipalityName) {
        let percent = this.getEmploymentPercent(municipalityName);
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
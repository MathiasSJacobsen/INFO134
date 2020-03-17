class Employment {
    constructor(url) {
        this.url = url;
        this.dataLoader = new DataLoader(url);
        this.onload = () => {
            this.data = this.dataLoader.data;
        }
        this.loadData();
    }

    getEmploymentPercent(municipalityName, year=2018) {
        let employmentMen = this.data.elementer[municipalityName]["Menn"][year];
        let employmentWomen = this.data.elementer[municipalityName]["Kvinner"][year];
        let total = new Number(employmentMen + employmentWomen);
        return total.toFixed(2);
    }

    getEmploymentQuantity(municipalityName) {
        let percent = this.getEmploymentPercent(municipalityName);
        let totalPopulation = population.getTotalPopulation(municipalityName);
        return Number(totalPopulation * percent / 100).toFixed(0);
    }

    loadData() {
        this.dataLoader.extractData(this.onload);
    }
}
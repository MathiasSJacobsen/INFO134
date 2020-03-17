class Population {
    constructor(url) {
        this.url = url;
        this.dataLoader = new DataLoader(url);
        this.onload = () => {
            this.data = this.dataLoader.data;
            this.municipalities = this.data.elementer;
        }
        this.loadData();
    }

    /**
     * Get municipality name from municipality number
     * @param {String} municipalityNumber Number of municipality
     * @return {String} Name of municipality
     */
    getName(municipalityNumber) {
        let fourNumbers = /\d{4}/;
        if (!fourNumbers.test(municipalityNumber)) {
            alert("Not a valid municipality number");
            return;
        }
        for (let name in this.municipalities) {
            if (this.municipalities[name].kommunenummer === municipalityNumber) {
                return name;
            }
        }
        return "No municipality with that number";
    }

    getPopulationGrowth(municipalityName, from, to) {
        let totPopFrom = this.getTotalPopulation(municipalityName, from);
        let totPopTo = this.getTotalPopulation(municipalityName, to);
        return ((totPopTo - totPopFrom)/totPopFrom * 100).toFixed(2);
    }

    getTotalPopulation(municipalityName, year) {
        let men = this.data.elementer[municipalityName]["Menn"][this.getLastYearMeasured(municipalityName)];
        let women = this.data.elementer[municipalityName]["Kvinner"][this.getLastYearMeasured(municipalityName)];
        if (year) {
            men = this.data.elementer[municipalityName]["Menn"][year];
            women = this.data.elementer[municipalityName]["Kvinner"][year];
        }
        return men + women;
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
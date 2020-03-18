class Population {
    constructor(url) {
        this.url = url;
        this.dataLoader = new DataLoader(url);
        this.onload = () => {
            this.data = this.dataLoader.data;
        };
        this.loadData();
    }

    getNames() {
        const elements = this.data.elementer;
        console.log(elements);
        const names = [];
        for (let x in elements){
            names.push(x)
        }
        return names;
    }

    /**
     * Get municipality name from municipality number
     * @param {String} municipalityNumber Number of municipality
     * @return {String} Name of municipality
     */
    getName(municipalityNumber) {
        for (let municipality in this.data.elementer) {
            if (this.data.elementer[municipality.toString()]["kommunenummer"] === municipalityNumber) {
                return municipality.toString();
            }
        }
        return "No municipality with that number";
    }

    getNumber(municipalityName) {
        return this.data.elementer[municipalityName.toString()].kommunenummer;
    }

    getPopulationGrowth(municipalityName, from=2007, to=2018) {
        let totPopFrom = this.getTotalPopulation(municipalityName, from);
        let totPopTo = this.getTotalPopulation(municipalityName, to);
        return ((totPopTo - totPopFrom)/totPopFrom * 100).toFixed(2);
    }

    getTotalPopulation(municipalityName, year=2018) {
        let men = this.data.elementer[municipalityName.toString()]["Menn"][year.toString()];
        let women = this.data.elementer[municipalityName.toString()]["Kvinner"][year.toString()];
        return men + women;
    }

    loadData() {
        this.dataLoader.extractData(this.onload);
    }
}
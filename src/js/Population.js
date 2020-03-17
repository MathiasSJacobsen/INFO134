class Population {
    constructor(url) {
        this.url = url;
        this.dataLoader = new DataLoader(url);
        this.onload = () => {
            this.data = this.dataLoader.data;
        }
        this.loadData();
    }

    /**
     * Get municipality name from municipality number
     * @param {String} municipalityNumber Number of municipality
     * @return {String} Name of municipality
     */
    getName(municipalityNumber) {
        for (let name in this.data.elementer) {
            if (this.data.elementer[name]["kommunenummer"] === municipalityNumber) {
                return name.toString();
            }
        }
        return "No municipality with that number";
    }

    getNumber(municipalityName) {
        return this.data.elementer[municipalityName].kommunenummer;
    }

    getPopulationGrowth(municipalityName, from=2007, to=2018) {
        let totPopFrom = this.getTotalPopulation(municipalityName, from);
        let totPopTo = this.getTotalPopulation(municipalityName, to);
        return ((totPopTo - totPopFrom)/totPopFrom * 100).toFixed(2);
    }

    getTotalPopulation(municipalityName, year=2018) {
        let men = this.data.elementer[municipalityName]["Menn"][year];
        let women = this.data.elementer[municipalityName]["Kvinner"][year];
        return men + women;
    }

    loadData() {
        this.dataLoader.extractData(this.onload);
    }
}
class Education {
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
        let names = [];
        for (let municipality in elements){
            names.push(municipality);
        }
        return names;
    }
    
    getIDs () {
        const elements = this.data.elementer;
        let IDs = [];
        for (let municipality in elements) {
            IDs.push(elements[municipality]["kommunenummer"]);
        }
        return IDs;
    }

    getInfo(municipalityNumber){
        const elements = this.data.elementer;
        for (let municipality in elements) {
            if(elements[municipality]["kommunenummer"] === municipalityNumber) {
                let info = elements[municipality];
                info.Kommune = municipality;
                return info;
            }
        }
    }

    getEducationPercent(municipalityName, eduCat, gender, year=2017) {
        let education = this.data.elementer[municipalityName.toString()][eduCat.toString()][gender.toString()][year.toString()];
        return new Number(education).toFixed(2);
    }

    getHigherEducationPercent(municipalityName, year=2017) {
        let masterMen = new Number(this.getEducationPercent(municipalityName, "04a", "Menn", year));
        let masterWomen = new Number(this.getEducationPercent(municipalityName, "04a", "Kvinner", year));
        let bachelorMen = new Number(this.getEducationPercent(municipalityName, "03a", "Menn", year));
        let bachelorWomen = new Number(this.getEducationPercent(municipalityName, "03a", "Kvinner", year));
        let total = new Number((bachelorMen + bachelorWomen + masterMen + masterWomen)/4);
        return total.toFixed(2);
    }

    getHigherEducationQuantity(municipalityName) {
        let percent = this.getHigherEducationPercent(municipalityName);
        let totalPopulation = population.getTotalPopulation(municipalityName);
        return Number(totalPopulation * percent / 100).toFixed(0);
    }

    loadData() {
        this.dataLoader.extractData(this.onload);
    }

    getCategory(ID) {
        return this.data.datasett.kategorier[ID];
    }

}
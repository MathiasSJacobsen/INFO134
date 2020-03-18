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
        for (let x in elements){
            names.push(x)
        }
        return names;
    }
    
    getIDs () {
        const elements = this.data.elementer;
        let IDs = [];
        for (let x in elements) {
            IDs.push(elements[x]["kommunenummer"]);
        }
        return IDs;
    }

    getInfo(municipalityNumber){
        const elements = this.data.elementer;
        for (let x in elements) {
            if(elements[x]["kommunenummer"] === municipalityNumber) {
                return elements[x];
            }
        }

    }

    getHigherEducationPercent(municipalityName, year=2017) {
        let masterMen = this.data.elementer[municipalityName.toString()]["04a"]["Menn"][year.toString()];
        let masterWomen = this.data.elementer[municipalityName.toString()]["04a"]["Kvinner"][year.toString()];
        let bachelorMen = this.data.elementer[municipalityName.toString()]["03a"]["Menn"][year.toString()] - masterMen;
        let bachelorWomen = this.data.elementer[municipalityName.toString()]["03a"]["Kvinner"][year.toString()] - masterWomen;
        let total = bachelorMen + bachelorWomen + masterMen + masterWomen;
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
}
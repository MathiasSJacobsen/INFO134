class Employment {
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
        const names = [];
        for (let municipality in elements){
            names.push(municipality);
        }
        return names;
    }

    getIDs() {
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
                const info = {
                    Kommune : municipality,
                    BeggeKjønn: elements[municipality]["Begge kjønn"],
                    Menn: elements[municipality]["Menn"],
                    Kvinner : elements[municipality]["Kvinner"],
                    Kommunenummer: municipalityNumber
                };
                
                return info;
            }
        }
    }

    getEmploymentPercent(municipalityName, year=2018) {
        let employmentMen = this.data.elementer[municipalityName.toString()]["Menn"][year.toString()];
        let employmentWomen = this.data.elementer[municipalityName.toString()]["Kvinner"][year.toString()];
        let total = new Number((employmentMen + employmentWomen)/2);
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
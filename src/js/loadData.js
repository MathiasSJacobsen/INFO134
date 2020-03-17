// https://drive.google.com/file/d/1kk9p89nFm-I8T_R87PzlUv0TPAwgzUJY/view?usp=sharing

let populationURL = new URL('http://wildboy.uib.no/~tpe056/folk/104857.json');
let employmentURL = new URL('http://wildboy.uib.no/~tpe056/folk/100145.json');
let educationURL = new URL('http://wildboy.uib.no/~tpe056/folk/85432.json');


let population = new Population(populationURL);

let bool = true

function antallfolk() {
    if (bool) {
        let municipalities = population.data.elementer;
        for (let municipality in municipalities) {
            let tRow = document.createElement("tr")
            tRow.innerHTML = `<td>${municipality}</td>
                              <td>${population.getNumber(municipality)}</td>
                              <td>${population.getTotalPopulation(municipality)}
                              <td>${population.getPopulationGrowth(municipality) + "%"}</td></td>`
            document.getElementById("Oversikt").appendChild(tRow);
        }
        bool = false
    }
}


let employment = new Employment(employmentURL);
let education = new Education(educationURL);




function toggleHidden(id) {
    let x = document.getElementById(id);
    if (x.hidden) {
        let intro = document.getElementById("intro")
        let oversikt = document.getElementById("oversiktDiv")
        let details = document.getElementById("detailsDiv")
        let detailsTable = document.getElementById("detailTable");
        //let sammenligning = document.getElementById("sammenligningDiv")

        intro.hidden = true
        oversikt.hidden = true;
        details.hidden = true
        detailsTable.hidden = true;
        //sammenligning.hidden = true

        x.hidden = false;
    }
}

function clearDetails() {
    let tBody = document.getElementById("detailBody");
    tBody.innerHTML="";
}

function getDetails() {
    let number = document.getElementById("detailNumber").value;
    if (!validNumber(number)) {
        alert("Not a valid municipality number");
        return;
    }
    let name = population.getName(number);
    let totalPopulation = population.getTotalPopulation(name);
    let populationGrowth = population.getPopulationGrowth(name);
    let higherEducationQuantity = education.getHigherEducationQuantity(name);
    let higherEducationPercent = education.getHigherEducationPercent(name);

    clearDetails();
    let tRow = document.createElement("tr")
    tRow.innerHTML = `<td>${name}</td>
                      <td>${number}</td>
                      <td>${totalPopulation}</td>
                      <td>${populationGrowth + "%"}</td>
                      <td>${higherEducationQuantity} (${higherEducationPercent}%)</td>`
    document.getElementById("detailBody").appendChild(tRow);

    document.getElementById("detailTable").hidden = false;
}

function validNumber(municipalityNumber) {
    for (let municipality in population.data.elementer) {
        if (population.data.elementer[municipality].kommunenummer === municipalityNumber) {
            return true;
        }
    }
    return false;
}

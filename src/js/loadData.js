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
            tRow.innerHTML = `<td>${municipality}</td> <td>${population.getNumber(municipality)}</td> <td>${population.getTotalPopulation(municipality)} <td>${population.getPopulationGrowth(municipality) + "%"}</td></td>`
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
        //let detaljer = document.getElementById("detaljerDiv")
        //let sammenligning = document.getElementById("sammenligningDiv")

        intro.hidden = true
        oversikt.hidden = true;
        //detaljer.hidden = true
        //sammenligning.hidden = true

        x.hidden = false;
    }
}

function details(municipalityNumber) {
    let number = municipalityNumber;
    let name = population.getName(number);
    let higherEducationQuantity = education.getHigherEducationQuantity(name);
    let higherEducationPercent = education.getHigherEducationPercent(name);
    console.log("Name: " + name);
    console.log("Number: " + number);
    console.log("Higher education: " + higherEducationQuantity + " (" + higherEducationPercent + "%)");
    
    return "Name: " + name + ", Number: " + number + ", Higher education: " + higherEducationQuantity + " (" + higherEducationPercent + "%)";
    
}

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

/**
 * Hides the content that wasnt clicked on, and puts that content on the screen.
 * Finds all content of the docment and hides it then unhide the decided content on to the screen.
 * @param {String} id To the content that should be displayed
 */
function toggleHidden(id) {
    let content = document.getElementsByClassName("content");
    for (i=0; i < content.length; i++) {
        content.item(i).hidden = true;
    }
    document.getElementById(id).hidden = false;
}

function clearDetails() {
    let tBody = document.getElementById("detailBody");
    tBody.innerHTML="";
}

function getDetails() {
    let number = document.getElementById("detailNumber").value;
    if (!validNumber(number)) {
        if (!validName(number)) {
            alert("Ugyldig nummer/navn");
            return;
        }
        number = population.getNumber(getFullName(number));
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

function validName(municipalityName) {
    for (let municipality in population.data.elementer) {
        if (municipality.split(" ")[0] === municipalityName) {
            return true;
        }
    }
    return false;
}

function getFullName(municipalityName) {
    for (let municipality in population.data.elementer) {
        if (municipality.split(" ")[0] === municipalityName) {
            return municipality;
        }
    }
}

function validNumber(municipalityNumber) {
    for (let municipality in population.data.elementer) {
        if (population.data.elementer[municipality].kommunenummer === municipalityNumber) {
            return true;
        }
    }
    return false;
}
//TODO: HVORFOR FUNKER IKKE DETTE?
let input = document.getElementById("detailNumber");

input.addEventListener("keyup", function(event){
    if (event.keyCode === 13){
        document.getElementById("detailButton").click();
        console.log("hmmm");
        
    }
});

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
    document.getElementById("detailOverview").innerHTML="";
    document.getElementById("detailTableBody").innerHTML="";
}

function getDetails() {
    let value = document.getElementById("detailNumber").value;

    if (!validNumber(value)) {
        if (!validName(value)) {
            alert("Ugyldig nummer/navn");
            return;
        }
        value = population.getNumber(getFullName(value));
    }

    clearDetails();
    makeDetailOverview(value);
    makeDetailYearTable(value);
}

function makeDetailOverview(value) {
    let number = value;
    let name = population.getName(number);
    let totalPopulation = population.getTotalPopulation(name);
    let populationGrowth = population.getPopulationGrowth(name);
    let higherEducationQuantity = education.getHigherEducationQuantity(name);
    let higherEducationPercent = education.getHigherEducationPercent(name);

    let overview = document.getElementById("detailOverview");
    
    let nameElement = document.createElement("b");
    let infoELement = document.createElement("p");

    nameElement.innerHTML = "<br>" + name;
    infoELement.innerHTML = "Kommunenummer: " + number + "<br>" +
                            "Befolkning: " + totalPopulation + "<br>" + 
                            "Befolkningsvekst: " + populationGrowth + "%<br>" +
                            "Utdanning: " + higherEducationQuantity + " (" + higherEducationPercent + "%)";
    overview.appendChild(nameElement);
    overview.appendChild(infoELement);
}

function makeDetailYearTable(number) {
    let municipality = population.getName(number);
    let tableBody = document.getElementById("detailTableBody");
    console.log(tableBody);
    
    for (let year = 2007; year < 2018; year++) {

        let trow = document.createElement("tr");

        let yearElement = document.createElement("td");
        let populationELement = document.createElement("td");
        let employmentElement = document.createElement("td");
        let educationElement = document.createElement("td");

        yearElement.innerHTML = year;
        populationELement.innerHTML = population.getTotalPopulation(municipality, year);
        employmentElement.innerHTML = employment.getEmploymentPercent(municipality, year) + "%";
        educationElement.innerHTML = education.getHigherEducationPercent(municipality, year) + "%";

        trow.appendChild(yearElement);
        trow.appendChild(populationELement);
        trow.appendChild(employmentElement);
        trow.appendChild(educationElement);

        tableBody.appendChild(trow);
    }
}

function validName(municipalityName) {
    for (let municipality in population.data.elementer) {
        if (municipality.split(" ")[0].toLowerCase() === municipalityName.toLowerCase()) {
            return true;
        }
    }
    return false;
}

function getFullName(municipalityName) {
    for (let municipality in population.data.elementer) {
        if (municipality.split(" ")[0].toLowerCase() === municipalityName.toLowerCase()) {
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

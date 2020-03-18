// https://drive.google.com/file/d/1kk9p89nFm-I8T_R87PzlUv0TPAwgzUJY/view?usp=sharing

let populationURL = new URL("http://wildboy.uib.no/~tpe056/folk/104857.json");
let employmentURL = new URL("http://wildboy.uib.no/~tpe056/folk/100145.json");
let educationURL = new URL("http://wildboy.uib.no/~tpe056/folk/85432.json");

let population = new Population(populationURL);
let employment = new Employment(employmentURL);
let education = new Education(educationURL);

function validNumber(municipalityNumber) {
    for (let municipality in population.data.elementer) {
        if (population.data.elementer[municipality.toString()].kommunenummer === municipalityNumber) {
            return true;
        }
    }
    return false;
}

let bool = true;

function makeOverviewTable() {
    if (bool) {
        let municipalities = population.data.elementer;
        for (let municipality in municipalities) {
            let tRow = document.createElement("tr");
            tRow.innerHTML = `<td>${municipality}</td>
                                <td>${population.getNumber(municipality)}</td>
                                <td>${population.getTotalPopulation(municipality)}
                                <td>${population.getPopulationGrowth(municipality) + "%"}</td></td>`;
            document.getElementById("overviewTable").appendChild(tRow);
        }
        bool = false;
    }
}

/**
 * Hides the content that wasnt clicked on, and puts that content on the screen.
 * Finds all content of the docment and hides it then unhide the decided content on to the screen.
 * @param {String} id To the content that should be displayed
 */
function toggleHidden(id) {
    let content = document.getElementsByClassName("content");
    for (let i = 0; i < content.length; i++) {
        content.item(i).hidden = true;
    }
    document.getElementById(id).hidden = false;
}

function clearDetails() {
    document.getElementById("detailOverview").innerHTML="";
    document.getElementById("detailTableHead").innerHTML="";
    document.getElementById("detailTableBody").innerHTML="";
}

function makeDetailOverview(number) {
    let name = population.getName(number);
    let totalPopulation = population.getTotalPopulation(name);
    let populationGrowth = population.getPopulationGrowth(name);
    let higherEducationQuantity = education.getHigherEducationQuantity(name);
    let higherEducationPercent = education.getHigherEducationPercent(name);

    let overview = document.getElementById("detailOverview");
    
    let nameElement = document.createElement("b");
    let infoELement = document.createElement("p");

    nameElement.appendChild(document.createTextNode(name));
    infoELement.appendChild(document.createTextNode("Kommunenummer: " + number));
    infoELement.appendChild(document.createElement("br"));
    infoELement.appendChild(document.createTextNode("Befolkning: " + totalPopulation));
    infoELement.appendChild(document.createElement("br"));
    infoELement.appendChild(document.createTextNode("Befolkningsvekst: " + populationGrowth + "%"));
    infoELement.appendChild(document.createElement("br"));
    infoELement.appendChild(document.createTextNode("Utdanning: " + higherEducationQuantity + " (" + higherEducationPercent + "%)"));

    overview.appendChild(nameElement);
    overview.appendChild(infoELement);
}

function makeDetailYearTable(number) {
    let municipality = population.getName(number);
    let tableBody = document.getElementById("detailTableBody");
    let tableHeadRow = document.createElement("tr");
    let yearHeadElement = document.createElement("th");
    let popHeadElement = document.createElement("th");
    let empHeadElement = document.createElement("th");
    let eduHeadElement = document.createElement("th");

    yearHeadElement.appendChild(document.createTextNode("År"));
    popHeadElement.appendChild(document.createTextNode("Befolkning"));
    empHeadElement.appendChild(document.createTextNode("Sysselsatte"));
    eduHeadElement.appendChild(document.createTextNode("Utdannede"));
    
    tableHeadRow.appendChild(yearHeadElement);
    tableHeadRow.appendChild(popHeadElement);
    tableHeadRow.appendChild(empHeadElement);
    tableHeadRow.appendChild(eduHeadElement);

    tableBody.appendChild(tableHeadRow);

    
    
    for (let year = 2007; year < 2018; year++) {

        let tableBodyRow = document.createElement("tr");

        let yearBodyElement = document.createElement("td");
        let popBodyElement = document.createElement("td");
        let empBodyElement = document.createElement("td");
        let eduBodyElement = document.createElement("td");

        yearBodyElement.appendChild(document.createTextNode(year));
        popBodyElement.appendChild(document.createTextNode(population.getTotalPopulation(municipality, year)));
        empBodyElement.appendChild(document.createTextNode(employment.getEmploymentPercent(municipality, year) + "%"));
        eduBodyElement.appendChild(document.createTextNode(education.getHigherEducationPercent(municipality, year) + "%"));

        tableBodyRow.appendChild(yearBodyElement);
        tableBodyRow.appendChild(popBodyElement);
        tableBodyRow.appendChild(empBodyElement);
        tableBodyRow.appendChild(eduBodyElement);

        tableBody.appendChild(tableBodyRow);
    }
}

function getDetails() {
    let number = document.getElementById("detailNumber").value;
    if (!validNumber(number)) {
        alert("Ugyldig nummer");
        return;
    }

    clearDetails();
    makeDetailOverview(number);
    makeDetailYearTable(number);
}

window.onload = function() {
    const input = this.document.getElementById("detailNumber");
    const button = this.document.getElementById("detailButton");
    
    input.addEventListener("keyup", function(event) {
        
        if (event.keyCode === 13) {            
            button.click();
        }
    });
}

function getEducationStats(municipalityNumber, nr) {
    let municipality = population.getName(municipalityNumber);

    let table = document.getElementById("municipalityOne");

    if (nr === 2) {
        table = document.getElementById("municipalityTwo");
    }


    let caption = document.createElement("caption");
    let tableRow = document.createElement("tr");
    let catHeadElement = document.createElement("th");
    let menHeadElement = document.createElement("th");
    let womenHeadElement = document.createElement("th");

    caption.appendChild(document.createTextNode(municipality))
    catHeadElement.appendChild(document.createTextNode("Kategori"));
    menHeadElement.appendChild(document.createTextNode("Menn"));
    womenHeadElement.appendChild(document.createTextNode("Kvinner"));
    
    table.appendChild(caption);
    tableRow.appendChild(catHeadElement);
    tableRow.appendChild(menHeadElement);
    tableRow.appendChild(womenHeadElement);

    table.appendChild(tableRow);
}

function compare(){

    const input1 = document.getElementById("compareInput1").value;
    const input2 = document.getElementById("compareInput2").value;

    if (!validNumber(input1)) {
            alert("Ugyldig nummer på første søkefelt");
            return;
        }
    if (!validNumber(input2)) {
        alert("Ugyldig nummer på andre søkefelt");
        return;
    }

    getEducationStats(input1, 1);
    getEducationStats(input2, 2);

}

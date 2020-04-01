/**
 * Get latest details and table with details for last 10 years
 */
function getDetails() {
    let municipalityNumber = document.getElementById("detailInput").value;
    if (!validNumber(municipalityNumber)) {
        alert("Ugyldig nummer");
        return;
    }

    clearDetails();
    makeDetailOverview(municipalityNumber);
    makeDetailYearTable(municipalityNumber);
}

/**
 * Check if municipality municipalityNumber is correct
 * @param {Number} municipalityNumber 
 */
function validNumber(municipalityNumber) {
    for (let municipality in population.getIDs()) {
        if (population.getIDs()[municipality] === municipalityNumber) {
            return true;
        }
    }
    return false;
}

/**
 * Remove details
 */
function clearDetails() {
    document.getElementById("detailOverview").innerHTML = "";
    document.getElementById("detailTableHead").innerHTML = "";
    document.getElementById("detailTableBody").innerHTML = "";
}

/**
 * Make overview of latest municipality details
 * @param {Number} municipalityNumber 
 */
function makeDetailOverview(municipalityNumber) {
    let name = population.getName(municipalityNumber);
    let totalPopulation = population.getTotalPopulation(name);
    let populationGrowth = population.getPopulationGrowth(name);
    let higherEducationQuantity = education.getHigherEducationQuantity(name);
    let higherEducationPercent = education.getHigherEducationPercent(name);
    let employmentQuantity = employment.getEmploymentQuantity(name);
    let employmentPercent = employment.getEmploymentPercent(name);

    let overview = document.getElementById("detailOverview");

    let nameElement = document.createElement("b");
    let infoELement = document.createElement("p");

    nameElement.appendChild(document.createTextNode(name));
    infoELement.appendChild(document.createTextNode("Kommunenummer: " + municipalityNumber));
    infoELement.appendChild(document.createElement("br"));
    infoELement.appendChild(document.createTextNode("Befolkning: " + totalPopulation + " (2018)"));
    infoELement.appendChild(document.createElement("br"));
    infoELement.appendChild(document.createTextNode("Sysselsatte: " + employmentQuantity + " / " + employmentPercent + " % (2018)"));
    infoELement.appendChild(document.createElement("br"));
    infoELement.appendChild(document.createTextNode("Utdanning: " + higherEducationQuantity + " / " + higherEducationPercent + "% (2017)"));

    overview.appendChild(nameElement);
    overview.appendChild(infoELement);
}

/**
 * Make table with municipality details
 * @param {Number} municipalityNumber 
 */
function makeDetailYearTable(municipalityNumber) {
    let municipality = population.getName(municipalityNumber);
    let tableBody = document.getElementById("detailTableBody");
    let tableHeadRow = document.createElement("tr");
    tableHeadRow.id = "row"
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



    for (let year = 2017; year > 2006; year--) {

        let tableBodyRow = document.createElement("tr");
        tableBodyRow.id = "row"
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
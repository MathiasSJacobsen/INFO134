/**
 * Compare education stats for two municipalities
 */
function compare() {

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

    clearCompare();
    getEducationStats(input1, 1);
    getEducationStats(input2, 2);
    let winner = "";
    if (getWinner(input1, input2)) {
        winner = getWinner(input1, input2) + " har høyest score i flest kategorier";
    } else {
        winner = "Kommunene har like høy score"
    }
    let winnerNode = document.createTextNode(winner);
    document.getElementById("compareWinner").appendChild(winnerNode);
}

/**
 * Remove tables on compare page
 */
function clearCompare() {
    document.getElementById("municipalityOne").innerHTML="";
    document.getElementById("municipalityTwo").innerHTML="";
    document.getElementById("compareWinner").innerHTML="";
}

/**
 * Make table with education stats
 * @param {Number} municipalityNumber 
 * @param {Number} nr first or second municipality
 */
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

    for (let cat in education.data.elementer[municipality]) {

        if (cat === "kommunenummer") {
            continue;
        }
        let tRow = document.createElement("tr");

        let catElement = document.createElement("td");
        let menElement = document.createElement("td");
        let womenElement = document.createElement("td");

        catElement.appendChild(document.createTextNode(cat + ": " + education.getCategory(cat)));
        menElement.appendChild(document.createTextNode(education.getEducationPercent(municipality, cat, "Menn") + "%"));
        womenElement.appendChild(document.createTextNode(education.getEducationPercent(municipality, cat, "Kvinner") + "%"));

        tRow.appendChild(catElement);
        tRow.appendChild(menElement);
        tRow.appendChild(womenElement);

        table.appendChild(tRow);
    }
}

/**
 * Return the municipality with highest education score, or undefined if it's a tie
 * @param {Number} mun1number First municipality
 * @param {Number} mun2number Second municipality
 */
function getWinner(mun1number, mun2number) {
    let mun1name = population.getName(mun1number);
    let mun2name = population.getName(mun2number);
    let mun1points = 0;
    let mun2points = 0;
    for(let cat in education.data.elementer[mun1name]){
        if (cat === "kommunenummer") {
            continue;
        }
        if (new Number(education.getEducationPercent(mun1name, cat, "Menn")) > new Number(education.getEducationPercent(mun2name, cat, "Menn"))) {
            makeWinnerFat("municipalityOne", cat, 1);
            mun1points++;
        } else if (new Number(education.getEducationPercent(mun1name, cat, "Menn")) < new Number(education.getEducationPercent(mun2name, cat, "Menn"))){
            makeWinnerFat("municipalityTwo", cat, 1);
            mun2points++;
        }
        if (new Number(education.getEducationPercent(mun1name, cat, "Kvinner")) > new Number(education.getEducationPercent(mun2name, cat, "Kvinner"))) {
            makeWinnerFat("municipalityOne", cat, 2);
            mun1points++;
        } else if (new Number(education.getEducationPercent(mun1name, cat, "Kvinner")) < new Number(education.getEducationPercent(mun2name, cat, "Kvinner"))) {
            makeWinnerFat("municipalityTwo", cat, 2);
            mun2points++;
        }
    }
    if (mun1points > mun2points) {
        return mun1name;
    } else if (mun1points < mun2points){
        return mun2name;
    } else {
        return undefined;
    }
}

/**
 * Makes a the winner string fat
 * @param {String} table witch of the two municipality tables won
 * @param {String} cat Is the education categori
 * @param {Number} gender is the position of the gender object in the row, 1 = Male, 2 = Female 
 */
function makeWinnerFat(table, cat, gender){
    let winnerRow = document.getElementById(table).rows;
    for (let i = 0; i < winnerRow.length; i++){
        let winnerCat = winnerRow[i].cells["0"].textContent; 
        if (winnerCat.substr(0,cat.length) === cat) {
            winnerRow[i].cells[gender].style.fontWeight = "900";
       }
    }
    return winnerRow;
}
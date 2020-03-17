// https://drive.google.com/file/d/1kk9p89nFm-I8T_R87PzlUv0TPAwgzUJY/view?usp=sharing

let befolkningURL = new URL('http://wildboy.uib.no/~tpe056/folk/104857.json');
let sysselsatteURL = new URL('http://wildboy.uib.no/~tpe056/folk/100145.json');
let utdanningURL = new URL('http://wildboy.uib.no/~tpe056/folk/85432.json');

let population = new Population(befolkningURL);

let bool = true

function antallfolk() {
    if (bool) {
        let liste = population.data.elementer
        console.log(liste)
        for (let i in liste) {
            let tRow = document.createElement("tr")
            let totalBefolkning2007 = liste[i].Menn[2007] + liste[i].Kvinner[2007]
            let totalBefolkning2018 = liste[i].Menn[2018] + liste[i].Kvinner[2018]
            tRow.innerHTML = `<td>${i}</td> <td>${totalBefolkning2018}</td> <td>${liste[i].kommunenummer} <td>${((totalBefolkning2018 - totalBefolkning2007)/totalBefolkning2007 * 100).toFixed(2) + "%"}</td></td>`
            document.getElementById("Oversikt").appendChild(tRow);
        }
        bool = false
    }
}




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
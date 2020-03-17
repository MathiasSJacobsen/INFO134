// https://drive.google.com/file/d/1kk9p89nFm-I8T_R87PzlUv0TPAwgzUJY/view?usp=sharing

let befolkningURL = new URL('http://wildboy.uib.no/~tpe056/folk/104857.json');
let sysselsatteURL = new URL('http://wildboy.uib.no/~tpe056/folk/100145.json');
let utdanningURL = new URL('http://wildboy.uib.no/~tpe056/folk/85432.json');


let population = new Population(befolkningURL);


function antallfolk() {
    document.write("<table>");
    document.write("<th>Kommune</th><th>Antall innbyggere</th><th>Kommunenummer</th>")
    let liste = population.data.elementer
    for (let i in liste) {
        document.write("<tr>")
        document.write(`<td>${i}</td>`)
        document.write(`<td>${liste[i].Menn[2018] + liste[i].Kvinner[2018]}</td>`)
        document.write(`<td>${liste[i].kommunenummer}</td>`)
        document.write("</tr>")

    }
    document.write("</table>");
}


function cl() {
    document.body.innerHTML = ''
}

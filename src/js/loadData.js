// https://drive.google.com/file/d/1kk9p89nFm-I8T_R87PzlUv0TPAwgzUJY/view?usp=sharing

let populationURL = new URL('http://wildboy.uib.no/~tpe056/folk/104857.json');
let employmentURL = new URL('http://wildboy.uib.no/~tpe056/folk/100145.json');
let educationURL = new URL('http://wildboy.uib.no/~tpe056/folk/85432.json');

let population = new Population(populationURL);
let employment = new Employment(employmentURL);
let education = new Education(educationURL);

function antallfolk() {
    document.write("<table>");
    document.write("<th>Kommune</th><th>Antall innbyggere</th><th>Kommunenummer</th>")
    let kommune = population.data.elementer
    for (let i in kommune) {
        document.write("<tr>")
        document.write(`<td>${i}</td>`)
        document.write(`<td>${parseInt(kommune[i].Menn[2018]) + parseInt(kommune[i].Kvinner[2018])}</td>`)
        document.write(`<td>${kommune[i].kommunenummer}</td>`)
        document.write("</tr>")

    }
    document.write("</table>");
}


function cl() {
    document.body.innerHTML = ''
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

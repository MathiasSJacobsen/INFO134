let befolkningURL = new URL('http://wildboy.uib.no/~tpe056/folk/104857.json');
let sysselsatteURL = new URL('http://wildboy.uib.no/~tpe056/folk/100145.json');
let utdanningURL = new URL('http://wildboy.uib.no/~tpe056/folk/85432.json');

let responseObj;

//xhr.open("GET", befolkningURL);
//xhr.responseType = 'json';
//xhr.send();
//xhr.onload = function() {
//  responseObj = xhr.response;
//console.log(responseObj.elementer);
//let befolkning = xhr.response;
//console.log(JSON.parse(responseObj)["elementer"]);
//};

//let data;

function load(url) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", befolkningURL);
    xhr.responseType = "json";
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.response)
            data = xhr.response
            xhr.response
        }
    }
    xhr.send();
}



let datasett = load(befolkningURL)


function antallfolk() {
    document.write("<table>");
    document.write("<th>Kommune</th><th>Antall innbyggere</th><th>Kommunenummer</th>")
    for (let i in data.elementer) {
        //console.log(i + " har " + (parseInt(data.elementer[i].Menn[2018]) + parseInt(data.elementer[i].Kvinner[2018])) + " inbyggere, og kommunenummeret er " + data.elementer[i].kommunenummer)
        document.write("<tr>")
        document.write(`<td>${i}</td>`)
        document.write(`<td>${parseInt(data.elementer[i].Menn[2018]) + parseInt(data.elementer[i].Kvinner[2018])}</td>`)
        document.write(`<td>${data.elementer[i].kommunenummer}</td>`)
        document.write("</tr>")

    }
    document.write("</table>");
}


function cl() {
    document.body.innerHTML = ''
}




















// xhr.open("GET", sysselsatteURL);
// xhr.send();
// xhr.onload = function() {
//     let responseObj = xhr.response;

// };

// xhr.open("GET", utdanningURL);
// xhr.send();
// xhr.onload = function() {
//     let responseObj = xhr.response;

// };


function befolkning() {
    console.log(this.responseObj);
}

befolkning();




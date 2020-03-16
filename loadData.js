let befolkningURL = new URL('http://wildboy.uib.no/~tpe056/folk/104857.json');
let sysselsatteURL = new URL('http://wildboy.uib.no/~tpe056/folk/100145.json');
let utdanningURL = new URL('http://wildboy.uib.no/~tpe056/folk/85432.json');

let xhr = new XMLHttpRequest();

xhr.open("GET", befolkningURL);
xhr.send();
xhr.onload = function() {
    let responseObj = xhr.response;
    console.log(responseObj);
};

xhr.open("GET", sysselsatteURL);
xhr.send();
xhr.onload = function() {
    let responseObj = xhr.response;
    console.log(responseObj);
};

xhr.open("GET", utdanningURL);
xhr.send();
xhr.onload = function() {
    let responseObj = xhr.response;
    console.log(responseObj);
};






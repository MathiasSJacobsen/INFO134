// https://drive.google.com/file/d/1kk9p89nFm-I8T_R87PzlUv0TPAwgzUJY/view?usp=sharing

let befolkningURL = new URL('http://wildboy.uib.no/~tpe056/folk/104857.json');
let sysselsatteURL = new URL('http://wildboy.uib.no/~tpe056/folk/100145.json');
let utdanningURL = new URL('http://wildboy.uib.no/~tpe056/folk/85432.json');

let xhr = new XMLHttpRequest();
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

function CBefolkning(URL) {
    xhr.open("GET", URL);
    xhr.responseType = "json";
    xhr.send();
    let responseBefolkning;
    xhr.onload = function() {
        this.responseBefolkning = xhr.response;
        //console.log(responseBefolkning);
        
    }
      getnames = function() {
        responseBefolkning.elementer.forEach(element => {
            console.log(element);
            
        });
        responseBefolkning.elementer
    }
};

let befolkningJSON = CBefolkning(befolkningURL);
befolkningJSON.getames;























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




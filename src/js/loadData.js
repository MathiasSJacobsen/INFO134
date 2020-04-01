// https://drive.google.com/file/d/1kk9p89nFm-I8T_R87PzlUv0TPAwgzUJY/view?usp=sharing

let populationURL = new URL("http://wildboy.uib.no/~tpe056/folk/104857.json");
let employmentURL = new URL("http://wildboy.uib.no/~tpe056/folk/100145.json");
let educationURL = new URL("http://wildboy.uib.no/~tpe056/folk/85432.json");

let population = new Population(populationURL);
let employment = new Employment(employmentURL);
let education = new Education(educationURL);

/**
 * The loading message should be removed after the education element is loaded. Since that is the last one to be loaded.
 */
function removeLoadingMessage(){
    if (typeof education === "object" && typeof education.data === "object"){
        toggleHidden("intro")
    } else {
        setTimeout(() => {
            removeLoadingMessage()
        }, 10);
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

/**
 * Adds that the user can use 'enter' on submit-buttons
 */
window.onload = function () {
    removeLoadingMessage();
    makeOverviewTable();
    const detailInput = this.document.getElementById("detailInput");
    const detailButton = this.document.getElementById("detailButton");

    detailInput.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            detailButton.click();
        }
    });

    const compareInput1 = this.document.getElementById("compareInput1");
    const compareInput2 = this.document.getElementById("compareInput2");
    const compareButton = this.document.getElementById("compareButton");

    compareInput1.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            compareButton.click();
        }
    });

    compareInput2.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            compareButton.click();
        }
    });
}

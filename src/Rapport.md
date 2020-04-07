# Rapport

1. In our program the datasets are not downloaded at the same time. XMLHttpRequset is not synchronous, this means that the function gives a callback when all data is recieved. The data is loaded in line 5-7 in `LoadData.js`, that makes the three objects with the data. They all have their own constructor. This is since one of them had a bit different setup than the two others.

2. On line 17 in `LoadData.js` we check if all the objects to the datasets are loaded, and if they are that means that the datasets have been downloaded. We had to put in a set timeout (10 ms) to handle the `Uncaught RangeError: Maximum call stack size exceeded`.

3. We are using @media in our CSS to check if the size of the screen is below 700 pixels and if so display the content vertically, and if not horizontally. (we decided ourselves that 700 pixels and less is a small screen)
```css
@media (max-width:700px){
    #row, #compareSpan {
        display: flex;
        flex-direction: column;
    }
}
```

4. The three datasets doesn't have the same amount of municipalities. The education data have more municipalities than the other two. Used a `Python`-program that counted all municipalities in each set. The education set had more then the rest. Lardal is an example of a municipality that exists in the third dataset, but not in the other two.

# Beskrivelse av filer

DataLoader.js:
    Klasse som laster ned et datasett gitt en URL
Population.js:
    Klasse som bruker DataLoader til å lagre befolkning-datasettet.
    Har funksjoner for å hente ut total befolkning og befolkningsvekst.
Education.js
    Klasse som bruker DataLoader til å lagre utdanning-datasettet.
    Har funksjoner som henter prosent eller antall høyere utdannet gitt kommunen, og utdanningsprosent gitt kommune, kategori og kjønn.
Employment.js
    Klasse som bruker DataLoader til å lagre sysselsatte-datasettet.
    Har funksjoner som henter prosent eller antall sysselsatte gitt kommune.
Overview.js
    Lager oversiktstabell med kommunenavn, kommunenummer, befolkning og befolkningsvekst.
Details.js
    Lager oversikt over siste data, og en tabell med data for siste 10 årene.
Compare.js
    Henter utdanningsdata for to kommuner, lager tabell for begge og kårer den kommunen med høyest score i flest kategorier som vinner.
loadData.js
    Lager datasett med de tre konstruktørene, og har funksjon for å vise riktig side gitt hvilken knapp man trykker.
index.js
    Viser ritkig innhold. Mesteparten av innholdet blir tilskrevet i Compare.js, Overview.js og Details.js
# Rapport

1. 

2. På linje 17 i `loadData.js` sjekker vi om objektene til datasettene er laget, og hvis de har blitt lagd så har datasettene blitt lastet ned. Måtte putte inn en set timeout på 10 ms for å ungå `Uncaught RangeError: Maximum call stack size exceeded`.

3. Vi 

4. De tre datasettene har ikke samme antall kommuner. Utdanningssettet inneholder kommuner som ikke de to andre har. Kjørte et `Python` program som gikk gjennom alle tre settene og telte opp alle elementene (kommuner).

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
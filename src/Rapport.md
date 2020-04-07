# Rapport

1. 

2. På linje 17 i `loadData.js` sjekker vi om objektene til datasettene er laget, og hvis de har blitt lagd så har datasettene blitt lastet ned. Måtte putte inn en set timeout på 10 ms for å ungå `Uncaught RangeError: Maximum call stack size exceeded`.

3. 

4. De tre datasettene har ikke samme antall kommuner. Utdanningssettet inneholder kommuner som ikke de to andre har. Kjørte et `Python` program som gikk gjennom alle tre settene og telte opp alle elementene (kommuner).
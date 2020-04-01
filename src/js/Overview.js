/**
 * Make overview table for all municipalities
 */
function makeOverviewTable() {
    if (typeof population.data === 'object') {
        let municipalities = population.data.elementer;
        for (let municipality in municipalities) {
            let tRow = document.createElement("tr");
            tRow.id = "row"
            tRow.innerHTML = `<td>${municipality}</td>
                                <td>${population.getNumber(municipality)}</td>
                                <td>${population.getTotalPopulation(municipality)}
                                <td>${population.getPopulationGrowth(municipality) + "%"}</td></td>`;
            document.getElementById("table").appendChild(tRow);
        }
        return
    }
    else {
        setTimeout(() => {
            makeOverviewTable()
        }, 200);
    }
}
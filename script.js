function addNewTableRow() {
    var tbl = document.getElementById("main_ticker_list");

    // Add a new row
    let newRow = document.createElement('tr');
    tbl.appendChild(newRow);
}


//setInterval(getCurrentPrice, 10000);

function getCurrentPrice() {
    var tbl = document.getElementById("main_ticker_list");

    for (let i = 1; i < tbl.rows.length; i++) {
        alert("Reading Ticker row " + tbl.rows[i].cells[0].innerText);
        
    }
}

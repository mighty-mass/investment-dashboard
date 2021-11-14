
function addNewTableRow() {
    var tbl = document.getElementById("main_ticker_list");

    // Add a new row
    let newRow = document.createElement('tr');
    newRow.insertCell(0);
    newRow.cells[0].innerHTML += "<input type=\"text\" value=\"BTC\" />";
    newRow.insertCell(1);
    newRow.cells[1].innerHTML += "<input type=\"number\" step=\"0.01\" value=\"0\" />";
    newRow.insertCell(2);
    newRow.cells[2].innerHTML += "<input type=\"number\" step=\"0.01\" value=\"0\" />";
    newRow.insertCell(3);
    newRow.cells[3].innerHTML += ""
    newRow.insertCell(4);
    newRow.cells[4].innerHTML += ""

    tbl.appendChild(newRow);
}



function getTechAnalysis(ticker){
  var html_widget = "<div class='tradingview-widget-container__widget'></div><script type='text/javascript' src='https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js' async> \{'interval': '1D','width': '100\%','isTransparent': false,'height': '100\%','symbol': 'BINANCE:"+ ticker +"USDT','showIntervalTabs': true,'locale': 'en','colorTheme': 'light'\}</script>";
  
  document.getElementById("testDiv").innerHTML = html_widget;

}

setInterval(getCurrentPrice, 4000);

async function callBinanceAPi(symbol) {
  
    let url = "https://api.binance.com/api/v3/ticker/price?symbol="+symbol;
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function getCurrentPrice() {
    var tbl = document.getElementById("main_ticker_list");
    for (let i = 1; i < tbl.rows.length; i++) {
        let data = await callBinanceAPi(tbl.rows[i].cells[0].childNodes[0].value+"USDT");

        tbl.rows[i].cells[3].innerText = parseFloat(data.price).toFixed(2);

        var gain = (parseFloat(tbl.rows[i].cells[1].childNodes[0].value) * parseFloat(data.price)) - (parseFloat(tbl.rows[i].cells[1].childNodes[0].value) * parseFloat(tbl.rows[i].cells[2].childNodes[0].value))
        tbl.rows[i].cells[4].innerText = gain.toFixed(2);
    }
}

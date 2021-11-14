//Create Table from file upload
var file_upload = false;

async function getFile(file) {
  
    try {
        let res = await fetch(file);
        return await res.text();
    } catch (error) {
        console.log(error);
    }
}

async function creatTableFromFile(){
  var file_upl = document.getElementById("tickers_list");
  var tbl = document.getElementById("main_table_tickers");

  data = await getFile("input_example.csv");  
  lines = data.split("\n");
  
  tbl.innerHTML = "<tr><th>Ticker</th><th>Amount</th><th>Buy Price</th><th>Current Price</th><th>Gain</th></tr>";

  for(let i = 0; i < lines.length; i++){
    cols = lines[i].split(",");

    let newRow = document.createElement('tr');
    newRow.insertCell(0);
    newRow.cells[0].innerHTML += "<input type=\"text\" value=\""+cols[0]+"\" />";
    newRow.insertCell(1);
    newRow.cells[1].innerHTML += "<input type=\"number\" step=\"0.01\" value=\""+parseFloat(cols[1])+"\" />";
    newRow.insertCell(2);
    newRow.cells[2].innerHTML += "<input type=\"number\" step=\"0.01\" value=\""+parseFloat(cols[2])+"\" />";
    newRow.insertCell(3);
    newRow.cells[3].innerHTML += "";
    newRow.insertCell(4);
    newRow.cells[4].innerHTML += "";
    tbl.appendChild(newRow);
  }
  
  file_upload = true;

}

//Table Add New Row
function addNewTableRow() {
  var tbl = document.getElementById("main_table_tickers");
  
  if(!file_upload){
    tbl.innerHTML = "<tr><th>Ticker</th><th>Amount</th><th>Buy Price</th><th>Current Price</th><th>Gain</th></tr>";
  }
  // Add a new row
  let newRow = document.createElement('tr');
  newRow.insertCell(0);
  newRow.cells[0].innerHTML += "<input type=\"text\" value=\"BTC\" />";
  newRow.insertCell(1);
  newRow.cells[1].innerHTML += "<input type=\"number\" step=\"0.01\" value=\"0\" />";
  newRow.insertCell(2);
  newRow.cells[2].innerHTML += "<input type=\"number\" step=\"0.01\" value=\"0\" />";
  newRow.insertCell(3);
  newRow.cells[3].innerHTML += "";
  newRow.insertCell(4);
  newRow.cells[4].innerHTML += "";

  tbl.appendChild(newRow);
}


//TODO: Techincal Analysis not working
function getTechAnalysis(ticker){
  var html_widget = "<div class='tradingview-widget-container__widget'></div><script type='text/javascript' src='https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js' async> \{'interval': '1D','width': '100\%','isTransparent': false,'height': '100\%','symbol': 'BINANCE:"+ ticker +"USDT','showIntervalTabs': true,'locale': 'en','colorTheme': 'light'\}</script>";
  
  document.getElementById("testDiv").innerHTML = html_widget;

}


//Interval API fetching
setInterval(getCurrentPrice, 6000);

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
    var tbl = document.getElementById("main_table_tickers");
    for (let i = 1; i < tbl.rows.length; i++) {
        let data = await callBinanceAPi(tbl.rows[i].cells[0].childNodes[0].value+"USDT");

        tbl.rows[i].cells[3].innerText = parseFloat(data.price).toFixed(6);

        var gain = (parseFloat(tbl.rows[i].cells[1].childNodes[0].value) * parseFloat(data.price)) - (parseFloat(tbl.rows[i].cells[1].childNodes[0].value) * parseFloat(tbl.rows[i].cells[2].childNodes[0].value))
        tbl.rows[i].cells[4].innerText = gain.toFixed(6);
    }
}

//Get table header 
const price=document.querySelector("#price");
const high=document.querySelector("#high");
const low=document.querySelector("#low");
const change=document.querySelector("#change");
const percha=document.querySelector("#percha");
const volume=document.querySelector("#volume");
const form = document.querySelector('form');
const aLink = document.querySelector('a');
//get table data
const priceData = document.querySelector("#priceData");
const highData = document.querySelector("#highData");
const lowData = document.querySelector("#lowData");
const changeData = document.querySelector("#changeData");
const percentData = document.querySelector("#percentData");
const volumeData = document.querySelector("#volumeData");
//set colors
price.style.color="yellow";
high.style.color="yellow";
low.style.color="yellow";
change.style.color="yellow";
percha.style.color="yellow";
volume.style.color="yellow";
//get ticker input
const url="https://alpha-vantage.p.rapidapi.com/query?function=GLOBAL_QUOTE&symbol="
const tbl=document.querySelector(".tbl");
const tickers=form.addEventListener('submit',function(e){
    e.preventDefault();
    const stockInput=form.elements.stock;
    getData(stockInput.value);
    getNews(stockInput.value);
    stockInput.value="";
   
  });

//get stock data
function getData(tickers){
  fetch(url+tickers, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "myAPI",
		"x-rapidapi-host": "alpha-vantage.p.rapidapi.com"
	}
})
  .then(response => {
	  console.log(response);
    return response.json();
  })
  .then(data=>{
    const table=document.createElement('table');
    table.tr=data["Global Quote"]["01. symbol"];
    tbl.tr=data["Global Quote"]["05. price"];
    document.body.append(table);
    priceData.innerHTML=data["Global Quote"]["05. price"];
    highData.innerHTML=data["Global Quote"]["03. high"]
    lowData.innerHTML=data["Global Quote"]["04. low"];
    volumeData.innerHTML=data["Global Quote"]["06. volume"];
    changeData.innerHTML = parseFloat(data["Global Quote"]["09. change"]);
    percentData.innerHTML=parseFloat(data["Global Quote"]["10. change percent"]);
    //color red or green
    if(percentData.innerHTML<0){
      priceData.style.color="red";
      
    }else{
      priceData.style.color="green";
    }
    if (changeData.innerHTML < 0) {
      changeData.style.color = "red";
    } else{
      changeData.style.color = "green";
    }
    if (percentData.innerHTML < 0) {
      percentData.style.color = "red";
    } else{
      percentData.style.color = "green";
    }
  })
  .catch(err => {
	console.error(err);
  });
  
}

//get the news api and create link
const url2="https://apidojo-yahoo-finance-v1.p.rapidapi.com/"
function getNews(tickers){
  fetch(url2+"auto-complete?q="+tickers, {
	  "method": "GET",
	  "headers": {
		  "x-rapidapi-key": "myAPI",
		  "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
	}
  })
  .then(response => {
	  console.log(response);
    return response.json();
  })
  .then(data=>{
    //const aTag = document.createElement('a'); creates a new link instead of dynamically upgrading
    aLink.style.color = "yellow";    
    aLink.innerHTML = `Get current ${tickers} news`;
    aLink.href=data.news[0].link;
    aLink.target = 0;
  })
  .catch(err => {
	console.error(err);
  });
  
}


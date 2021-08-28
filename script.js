// Get Quotes From API
let quotes = [];

async function getQuotes() {
  const URL = "https://type.fit/api/quotes";

  try {
    const response = await fetch(URL);
    quotes = await response.json();
  } catch (err) {
    console.log(err);
    quotes = localQuotes;
  }
}

function newQuote() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
}

//Onload
getQuotes();

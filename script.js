let quotes = [];

// Selectors
const authorText = document.getElementById("author");
const quoteText = document.getElementById("quote");
const tweetButton = document.getElementById("tweet-button");
const newQuoteButton = document.getElementById("new-quote-button");
const quoteContainer = document.getElementById("quote-container");
const loader = document.getElementById("loader");

// show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
// Hide loading
function loadingComplete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Get Quotes From API
async function getQuotes() {
  loading();
  const URL = "https://type.fit/api/qutes";

  try {
    const response = await fetch(URL);
    quotes = await response.json();
    newQuote();
    loadingComplete();
  } catch (err) {
    // get new quotes from local if there was an error
    console.log(err);
    quotes = localQuotes;
    newQuote();
    loadingComplete();
  }
}

//generate new random quote
function newQuote() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  authorText.textContent = !quote.author ? "Unknown" : quote.author;

  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
}

//Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteButton.addEventListener("click", newQuote);
tweetButton.addEventListener("click", tweetQuote);

//Onload
getQuotes();

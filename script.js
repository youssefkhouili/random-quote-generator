const quoteTextElement = document.querySelector('.quote')
const authorElement = document.querySelector('.author')
const quoteIconElement = document.querySelector('.fas')
const quoteContainer = document.querySelector('.quote-container')
const twitterBtn = document.querySelector('.twitter-btn')
const nextQuoteBtn = document.querySelector('.nextbtn')
const loadearElement = document.querySelector('.lds-ripple')
// Show Loader
function loading() {
    loadearElement.classList.remove('hideLopper') 
    loadearElement.hidden = false
    quoteContainer.hidden = true
}
// Hide Loader
function completeLoading() {
    if(!loadearElement.hidden) {
        loadearElement.hidden = true
        quoteContainer.hidden = false
    }
    if(!quoteContainer.hidden) {
        loadearElement.classList.add('hideLopper')
    } else {
        loadearElement.classList.remove('hideLopper')   
    }
}
// Get Quote from API
async function getQuote() {
    loading()
    const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en'
    try {
        const response = await fetch(proxyUrl + apiUrl)
        const data = await response.json()
        if(authorElement.textContent === '') {
            authorElement.textContent = 'Unknown'
        } else {
            authorElement.textContent = data.quoteAuthor
        }
        if(data.quoteText.length > 120) {
            quoteTextElement.classList.add('long-quote')
        } else {
            quoteTextElement.classList.remove('long-quote')
        }
        if(data.quoteText.length) {
            quoteContainer.classList.remove('hidden')
        }
        quoteTextElement.textContent = data.quoteText
        // Stop the loader and show the content
        completeLoading()
    } catch(error) {
        getQuote()
        console.log('no quote', error)
    }
}

function tweetQuote() {
    const quote = quoteTextElement.innerText
    const author = authorElement.innerText
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
    window.open(twitterUrl, '_blank')
}



twitterBtn.addEventListener('click', tweetQuote)
nextQuoteBtn.addEventListener('click', getQuote)
getQuote()
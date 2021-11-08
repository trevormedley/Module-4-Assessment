const quotesContainer = document.querySelector('#quotesContainer')
const form = document.querySelector('form')
const likeButton = document.querySelector('#thumbsUp')
const dislikeButton = document.querySelector('#thumbsDown')

const baseURL = `http://localhost:4000/api/quotes/`

const quotesCallback = ({ data: quotes }) => displayQuotes(quotes)
const errCallback = err => console.log(err.response.data)

const getAllQuotes = () => axios.get(baseURL).then(quotesCallback).catch(errCallback)
const createQuote = body => axios.post(baseURL, body).then(quotesCallback).catch(errCallback)
const deleteQuote = id => axios.delete(`${baseURL}${id}`).then(quotesCallback).catch(errCallback)
const updateQuote = (id, type) => axios.put(`${baseURL}${id}`, {type}).then(quotesCallback).catch(errCallback)

function submitHandler (e) {
    e.preventDefault()

    let quote = document.querySelector('#quoteInput')
    let author = document.querySelector('#authorInput')
    let imageURL = document.querySelector('#imageInput')

    let bodyObj = {
        quote: quote.value,
        author: author.value,
        imageURL: imageURL.value,
        likes: 0,
        dislikes: 0,
    }

    createQuote(bodyObj)
}

function createQuoteBlock(quotes) {
    const quoteBlock = document.createElement('div');
    
    quoteBlock.innerHTML = `      
    <div id="quoteBlock">
    <div id="imgQuote">
      <img src="${quotes.imageURL}" alt="Author" id="quoteImage">
      <div id="textWrapper">
        <h3>${quotes.quote}</h3>
        <h4>${quotes.author}</h4>
      </div>
    </div>
    <div id="likesDiv">
      <div id="thumbsUp" onclick="updateQuote(${quotes.id}, 'like')">
        <img src="../thumbs-up.svg" alt="Thumbs Up">
        <p id="likeNumber">${quotes.likes}</p>
      </div>
      <div id="thumbsDown" onclick="updateQuote(${quotes.id}, 'dislike')">
        <img src="../thumbs-down.svg" alt="Thumbs Down">
        <p id="dislikeNumber">${quotes.dislikes}</p>
      </div>
    </div>
    <div id="xDiv" onclick="deleteQuote(${quotes.id})">
      <img src="../x.svg" alt="Delete">
    </div>
  </div>`

  quotesContainer.appendChild(quoteBlock);
}


function displayQuotes(arr) {
    quotesContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createQuoteBlock(arr[i]);
    }
}

form.addEventListener('submit', submitHandler);

getAllQuotes();
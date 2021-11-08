const quotes = require('./db.json');

module.exports = {
    getQuotes: (req, res) => {
        res.status(200).send(quotes);
    },
    createQuote: (req, res) => {
        let newQuote = {
            id: quotes.length + 1,
            quote: req.body.quote,
            author: req.body.author,
            likes: req.body.likes,
            dislikes: req.body.dislikes,
            imageURL: req.body.imageURL,
        };
        quotes.push(newQuote)
        res.status(200).send(quotes);
    },
    updateQuote: (req, res) => {
        let {id} = req.params
        let quoteIndex = quotes.findIndex((quote) => {
            return quote.id === +id
        })

        if (req.body.type === 'like') {
            quotes[quoteIndex].likes++
        } else if (req.body.type === 'dislike') {
            quotes[quoteIndex].dislikes++
        }
        res.status(200).send(quotes);
    },
    deleteQuote: (req, res) => {
        let quoteIndex = quotes.findIndex((quote) => quote.id === Number(req.params.id))
        quotes.splice(quoteIndex, 1);
        res.status(200).send(quotes)
    }
}
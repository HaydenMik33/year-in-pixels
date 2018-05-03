const axios = require("axios");
const addQuote = (req, res) => {
  console.log("Hit the post => /api/quote");
  /////add quote to the database
  const { text, author, tags, ilgi_id } = req.body;
  req.app
    .get("db")
    .addQuote([text, author, tags, ilgi_id])
    .then(quote => {
      res.status(200).json(quote);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};
const getQuoteById = (req, res) => {
  const { id } = req.params;
  req.app
    .get("db")
    .getQuoteByid(id)
    .then(quote => {
      res.status(200).send(quote);
    })
    .catch(() => {
      res.status(500).send();
    });
};
const getAllQuotes = (req, res) => {
  //////get all quotes from your database
  console.log("Hit the get => /api/quotes");
  const { id } = req.params;
  req.app
    .get("db")
    .getAllQuotes(id)
    .then(quotes => {
      res.status(200).send(quotes);
    })
    .catch(() => {
      res.status(500).send();
    });
};

const deleteQuote = (req, res) => {
  ////delete Quote to your data base
  console.log("Hit the post =>/api/quote");
  console.log(req.params);
  console.log(req.body);
  const { id, ilgi_id } = req.params;
  const { text, img, colorvalue } = req.body;

  req.app
    .get("db")
    .deleteQuote([id, text, img, colorvalue, ilgi_id])
    .then(quotes => {
      res.status(200).send(quotes);
    })
    .catch(() => {
      res.status(500).send();
    });
};
const getQuote = (req, res) => {
  axios
    .get("https://talaikis.com/api/quotes/random/")
    .then(quote => {
      console.log(quote);
      res.status(200).json(quote.data);
    })
    .catch(res => res.status(500).json(res));
};

module.exports = {
  addQuote,
  getAllQuotes,
  deleteQuote,
  getQuote,
  getQuoteById
};

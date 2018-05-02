const addQuote = (req, res) => {
  console.log("Hit the post => /api/quote");
  const { text, img, colorvalue, ilgi_id, Quote_unique } = req.body;
  req.app
    .get("db")
    .addQuote([text, img, colorvalue, ilgi_id, Quote_unique])
    .then(Quote => {
      res.status(200).json(Quote);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const getAllQuote = (req, res) => {
  console.log("Hit the get => /api/quotes");
  const { ilgi_id } = req.params;
  req.app
    .get("db")
    .getAllQuotes(ilgi_id)
    .then(quotes => {
      res.status(200).send(quotes);
    })
    .catch(() => {
      res.status(500).send();
    });
};

const deleteQuote = (req, res) => {
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
  /////get quote from api addresses.........
};

module.exports = {
  addQuote,
  getAllQuotes,
  deleteQuote
};

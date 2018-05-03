const addPixel = (req, res) => {
  console.log("Hit the post => /api/pixel");
  const { ilgi_id, pixel_unique } = req.body;
  req.app
    .get("db")
    .addPixel(["", "", ilgi_id, pixel_unique])
    .then(pixel => {
      res.status(200).json(pixel);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const getAllPixels = (req, res) => {
  console.log("Hit the get => /api/pixels");
  const { ilgi_id } = req.params;
  req.app
    .get("db")
    .getAllPixels(ilgi_id)
    .then(pixels => {
      res.status(200).send(pixels);
    })
    .catch(() => {
      res.status(500).send();
    });
};

const getPixel = (req, res) => {
  console.log("Hit the get =>/api/pixel ");
  const { id } = req.params;
  console.log(id);
  req.app
    .get("db")
    .getPixel(id)
    .then(pixel => {
      console.log(pixel);
      res.status(200).send(pixel);
    })
    .catch(() => {
      res.status(500).send();
    });
};

const updatePixel = (req, res) => {
  console.log("Hit the post =>/api/pixel");
  console.log(req.params);
  console.log(req.body);
  const { id, ilgi_id } = req.params;
  const { text, img, quote_id } = req.body;

  req.app
    .get("db")
    .updatePixel([id, text, img, ilgi_id, quote_id])
    .then(pixels => {
      res.status(200).send(pixels);
    })
    .catch(err => {
      // res.status(500).send();
      console.log(err);
    });
};
module.exports = {
  addPixel,
  getAllPixels,
  getPixel,
  updatePixel
};

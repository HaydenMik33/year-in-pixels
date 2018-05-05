const addPixel = (req, res) => {
  console.log("Hit the post => /api/pixel", req.body);
  const { ilgi_id, pixel_unique } = req.body;
  req.app
    .get("db")
    .addPixel([Number(ilgi_id), Number(pixel_unique)])
    .then(pixel => {
      console.log(pixel);
      res.status(200).json(pixel);
    })
    .catch(err => {
      // res.status(500).send(err);
      console.log(err);
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
  console.log("Hit the get =>/api/pixel ", req.params);
  const { id } = req.params;
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
    .updatePixel([Number(id), text, img, Number(ilgi_id), quote_id])
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

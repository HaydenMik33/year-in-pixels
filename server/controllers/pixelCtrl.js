const addPixel = (req, res) => {
  console.log("Hit the post => /api/pixel");
  const { text, img, colorValue, ilgi_id, pixel_unique } = req.body;
  req.app
    .get("db")
    .addPixel([text, img, colorValue, ilgi_id, pixel_unique])
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
  req.app
    .get("db")
    .getPixel(id)
    .then(pixel => res.status(200).send(pixel))
    .catch(() => {
      res.status(500).send();
    });
};

const updatePixel = (req, res) => {
  console.log("Hit the post =>/api/pixel");
  console.log(req.params);
  console.log(req.body);
  const { id, ilgi_id } = req.params;
  const { text, img, colorValue } = req.body;

  req.app
    .get("db")
    .updatePixel([id, text, img, colorValue, ilgi_id])
    .then(pixels => {
      res.status(200).send(pixels);
    })
    .catch(() => {
      res.status(500).send();
    });
};
module.exports = {
  addPixel,
  getAllPixels,
  getPixel,
  updatePixel
};

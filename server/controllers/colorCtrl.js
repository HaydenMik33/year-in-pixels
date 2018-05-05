const addColor = (req, res) => {
  console.log("Hit the post => /api/color", req.body);
  const { pixel_unique, ilgi_id } = req.body;
  req.app
    .get("db")
    .addColor([0.5, pixel_unique, ilgi_id])
    .then(color => {
      res.status(200).json(color);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const updateColor = (req, res) => {
  console.log("Hit the post =>/api/color", req.params, req.body);
  const { id } = req.params;
  const { colorvalue, opacity, ilgi_id } = req.body;
  req.app
    .get("db")
    .updateColor([id, colorvalue, Number(opacity), ilgi_id])
    .then(pixels => {
      res.status(200).send(pixels);
    })
    .catch(() => {
      res.status(500).send();
    });
};

module.exports = {
  addColor,
  updateColor
};

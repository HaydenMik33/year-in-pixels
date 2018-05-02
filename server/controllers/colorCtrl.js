const addColor = (req, res) => {
  console.log("Hit the post => /api/color");
  const { pixel_unique } = req.body;
  req.app
    .get("db")
    .addColor(["", 0.5, pixel_unique])
    .then(color => {
      res.status(200).json(color);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const updateColor = (req, res) => {
  console.log("Hit the post =>/api/color");
  const { id } = req.params;
  const { colorvalue, opacity } = req.body;
  console.log(id, colorvalue, opacity);
  req.app
    .get("db")
    .updateColor([id, colorvalue, opacity])
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

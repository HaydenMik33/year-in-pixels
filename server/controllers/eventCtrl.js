const addEvent = (req, res) => {
  console.log("Hit the post => /api/event");
  const {
    date,
    title,
    text,
    important,
    location,
    pixel_unique,
    ilgi_id
  } = req.body;
  req.app
    .get("db")
    .addEvent([date, title, text, important, location, pixel_unique, ilgi_id])
    .then(event => {
      res.status(200).json(event);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const updateEvent = (req, res) => {
  console.log("Hit the post =>/api/event");
  const { id } = req.params;
  const { title, text, location, important, date } = req.body;
  req.app
    .get("db")
    .updateEvent([id, eventvalue, opacity])
    .then(pixels => {
      res.status(200).send(pixels);
    })
    .catch(() => {
      res.status(500).send();
    });
};
const getAllEvents = (req, res) => {
  console.log("Hit the get =>/api/events");
  const { id } = req.params;
  req.app
    .get("db")
    .getAllEvents([id])
    .then(events => {
      res.status(200).send(events);
    })
    .catch(() => {
      res.status(500).send();
    });
};

module.exports = {
  addEvent,
  updateEvent,
  getAllEvents
};

const addEvent = (req, res) => {
  console.log("Hit the post => /api/event");
  const { ilgi_id } = req.body;
  req.app
    .get("db")
    .addEvent([ilgi_id])
    .then(event => {
      res.status(200).json(event);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const updateEvent = (req, res) => {
  console.log("Hit the post =>/api/event/:id");
  const { id, ilgi_id } = req.params;
  const {
    title,
    text,
    location,
    important,
    formatDate,
    pixel_unique
  } = req.body;
  console.log(ilgi_id);
  req.app
    .get("db")
    .updateEvent([
      title,
      text,
      location,
      important,
      formatDate,
      pixel_unique,
      id,
      ilgi_id
    ])
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
const deleteEvent = (req, res) => {
  console.log("Hit the delete =>/api/event/:id");
  const { id } = req.params;
  const { ilgi_id } = req.body;
  req.app
    .get("db")
    .deleteEvent([id, ilgi_id])
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
  getAllEvents,
  deleteEvent
};

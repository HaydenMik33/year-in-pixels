INSERT INTO events (
   ilgi_id,title,
      text,
      location,
      important,
      date,
      pixel_unique) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *;
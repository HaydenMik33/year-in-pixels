INSERT INTO events (
   date, title, text, important, location, pixel_unique, ilgi_id) VALUES ($1, $2,$3,$4,$5,$6,$7) RETURNING *;
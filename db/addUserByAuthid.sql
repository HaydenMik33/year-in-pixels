INSERT INTO users (authid,displayName,picture) VALUES ($1, $2,$3) RETURNING *;

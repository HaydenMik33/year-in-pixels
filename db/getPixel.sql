SELECT * FROM pixels p
join colors c on p.pixel_unique = c.pixel_unique
WHERE id = $1;


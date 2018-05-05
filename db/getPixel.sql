SELECT p.id,colorvalue,text,img,quote_id,p.ilgi_id,p.pixel_unique,opacity  FROM pixels p
join colors c on p.pixel_unique = c.pixel_unique
WHERE p.id = $1;


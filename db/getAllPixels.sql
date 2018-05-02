select * from pixels p
join colors c on p.pixel_unique = c.pixel_unique
 where ilgi_id =$1;
update pixels
set text=$2,
img=$3
where id=$1;
select * from pixels p
join colors c on p.pixel_unique = c.pixel_unique
 where ilgi_id =$4;
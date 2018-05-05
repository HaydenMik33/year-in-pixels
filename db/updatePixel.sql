update pixels
set text=$2,
img=$3,
quote_id= $5
where id=$1;
select p.id,colorvalue,text,img,quote_id,p.ilgi_id,p.pixel_unique,opacity from pixels p
join colors c on p.pixel_unique = c.pixel_unique
 where p.ilgi_id =$4;
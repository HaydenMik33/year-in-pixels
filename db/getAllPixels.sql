select p.id,colorvalue,text,img,quote_id,p.ilgi_id,p.pixel_unique,opacity  from pixels p
join colors c on p.pixel_unique = c.pixel_unique 
 where p.ilgi_id =$1;
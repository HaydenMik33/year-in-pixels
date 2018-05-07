update events
set title=$1,
text=$2,
location=$3,
important=$4,
date=$5,
pixel_unique=$6
where id=$7;
select * from events
 where ilgi_id =$8;


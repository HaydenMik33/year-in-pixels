update pixels
set text=$2,
img=$3,
colorValue=$4
where id=$1;
select * from pixels where ilgi_id=$5;
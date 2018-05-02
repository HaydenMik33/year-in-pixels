update colors
set colorvalue=$2,
opacity=$3
where pixel_unique=$1
RETURNING *;

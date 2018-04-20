CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    authid VARCHAR(50),
    displayName VARCHAR(50),
    picture VARCHAR(200),
    Ilgi_id integer references Ilgiid()
);

CREATE TABLE pixels (
    id SERIAL PRIMARY KEY,
    text VARCHAR(50),
    img VARCHAR(200),
    colorValue VARCHAR(10),
    ilgi_id integer references Ilgi(id)
);
 
 Create table Ilgi(
     id serial PRIMARY key
 )
CREATE TABLE colors(
    id SERIAL PRIMARY KEY,
    colorValue VARCHAR(10),
    opacity decimal,
    type VARCHAR(7),
    description VARCHAR(15),
    date VARCHAR(10)
);



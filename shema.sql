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
    pixel_unique integer,
    quote_id integer references quotes(id),
    ilgi_id integer references Ilgi(id) 
);
 
 Create table Ilgi(
     id serial PRIMARY key
 );
 CREATE TABLE quotes (
    id SERIAL PRIMARY KEY,
    text VARCHAR(50),
    author VARCHAR(30),
    tags VARCHAR(50),
    ilgi_id integer references Ilgi(id) 
);
 CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30)
    text VARCHAR(200),
    month integer,
    date integer,
    day VARCHAR(10),
    pixel_unique integer
);  
 
CREATE TABLE colors(
    id SERIAL PRIMARY KEY,
    colorvalue integer,
    opacity decimal
    pixel_unique integer
);



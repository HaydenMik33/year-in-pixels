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
CREATE TABLE colors(
    id SERIAL PRIMARY KEY,
    colorvalue VARCHAR(10),
    opacity decimal,
    pixel_unique integer,
    ilgi_id integer references Ilgi(id) 
);

 CREATE TABLE events (
    CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30),
    text VARCHAR(800),
   location VARCHAR(100),
    important boolean,
    date VARCHAR(10),
    month integer,
    day integer,
    pixel_unique integer,
    ilgi_id integer references Ilgi(id) 
); 
 
CREATE TABLE colors(
    id SERIAL PRIMARY KEY,
    colorvalue integer,
    opacity decimal,
    pixel_unique integer,
    ilgi_id integer references Ilgi(id) 
);



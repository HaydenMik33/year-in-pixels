CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    authid VARCHAR(50),
    displayName VARCHAR(50),
    picture VARCHAR(200)
);

CREATE TABLE pixels (
    id SERIAL PRIMARY KEY,
    pixelid integer,
    text VARCHAR(50),
    img VARCHAR(200)
);

CREATE TABLE Ilgi(
    id SERIAL PRIMARY KEY,
    Ilgi integer,
    year integer
);
 
CREATE TABLE colors(
    id SERIAL PRIMARY KEY,
    colorid VARCHAR(10),
    opacity decimal,
    type VARCHAR(7),
    description VARCHAR(15)
);



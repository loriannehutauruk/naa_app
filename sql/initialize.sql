DROP TABLE IF EXISTS users, sponsors, goals;
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(50),
  email VARCHAR(50),
  privacy VARCHAR(50),
  PRIMARY KEY (id)
);

CREATE TABLE sponsors (
  sponsor_id INT NOT NULL AUTO_INCREMENT,
  user_id INT not NULL,
  username VARCHAR(50),
  email VARCHAR(50),
  location VARCHAR(50),
  bio VARCHAR(250),
  PRIMARY KEY (sponsor_id),
  FOREIGN KEY (user_id)
  REFERENCES users (id)
);

CREATE TABLE goals (
  goal_id INT NOT NULL AUTO_INCREMENT,
  user_id INT not NULL,
  goal VARCHAR(255),
  PRIMARY KEY (goal_id),
  FOREIGN KEY (user_id)
  REFERENCES users (id)
);
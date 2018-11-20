--CREATE DATA TABLES
CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "user_profiles" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES users,
    "email" VARCHAR (120),
    "zip_code" INT,
    "phone_number" INT,
    "profile_pic" VARCHAR (1000)
);

CREATE TABLE "categories" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES users,
    "category" VARCHAR (120) NOT NULL
);


CREATE TABLE "habits" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES users,
    "habit" VARCHAR (1000) NOT NULL,
    "category_id" INT REFERENCES categories,
    "mute_status" BOOLEAN DEFAULT false
);

CREATE TABLE "habit_occurences" (
    "id" SERIAL PRIMARY KEY,
    "habit_id" INT REFERENCES habits,
    "date" DATE,
    "time" TIME
);

-- SAMPLE DATA

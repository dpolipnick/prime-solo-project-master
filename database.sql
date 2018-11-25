-- First create a database titled 'habit-breaker'

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

CREATE TABLE "habit_occurrences" (
    "id" SERIAL PRIMARY KEY,
    "habit_id" INT REFERENCES habits,
    "date" DATE,
    "time" TIME
);

-- CREATE DEFAULT CATEGORIES
INSERT INTO "categories" ("user_id", "category") 
VALUES (null, 'Swear Word');

INSERT INTO "categories" ("user_id", "category") 
VALUES (null, 'Speech Filler');

INSERT INTO "categories" ("user_id", "category") 
VALUES (null, 'Political Correctness');

INSERT INTO "categories" ("user_id", "category") 
VALUES (null, 'Other');

-- TESTS
SELECT habits.id, category.categories FROM "habits"
JOIN "categories" ON "categories"."id"="habits"."category_id";

SELECT "habits".*, "categories"."category" FROM "habits"
JOIN "categories" ON "habits"."category_id" = "categories"."id"
WHERE "habits"."user_id" = 1;

INSERT INTO "habit_occurrences" ("habit_id", "date", "time")
VALUES (5, '2018-10-24', '05:30');

-- SAMPLE DATA


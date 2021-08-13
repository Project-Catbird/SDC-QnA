CREATE DATABASE "sdc-qna"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

CREATE TABLE public.questions
(
    id integer NOT NULL DEFAULT nextval('questions_id_seq'::regclass),
    product_id integer,
    body character varying COLLATE pg_catalog."default",
    date_written date,
    asker_name character varying COLLATE pg_catalog."default",
    asker_email character varying COLLATE pg_catalog."default",
    reported integer DEFAULT 0,
    helpful integer DEFAULT 0,
    CONSTRAINT id PRIMARY KEY (id)
)

COPY public.questions FROM '/Users/andyvo/Work/hr/SDC-QnA/server/db/data/questions_cleaned.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE public.answers
(
    id integer NOT NULL DEFAULT nextval('answers_id_seq'::regclass),
    question_id integer NOT NULL,
    body character varying COLLATE pg_catalog."default",
    date_written date,
    answerer_name character varying COLLATE pg_catalog."default",
    answerer_email character varying COLLATE pg_catalog."default",
    reported integer NOT NULL DEFAULT 0,
    helpful integer NOT NULL DEFAULT 0,
    CONSTRAINT answers_pkey PRIMARY KEY (id)
)

COPY public.answers FROM '/Users/andyvo/Work/hr/SDC-QnA/server/db/data/answers_cleaned.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE public.answers_photos
(
    id serial NOT NULL,
    answer_id integer NOT NULL,
    url character varying,
    PRIMARY KEY (id),
    CONSTRAINT answers_photos_id UNIQUE (id)
);

COPY public.answers_photos FROM '/Users/andyvo/Work/hr/SDC-QnA/server/db/data/answers_photos.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE public.users
(
    id serial NOT NULL,
    user_name character varying,
    user_email character varying,
    PRIMARY KEY (id),
    CONSTRAINT user_id UNIQUE (id),
    CONSTRAINT user_name UNIQUE (user_name)
);

INSERT INTO public.users (user_name, user_email) SELECT DISTINCT ON (asker_name) asker_name AS user_name, asker_email AS user_email FROM public.questions ON CONFLICT (user_name) DO NOTHING;

INSERT INTO public.users (user_name, user_email) SELECT DISTINCT ON (answerer_name) answerer_name AS user_name, answerer_email AS user_email FROM public.answers ON CONFLICT (user_name) DO NOTHING;

ALTER TABLE public.questions
  ADD user_id integer;

ALTER TABLE public.answers
  ADD user_id integer;

UPDATE public.questions QUESTIONS
  SET user_id = USERS.id
  FROM public.users USERS
  WHERE USERS.user_name = QUESTIONS.asker_name;

UPDATE public.answers ANSWERS
  SET user_id = USERS.id
  FROM public.users USERS
  WHERE USERS.user_name = ANSWERS.answerer_name;

ALTER TABLE public.questions
  DROP COLUMN asker_name,
  DROP COLUMN asker_email;

ALTER TABLE public.answers
  DROP COLUMN answerer_name,
  DROP COLUMN answerer_email;

CREATE INDEX idx_product_id ON questions(product_id);
CREATE INDEX idx_question_id ON answers(question_id);
CREATE INDEX idx_answer_id ON answers_photos(answer_id);
CREATE INDEX idx_answers_reported ON answers(reported);

-- RESET INCREMENTING ID TO THE LAST ITEM IN THE TABLE
SELECT setval('questions_id_seq', 3518963, true);
SELECT setval('answers_id_seq', 6879306, true);
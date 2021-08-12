CREATE DATABASE "sdc-qna"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

CREATE TABLE public.questions (
	id serial,
	product_id int,
	body varchar,
	date_written varchar,
	asker_name varchar,
	asker_email varchar,
	reported int,
	helpful int
);

COPY public.questions FROM '/Users/andyvo/Work/hr/SDC-QnA/server/db/data/questions.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE public.answers (
	id serial,
	question_id int,
  body varchar,
  date_written varchar,
  answerer_name varchar,
	answerer_email varchar,
	reported int,
	helpful int
);

COPY public.answers FROM '/Users/andyvo/Work/hr/SDC-QnA/server/db/data/answers.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE public.answers_photos (
	id serial,
	answer_id int,
  url varchar
);

COPY public.answers_photos FROM '/Users/andyvo/Work/hr/SDC-QnA/server/db/data/answers_photos.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE public.users (
  id serial,
  user_name varchar,
  user_email varchar,
  CONSTRAINT unique_user UNIQUE (user_name)
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
  SET ANSWERS.user_id = public.users.id
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
--
-- PostgreSQL database dump
--

\restrict JSYLI5Ax40vDd5HBJNZiO2nqm8R6X5ONOEUceaiqZbQE5hKgqolTfKXFOdTwXoK

-- Dumped from database version 15.18 (Debian 15.18-1.pgdg12+1)
-- Dumped by pg_dump version 15.18 (Debian 15.18-1.pgdg12+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: intarray; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS intarray WITH SCHEMA public;


--
-- Name: EXTENSION intarray; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION intarray IS 'functions, operators, and index support for 1-D arrays of integers';


--
-- Name: pg_trgm; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA public;


--
-- Name: EXTENSION pg_trgm; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_trgm IS 'text similarity measurement and index searching based on trigrams';


--
-- Name: vector; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA public;


--
-- Name: EXTENSION vector; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION vector IS 'vector data type and ivfflat and hnsw access methods';


--
-- Name: immutable_array_to_string(text[], text); Type: FUNCTION; Schema: public; Owner: lib_admin
--

CREATE OR REPLACE FUNCTION public.immutable_array_to_string(arr text[], sep text) RETURNS text
    LANGUAGE sql IMMUTABLE
    AS $$







    SELECT array_to_string(arr, sep);







$$;


ALTER FUNCTION public.immutable_array_to_string(arr text[], sep text) OWNER TO lib_admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: announcements; Type: TABLE; Schema: public; Owner: lib_admin
--

CREATE TABLE public.announcements (
    announce_id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    expired_date date,
    title text,
    content text,
    status character varying(20) DEFAULT 'draft'::character varying NOT NULL,
    is_pinned boolean DEFAULT false NOT NULL,
    CONSTRAINT chk_status CHECK (((status)::text = ANY ((ARRAY['draft'::character varying, 'active'::character varying, 'expired'::character varying])::text[])))
);


ALTER TABLE public.announcements OWNER TO lib_admin;

--
-- Name: borrow_book; Type: TABLE; Schema: public; Owner: lib_admin
--

CREATE TABLE public.borrow_book (
    borrow_id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    book_id character varying(20) NOT NULL,
    branch_id integer NOT NULL,
    reserve_date date DEFAULT CURRENT_DATE NOT NULL,
    borrow_date date,
    due_date date,
    pin character varying(10),
    expired_at timestamp without time zone,
    status character varying(20) DEFAULT 'reserved'::character varying NOT NULL,
    CONSTRAINT chk_borrow_dates CHECK ((due_date >= borrow_date)),
    CONSTRAINT chk_status CHECK (((status)::text = ANY (ARRAY[('reserved'::character varying)::text, ('pending'::character varying)::text, ('borrowed'::character varying)::text])))
);


ALTER TABLE public.borrow_book OWNER TO lib_admin;

--
-- Name: damage; Type: TABLE; Schema: public; Owner: lib_admin
--

CREATE TABLE public.damage (
    damage_id uuid DEFAULT gen_random_uuid() NOT NULL,
    borrow_id uuid NOT NULL,
    acm_date date DEFAULT CURRENT_DATE NOT NULL,
    lose boolean DEFAULT false,
    torn boolean DEFAULT false
);


ALTER TABLE public.damage OWNER TO lib_admin;

--
-- Name: group_request; Type: TABLE; Schema: public; Owner: lib_admin
--

CREATE TABLE public.group_request (
    request_id uuid DEFAULT gen_random_uuid() NOT NULL,
    group_id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    content text,
    status character varying(20) DEFAULT 'pending'::character varying NOT NULL,
    CONSTRAINT chk_status CHECK (((status)::text = ANY (ARRAY[('pending'::character varying)::text, ('approved'::character varying)::text, ('denied'::character varying)::text, ('expired'::character varying)::text])))
);


ALTER TABLE public.group_request OWNER TO lib_admin;

--
-- Name: loan; Type: TABLE; Schema: public; Owner: lib_admin
--

CREATE TABLE public.loan (
    loan_id uuid DEFAULT gen_random_uuid() NOT NULL,
    return_id uuid,
    damage_id uuid,
    user_id uuid NOT NULL,
    recog_date date DEFAULT CURRENT_DATE NOT NULL,
    loss boolean DEFAULT false,
    torn boolean DEFAULT false,
    overdue boolean DEFAULT false,
    recog_loan numeric(10,2) DEFAULT 0.00,
    paid boolean DEFAULT false
);


ALTER TABLE public.loan OWNER TO lib_admin;

--
-- Name: otp_store; Type: TABLE; Schema: public; Owner: lib_admin
--

CREATE TABLE public.otp_store (
    email character varying(255) NOT NULL,
    otp character varying(10) NOT NULL,
    expired_at timestamp without time zone NOT NULL,
    verified boolean DEFAULT false
);


ALTER TABLE public.otp_store OWNER TO lib_admin;

--
-- Name: pending_users; Type: TABLE; Schema: public; Owner: lib_admin
--

CREATE TABLE public.pending_users (
    token uuid NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    username character varying(100) NOT NULL,
    role character varying(20) DEFAULT 'user'::character varying NOT NULL,
    expired_at timestamp without time zone NOT NULL,
    CONSTRAINT chk_role CHECK (((role)::text = ANY (ARRAY[('admin'::character varying)::text, ('librarian'::character varying)::text, ('user'::character varying)::text])))
);


ALTER TABLE public.pending_users OWNER TO lib_admin;

--
-- Name: reserve_room; Type: TABLE; Schema: public; Owner: lib_admin
--

CREATE TABLE public.reserve_room (
    reserve_id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    avail_id integer NOT NULL,
    start_date date NOT NULL,
    checkin_time timestamp without time zone,
    pin character varying(10),
    expired_at timestamp without time zone,
    status character varying(20) DEFAULT 'reserved'::character varying NOT NULL,
    CONSTRAINT chk_status CHECK (((status)::text = ANY (ARRAY[('pending'::character varying)::text, ('reserved'::character varying)::text, ('used'::character varying)::text])))
);


ALTER TABLE public.reserve_room OWNER TO lib_admin;

--
-- Name: return_book; Type: TABLE; Schema: public; Owner: lib_admin
--

CREATE TABLE public.return_book (
    return_id uuid DEFAULT gen_random_uuid() NOT NULL,
    borrow_id uuid NOT NULL,
    branch_id integer NOT NULL,
    return_date date DEFAULT CURRENT_DATE NOT NULL
);


ALTER TABLE public.return_book OWNER TO lib_admin;

--
-- Name: return_room; Type: TABLE; Schema: public; Owner: lib_admin
--

CREATE TABLE public.return_room (
    return_id uuid DEFAULT gen_random_uuid() NOT NULL,
    reserve_id uuid NOT NULL,
    checkout_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.return_room OWNER TO lib_admin;

--
-- Name: room_avail_avail_id_seq; Type: SEQUENCE; Schema: public; Owner: lib_admin
--

CREATE SEQUENCE IF NOT EXISTS public.room_avail_avail_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.room_avail_avail_id_seq OWNER TO lib_admin;

--
-- Name: search_history; Type: TABLE; Schema: public; Owner: lib_admin
--

CREATE TABLE public.search_history (
    search_id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    book_clicked character varying(20),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    search_content text,
    filters jsonb
);


ALTER TABLE public.search_history OWNER TO lib_admin;

--
-- Name: study_group; Type: TABLE; Schema: public; Owner: lib_admin
--

CREATE TABLE public.study_group (
    group_id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_by uuid NOT NULL,
    reserve_id uuid NOT NULL,
    subject character varying(30) NOT NULL,
    title text NOT NULL,
    description text,
    requirements text[],
    capacity integer NOT NULL,
    current_num integer DEFAULT 1 NOT NULL,
    status character varying(20) DEFAULT 'upcoming'::character varying NOT NULL,
    CONSTRAINT chk_capacity_currentnum CHECK ((current_num <= capacity)),
    CONSTRAINT chk_capacity_positive CHECK ((capacity > 0)),
    CONSTRAINT chk_currentnum_positive CHECK ((current_num >= 0)),
    CONSTRAINT chk_status CHECK (((status)::text = ANY (ARRAY[('upcoming'::character varying)::text, ('full'::character varying)::text, ('cancelled'::character varying)::text, ('inprogress'::character varying)::text, ('completed'::character varying)::text, ('expired'::character varying)::text])))
);


ALTER TABLE public.study_group OWNER TO lib_admin;

--
-- Name: study_room_room_id_seq; Type: SEQUENCE; Schema: public; Owner: lib_admin
--

CREATE SEQUENCE IF NOT EXISTS public.study_room_room_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.study_room_room_id_seq OWNER TO lib_admin;

--
-- Data for Name: announcements; Type: TABLE DATA; Schema: public; Owner: lib_admin
--

COPY public.announcements (announce_id, created_at, expired_date, title, content, status) FROM stdin;
\.


--
-- Data for Name: borrow_book; Type: TABLE DATA; Schema: public; Owner: lib_admin
--

COPY public.borrow_book (borrow_id, user_id, book_id, branch_id, reserve_date, borrow_date, due_date, pin, expired_at, status) FROM stdin;
\.


--
-- Data for Name: damage; Type: TABLE DATA; Schema: public; Owner: lib_admin
--

COPY public.damage (damage_id, borrow_id, acm_date, lose, torn) FROM stdin;
\.


--
-- Data for Name: group_request; Type: TABLE DATA; Schema: public; Owner: lib_admin
--

COPY public.group_request (request_id, group_id, user_id, created_at, content, status) FROM stdin;
\.


--
-- Data for Name: loan; Type: TABLE DATA; Schema: public; Owner: lib_admin
--

COPY public.loan (loan_id, return_id, damage_id, user_id, recog_date, loss, torn, overdue, recog_loan, paid) FROM stdin;
\.


--
-- Data for Name: otp_store; Type: TABLE DATA; Schema: public; Owner: lib_admin
--

COPY public.otp_store (email, otp, expired_at, verified) FROM stdin;
\.


--
-- Data for Name: pending_users; Type: TABLE DATA; Schema: public; Owner: lib_admin
--

COPY public.pending_users (token, email, password_hash, username, role, expired_at) FROM stdin;
\.


--
-- Data for Name: reserve_room; Type: TABLE DATA; Schema: public; Owner: lib_admin
--

COPY public.reserve_room (reserve_id, user_id, avail_id, start_date, checkin_time, pin, expired_at, status) FROM stdin;
\.


--
-- Data for Name: return_book; Type: TABLE DATA; Schema: public; Owner: lib_admin
--

COPY public.return_book (return_id, borrow_id, branch_id, return_date) FROM stdin;
\.


--
-- Data for Name: return_room; Type: TABLE DATA; Schema: public; Owner: lib_admin
--

COPY public.return_room (return_id, reserve_id, checkout_time) FROM stdin;
\.


--
-- Data for Name: search_history; Type: TABLE DATA; Schema: public; Owner: lib_admin
--

COPY public.search_history (search_id, user_id, book_clicked, created_at, search_content, filters) FROM stdin;
\.


--
-- Data for Name: study_group; Type: TABLE DATA; Schema: public; Owner: lib_admin
--

COPY public.study_group (group_id, created_by, reserve_id, subject, title, description, requirements, capacity, current_num, status) FROM stdin;
\.


--
-- Name: room_avail_avail_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lib_admin
--

SELECT pg_catalog.setval('public.room_avail_avail_id_seq', 1, false);


--
-- Name: study_room_room_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lib_admin
--

SELECT pg_catalog.setval('public.study_room_room_id_seq', 34, true);


--
-- Name: announcements announcements_pkey; Type: CONSTRAINT; Schema: public; Owner: lib_admin
--

ALTER TABLE ONLY public.announcements
    ADD CONSTRAINT announcements_pkey PRIMARY KEY (announce_id);


--
-- Name: idx_borrow_book_book_status; Type: INDEX; Schema: public; Owner: lib_admin
--

CREATE INDEX idx_borrow_book_book_status ON public.borrow_book USING btree (book_id, status);


--
-- Name: idx_borrow_book_expired; Type: INDEX; Schema: public; Owner: lib_admin
--

CREATE INDEX idx_borrow_book_expired ON public.borrow_book USING btree (expired_at) WHERE ((status)::text = 'pending'::text);


--
-- Name: idx_borrow_book_user_status; Type: INDEX; Schema: public; Owner: lib_admin
--

CREATE INDEX idx_borrow_book_user_status ON public.borrow_book USING btree (user_id, status);


--
-- PostgreSQL database dump complete
--

\unrestrict JSYLI5Ax40vDd5HBJNZiO2nqm8R6X5ONOEUceaiqZbQE5hKgqolTfKXFOdTwXoK


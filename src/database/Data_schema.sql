-- DROP SCHEMA public;

CREATE SCHEMA public AUTHORIZATION lib_admin;

-- DROP TYPE public.gtrgm;

CREATE TYPE public.gtrgm (
	INPUT = gtrgm_in,
	OUTPUT = gtrgm_out,
	ALIGNMENT = 4,
	STORAGE = plain,
	CATEGORY = U,
	DELIMITER = ',');

-- DROP TYPE public.halfvec;

CREATE TYPE public.halfvec (
	INPUT = halfvec_in,
	OUTPUT = halfvec_out,
	RECEIVE = halfvec_recv,
	SEND = halfvec_send,
	TYPMOD_IN = halfvec_typmod_in,
	ALIGNMENT = 4,
	STORAGE = secondary,
	CATEGORY = U,
	DELIMITER = ',');

-- DROP TYPE public.intbig_gkey;

CREATE TYPE public.intbig_gkey (
	INPUT = _intbig_in,
	OUTPUT = _intbig_out,
	ALIGNMENT = 4,
	STORAGE = plain,
	CATEGORY = U,
	DELIMITER = ',');

-- DROP TYPE public.query_int;

CREATE TYPE public.query_int (
	INPUT = bqarr_in,
	OUTPUT = bqarr_out,
	ALIGNMENT = 4,
	STORAGE = plain,
	CATEGORY = U,
	DELIMITER = ',');

-- DROP TYPE public.sparsevec;

CREATE TYPE public.sparsevec (
	INPUT = sparsevec_in,
	OUTPUT = sparsevec_out,
	RECEIVE = sparsevec_recv,
	SEND = sparsevec_send,
	TYPMOD_IN = sparsevec_typmod_in,
	ALIGNMENT = 4,
	STORAGE = secondary,
	CATEGORY = U,
	DELIMITER = ',');

-- DROP TYPE public.vector;

CREATE TYPE public.vector (
	INPUT = vector_in,
	OUTPUT = vector_out,
	RECEIVE = vector_recv,
	SEND = vector_send,
	TYPMOD_IN = vector_typmod_in,
	ALIGNMENT = 4,
	STORAGE = secondary,
	CATEGORY = U,
	DELIMITER = ',');

-- DROP SEQUENCE public.branches_branch_id_seq;

CREATE SEQUENCE public.branches_branch_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE public.branches_branch_id_seq OWNER TO lib_admin;
GRANT ALL ON SEQUENCE public.branches_branch_id_seq TO lib_admin;

-- DROP SEQUENCE public.room_avail_avail_id_seq;

CREATE SEQUENCE public.room_avail_avail_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE public.room_avail_avail_id_seq OWNER TO lib_admin;
GRANT ALL ON SEQUENCE public.room_avail_avail_id_seq TO lib_admin;

-- DROP SEQUENCE public.room_avail_room_id_seq;

CREATE SEQUENCE public.room_avail_room_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE public.room_avail_room_id_seq OWNER TO lib_admin;
GRANT ALL ON SEQUENCE public.room_avail_room_id_seq TO lib_admin;

-- DROP SEQUENCE public.study_room_room_id_seq;

CREATE SEQUENCE public.study_room_room_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE public.study_room_room_id_seq OWNER TO lib_admin;
GRANT ALL ON SEQUENCE public.study_room_room_id_seq TO lib_admin;
-- public.announcements definition

-- Drop table

-- DROP TABLE public.announcements;

CREATE TABLE public.announcements (
	announce_id uuid DEFAULT gen_random_uuid() NOT NULL,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	expired_date date NULL,
	title text NULL,
	"content" text NULL,
	status varchar(20) DEFAULT 'draft'::character varying NOT NULL,
	CONSTRAINT announcements_pkey PRIMARY KEY (announce_id),
	CONSTRAINT chk_status CHECK (((status)::text = ANY (ARRAY[('draft'::character varying)::text, ('active'::character varying)::text, ('expired'::character varying)::text])))
);

-- Permissions

ALTER TABLE public.announcements OWNER TO lib_admin;
GRANT ALL ON TABLE public.announcements TO lib_admin;


-- public.books definition

-- Drop table

-- DROP TABLE public.books;

CREATE TABLE public.books (
	book_id varchar(20) NOT NULL,
	title text NULL,
	original_title text NULL,
	description text NULL,
	num_pages int4 NULL,
	publisher text NULL,
	publication_date date NULL,
	isbn varchar(50) NULL,
	rating float4 NULL,
	series text NULL,
	author _text NULL,
	language_code varchar(50) NULL,
	book_format varchar(50) NULL,
	genres _text NULL,
	image_url text NULL,
	price float4 NULL,
	embedding public.vector NULL,
	CONSTRAINT books_pk PRIMARY KEY (book_id)
);
CREATE INDEX books_author_immutable_trgm_idx ON public.books USING gin (immutable_array_to_string(author, ' '::text) gin_trgm_ops);
CREATE INDEX books_publisher_trgm_idx ON public.books USING gin (publisher gin_trgm_ops);
CREATE INDEX books_title_trgm_idx ON public.books USING gin (title gin_trgm_ops);
CREATE INDEX books_vector_hnsw_idx ON public.books USING hnsw (embedding vector_cosine_ops);

-- Permissions

ALTER TABLE public.books OWNER TO lib_admin;
GRANT ALL ON TABLE public.books TO lib_admin;


-- public.branches definition

-- Drop table

-- DROP TABLE public.branches;

CREATE TABLE public.branches (
	branch_id serial4 NOT NULL,
	"name" varchar(255) NOT NULL,
	name_short varchar(10) NOT NULL,
	address text NOT NULL,
	contact varchar(50) NOT NULL,
	CONSTRAINT branches_name_short_key UNIQUE (name_short),
	CONSTRAINT branches_pkey PRIMARY KEY (branch_id)
);

-- Permissions

ALTER TABLE public.branches OWNER TO lib_admin;
GRANT ALL ON TABLE public.branches TO lib_admin;


-- public."library" definition

-- Drop table

-- DROP TABLE public."library";

CREATE TABLE public."library" (
	book_id varchar(20) NOT NULL,
	branch_id int4 NOT NULL,
	quantity int4 DEFAULT 0 NOT NULL,
	available_quantity int4 DEFAULT 0 NOT NULL,
	shelf varchar(20) NULL,
	CONSTRAINT chk_available_qty CHECK ((available_quantity <= quantity)),
	CONSTRAINT library_pkey PRIMARY KEY (book_id, branch_id)
);
CREATE INDEX idx_library_book_branch ON public.library USING btree (book_id, branch_id);

-- Permissions

ALTER TABLE public."library" OWNER TO lib_admin;
GRANT ALL ON TABLE public."library" TO lib_admin;


-- public.otp_store definition

-- Drop table

-- DROP TABLE public.otp_store;

CREATE TABLE public.otp_store (
	email varchar(255) NOT NULL,
	otp varchar(10) NOT NULL,
	expired_at timestamp NOT NULL,
	verified bool DEFAULT false NULL,
	CONSTRAINT otp_store_pkey PRIMARY KEY (email)
);

-- Permissions

ALTER TABLE public.otp_store OWNER TO lib_admin;
GRANT ALL ON TABLE public.otp_store TO lib_admin;


-- public.pending_users definition

-- Drop table

-- DROP TABLE public.pending_users;

CREATE TABLE public.pending_users (
	"token" uuid NOT NULL,
	email varchar(255) NOT NULL,
	password_hash varchar(255) NOT NULL,
	username varchar(100) NOT NULL,
	"role" varchar(20) DEFAULT 'user'::character varying NOT NULL,
	expired_at timestamp NOT NULL,
	CONSTRAINT chk_role CHECK (((role)::text = ANY (ARRAY[('admin'::character varying)::text, ('librarian'::character varying)::text, ('user'::character varying)::text]))),
	CONSTRAINT pending_users_pkey PRIMARY KEY (token)
);

-- Permissions

ALTER TABLE public.pending_users OWNER TO lib_admin;
GRANT ALL ON TABLE public.pending_users TO lib_admin;


-- public.study_room definition

-- Drop table

-- DROP TABLE public.study_room;

CREATE TABLE public.study_room (
	room_id serial4 NOT NULL,
	branch_id int4 NOT NULL,
	room_name varchar(30) NOT NULL,
	tv_num int4 DEFAULT 0 NULL,
	board_num int4 DEFAULT 0 NULL,
	socket_num int4 DEFAULT 0 NULL,
	capacity int4 DEFAULT 0 NOT NULL,
	description text NULL,
	projector_num int4 NULL,
	img_url text NULL,
	CONSTRAINT chk_boardnum_positive CHECK ((board_num >= 0)),
	CONSTRAINT chk_capacity_positive CHECK ((capacity >= 0)),
	CONSTRAINT chk_projector_num_positive CHECK ((projector_num >= 0)),
	CONSTRAINT chk_socketnum_positive CHECK ((socket_num >= 0)),
	CONSTRAINT chk_tvnum_positve CHECK ((tv_num >= 0)),
	CONSTRAINT study_room_pkey PRIMARY KEY (room_id)
);

-- Permissions

ALTER TABLE public.study_room OWNER TO lib_admin;
GRANT ALL ON TABLE public.study_room TO lib_admin;


-- public.room_avail definition

-- Drop table

-- DROP TABLE public.room_avail;

CREATE TABLE public.room_avail (
	avail_id int4 DEFAULT nextval('room_avail_room_id_seq'::regclass) NOT NULL,
	room_id int4 GENERATED BY DEFAULT AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	start_time time DEFAULT '07:30:00'::time without time zone NOT NULL,
	end_time time DEFAULT '17:30:00'::time without time zone NOT NULL,
	CONSTRAINT chk_start_end CHECK ((start_time < end_time)),
	CONSTRAINT room_avail_pkey PRIMARY KEY (avail_id),
	CONSTRAINT fk_availroom_room FOREIGN KEY (room_id) REFERENCES public.study_room(room_id)
);

-- Permissions

ALTER TABLE public.room_avail OWNER TO lib_admin;
GRANT ALL ON TABLE public.room_avail TO lib_admin;


-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	user_id uuid DEFAULT gen_random_uuid() NOT NULL,
	branch_id int4 NULL,
	email varchar(255) NOT NULL,
	password_hash varchar(255) NOT NULL,
	username varchar(100) NOT NULL,
	phone_number varchar(20) NULL,
	avatar varchar(2048) NULL,
	gender varchar(10) NULL,
	birth_date date NULL,
	hometown varchar(255) NULL,
	occupation varchar(150) NULL,
	description text NULL,
	"role" varchar(20) DEFAULT 'user'::character varying NOT NULL,
	borrow_num int4 DEFAULT 0 NOT NULL,
	CONSTRAINT chk_gender CHECK (((gender)::text = ANY (ARRAY[('male'::character varying)::text, ('female'::character varying)::text]))),
	CONSTRAINT chk_role CHECK (((role)::text = ANY (ARRAY[('admin'::character varying)::text, ('librarian'::character varying)::text, ('user'::character varying)::text]))),
	CONSTRAINT users_email_key UNIQUE (email),
	CONSTRAINT users_pkey PRIMARY KEY (user_id),
	CONSTRAINT fk_user_branch FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id)
);

-- Permissions

ALTER TABLE public.users OWNER TO lib_admin;
GRANT ALL ON TABLE public.users TO lib_admin;


-- public.borrow_book definition

-- Drop table

-- DROP TABLE public.borrow_book;

CREATE TABLE public.borrow_book (
	borrow_id uuid DEFAULT gen_random_uuid() NOT NULL,
	user_id uuid NOT NULL,
	book_id varchar(20) NOT NULL,
	branch_id int4 NOT NULL,
	reserve_date date DEFAULT CURRENT_DATE NOT NULL,
	borrow_date date NULL,
	due_date date NULL,
	pin varchar(10) NULL,
	expired_at timestamp NULL,
	status varchar(20) DEFAULT 'reserved'::character varying NOT NULL,
	CONSTRAINT borrow_book_pin_key UNIQUE (pin),
	CONSTRAINT borrow_book_pkey PRIMARY KEY (borrow_id),
	CONSTRAINT chk_borrow_dates CHECK ((due_date >= borrow_date)),
	CONSTRAINT chk_status CHECK (((status)::text = ANY (ARRAY[('reserved'::character varying)::text, ('pending'::character varying)::text, ('borrowed'::character varying)::text]))),
	CONSTRAINT fk_borrowbook_book FOREIGN KEY (book_id) REFERENCES public.books(book_id) ON DELETE RESTRICT,
	CONSTRAINT fk_borrowbook_branch FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id) ON DELETE CASCADE,
	CONSTRAINT fk_borrowbook_user FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE
);
CREATE INDEX idx_borrow_book_book_status ON public.borrow_book USING btree (book_id, status);
CREATE INDEX idx_borrow_book_expired ON public.borrow_book USING btree (expired_at) WHERE ((status)::text = 'pending'::text);
CREATE INDEX idx_borrow_book_user_status ON public.borrow_book USING btree (user_id, status);

-- Permissions

ALTER TABLE public.borrow_book OWNER TO lib_admin;
GRANT ALL ON TABLE public.borrow_book TO lib_admin;


-- public.damage definition

-- Drop table

-- DROP TABLE public.damage;

CREATE TABLE public.damage (
	damage_id uuid DEFAULT gen_random_uuid() NOT NULL,
	borrow_id uuid NOT NULL,
	acm_date date DEFAULT CURRENT_DATE NOT NULL,
	lose bool DEFAULT false NULL,
	torn bool DEFAULT false NULL,
	CONSTRAINT damage_pkey PRIMARY KEY (damage_id),
	CONSTRAINT fk_damage_borrowbook FOREIGN KEY (borrow_id) REFERENCES public.borrow_book(borrow_id) ON DELETE CASCADE
);

-- Permissions

ALTER TABLE public.damage OWNER TO lib_admin;
GRANT ALL ON TABLE public.damage TO lib_admin;


-- public.recommends definition

-- Drop table

-- DROP TABLE public.recommends;

CREATE TABLE public.recommends (
	recommend_id uuid DEFAULT gen_random_uuid() NOT NULL,
	user_id uuid NOT NULL,
	book_id varchar(255) NOT NULL,
	showed_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	is_clicked bool DEFAULT false NOT NULL,
	renewed_at timestamp NULL,
	score float4 DEFAULT 0.0 NOT NULL,
	CONSTRAINT recommends_pkey PRIMARY KEY (recommend_id),
	CONSTRAINT fk_recommend_book FOREIGN KEY (book_id) REFERENCES public.books(book_id),
	CONSTRAINT fk_recommend_user FOREIGN KEY (user_id) REFERENCES public.users(user_id),
	CONSTRAINT fk_recommends_book FOREIGN KEY (book_id) REFERENCES public.books(book_id) ON DELETE CASCADE,
	CONSTRAINT fk_recommends_user FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE
);
CREATE UNIQUE INDEX idx_active_recommendations ON public.recommends USING btree (user_id, book_id) WHERE (renewed_at IS NULL);
CREATE INDEX idx_recommends_click_features ON public.recommends USING btree (user_id, book_id, is_clicked, renewed_at);
CREATE INDEX idx_recommends_user_active ON public.recommends USING btree (user_id) WHERE (renewed_at IS NULL);
CREATE UNIQUE INDEX unique_user_book_active_recommend ON public.recommends USING btree (user_id, book_id) WHERE (renewed_at IS NULL);

-- Permissions

ALTER TABLE public.recommends OWNER TO lib_admin;
GRANT ALL ON TABLE public.recommends TO lib_admin;


-- public.reserve_room definition

-- Drop table

-- DROP TABLE public.reserve_room;

CREATE TABLE public.reserve_room (
	reserve_id uuid DEFAULT gen_random_uuid() NOT NULL,
	user_id uuid NOT NULL,
	avail_id int4 NOT NULL,
	start_date date NOT NULL,
	checkin_time timestamp NULL,
	pin varchar(10) NULL,
	expired_at timestamp NULL,
	status varchar(20) DEFAULT 'reserved'::character varying NOT NULL,
	CONSTRAINT chk_status CHECK (((status)::text = ANY (ARRAY[('pending'::character varying)::text, ('reserved'::character varying)::text, ('used'::character varying)::text]))),
	CONSTRAINT reserve_room_pin_key UNIQUE (pin),
	CONSTRAINT reserve_room_pkey PRIMARY KEY (reserve_id),
	CONSTRAINT fk_reserve_availroom FOREIGN KEY (avail_id) REFERENCES public.room_avail(avail_id) ON DELETE CASCADE,
	CONSTRAINT fk_reserve_user FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE
);
CREATE UNIQUE INDEX uq_reserve_room_active_slot ON public.reserve_room USING btree (avail_id, start_date) WHERE ((status)::text = ANY ((ARRAY['pending'::character varying, 'reserved'::character varying, 'used'::character varying])::text[]));

-- Permissions

ALTER TABLE public.reserve_room OWNER TO lib_admin;
GRANT ALL ON TABLE public.reserve_room TO lib_admin;


-- public.return_book definition

-- Drop table

-- DROP TABLE public.return_book;

CREATE TABLE public.return_book (
	return_id uuid DEFAULT gen_random_uuid() NOT NULL,
	borrow_id uuid NOT NULL,
	branch_id int4 NOT NULL,
	return_date date DEFAULT CURRENT_DATE NOT NULL,
	CONSTRAINT return_book_borrow_id_key UNIQUE (borrow_id),
	CONSTRAINT return_book_pkey PRIMARY KEY (return_id),
	CONSTRAINT fk_returnbook_borrowbook FOREIGN KEY (borrow_id) REFERENCES public.borrow_book(borrow_id) ON DELETE CASCADE,
	CONSTRAINT fk_returnbook_branch FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id) ON DELETE CASCADE
);

-- Permissions

ALTER TABLE public.return_book OWNER TO lib_admin;
GRANT ALL ON TABLE public.return_book TO lib_admin;


-- public.return_room definition

-- Drop table

-- DROP TABLE public.return_room;

CREATE TABLE public.return_room (
	return_id uuid DEFAULT gen_random_uuid() NOT NULL,
	reserve_id uuid NOT NULL,
	checkout_time timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT return_room_pkey PRIMARY KEY (return_id),
	CONSTRAINT fk_returnroom_reserve FOREIGN KEY (reserve_id) REFERENCES public.reserve_room(reserve_id) ON DELETE CASCADE
);

-- Permissions

ALTER TABLE public.return_room OWNER TO lib_admin;
GRANT ALL ON TABLE public.return_room TO lib_admin;


-- public.search_history definition

-- Drop table

-- DROP TABLE public.search_history;

CREATE TABLE public.search_history (
	search_id uuid DEFAULT gen_random_uuid() NOT NULL,
	user_id uuid NOT NULL,
	book_clicked varchar(20) NULL,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	search_content text NULL,
	filters jsonb NULL,
	CONSTRAINT search_history_pkey PRIMARY KEY (search_id),
	CONSTRAINT fk_search_book FOREIGN KEY (book_clicked) REFERENCES public.books(book_id) ON DELETE SET NULL,
	CONSTRAINT fk_search_user FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE
);

-- Permissions

ALTER TABLE public.search_history OWNER TO lib_admin;
GRANT ALL ON TABLE public.search_history TO lib_admin;


-- public.study_group definition

-- Drop table

-- DROP TABLE public.study_group;

CREATE TABLE public.study_group (
	group_id uuid DEFAULT gen_random_uuid() NOT NULL,
	created_by uuid NOT NULL,
	reserve_id uuid NOT NULL,
	subject varchar(30) NOT NULL,
	title text NOT NULL,
	description text NULL,
	requirements _text NULL,
	capacity int4 NOT NULL,
	current_num int4 DEFAULT 1 NOT NULL,
	status varchar(20) DEFAULT 'upcoming'::character varying NOT NULL,
	CONSTRAINT chk_capacity_currentnum CHECK ((current_num <= capacity)),
	CONSTRAINT chk_capacity_positive CHECK ((capacity > 0)),
	CONSTRAINT chk_currentnum_positive CHECK ((current_num >= 0)),
	CONSTRAINT chk_status CHECK (((status)::text = ANY (ARRAY[('upcoming'::character varying)::text, ('full'::character varying)::text, ('cancelled'::character varying)::text, ('inprogress'::character varying)::text, ('completed'::character varying)::text, ('expired'::character varying)::text]))),
	CONSTRAINT study_group_pkey PRIMARY KEY (group_id),
	CONSTRAINT study_group_reserve_id_key UNIQUE (reserve_id),
	CONSTRAINT fk_studygroup_reserveroom FOREIGN KEY (reserve_id) REFERENCES public.reserve_room(reserve_id) ON DELETE CASCADE,
	CONSTRAINT fk_studygroup_user FOREIGN KEY (created_by) REFERENCES public.users(user_id) ON DELETE CASCADE
);

-- Permissions

ALTER TABLE public.study_group OWNER TO lib_admin;
GRANT ALL ON TABLE public.study_group TO lib_admin;


-- public.user_wishlist definition

-- Drop table

-- DROP TABLE public.user_wishlist;

CREATE TABLE public.user_wishlist (
	wish_id uuid DEFAULT gen_random_uuid() NOT NULL,
	user_id uuid NOT NULL,
	book_id varchar(255) NOT NULL,
	added_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT unique_user_book_wishlist UNIQUE (user_id, book_id),
	CONSTRAINT uq_user_book_wishlist UNIQUE (user_id, book_id),
	CONSTRAINT user_wishlist_pkey PRIMARY KEY (wish_id),
	CONSTRAINT fk_wishlist_book FOREIGN KEY (book_id) REFERENCES public.books(book_id) ON DELETE CASCADE,
	CONSTRAINT fk_wishlist_user FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE
);

-- Permissions

ALTER TABLE public.user_wishlist OWNER TO lib_admin;
GRANT ALL ON TABLE public.user_wishlist TO lib_admin;


-- public.book_penalty definition

-- Drop table

-- DROP TABLE public.book_penalty;

CREATE TABLE public.book_penalty (
	penalty_id uuid DEFAULT gen_random_uuid() NOT NULL,
	borrow_id uuid NULL,
	return_id uuid NULL,
	user_id uuid NOT NULL,
	description text NULL,
	record_date date NULL,
	penalty_amount numeric(10, 2) DEFAULT 0.00 NULL,
	issue varchar(20) NULL,
	is_paid bool DEFAULT false NULL,
	paid_at timestamp NULL,
	CONSTRAINT book_penalty_borrow_id_key UNIQUE (borrow_id),
	CONSTRAINT book_penalty_pkey PRIMARY KEY (penalty_id),
	CONSTRAINT chk_issue CHECK (((issue)::text = ANY (ARRAY[('overdue'::character varying)::text, ('damaged'::character varying)::text, ('lost'::character varying)::text, ('combined'::character varying)::text]))),
	CONSTRAINT fk_penalty_borrowbook FOREIGN KEY (borrow_id) REFERENCES public.borrow_book(borrow_id) ON DELETE SET NULL,
	CONSTRAINT fk_penalty_returnbook FOREIGN KEY (return_id) REFERENCES public.return_book(return_id) ON DELETE SET NULL,
	CONSTRAINT fk_penalty_user FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE
);

-- Permissions

ALTER TABLE public.book_penalty OWNER TO lib_admin;
GRANT ALL ON TABLE public.book_penalty TO lib_admin;


-- public.group_request definition

-- Drop table

-- DROP TABLE public.group_request;

CREATE TABLE public.group_request (
	request_id uuid DEFAULT gen_random_uuid() NOT NULL,
	group_id uuid NOT NULL,
	user_id uuid NOT NULL,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"content" text NULL,
	status varchar(20) DEFAULT 'pending'::character varying NOT NULL,
	CONSTRAINT chk_status CHECK (((status)::text = ANY (ARRAY[('pending'::character varying)::text, ('approved'::character varying)::text, ('denied'::character varying)::text, ('expired'::character varying)::text]))),
	CONSTRAINT group_request_pkey PRIMARY KEY (request_id),
	CONSTRAINT fk_request_studygroup FOREIGN KEY (group_id) REFERENCES public.study_group(group_id) ON DELETE CASCADE,
	CONSTRAINT fk_request_user FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE
);
CREATE UNIQUE INDEX uq_group_request_active_participation ON public.group_request USING btree (group_id, user_id) WHERE ((status)::text = ANY ((ARRAY['pending'::character varying, 'approved'::character varying])::text[]));

-- Permissions

ALTER TABLE public.group_request OWNER TO lib_admin;
GRANT ALL ON TABLE public.group_request TO lib_admin;


-- public.loan definition

-- Drop table

-- DROP TABLE public.loan;

CREATE TABLE public.loan (
	loan_id uuid DEFAULT gen_random_uuid() NOT NULL,
	return_id uuid NULL,
	damage_id uuid NULL,
	user_id uuid NOT NULL,
	recog_date date DEFAULT CURRENT_DATE NOT NULL,
	loss bool DEFAULT false NULL,
	torn bool DEFAULT false NULL,
	overdue bool DEFAULT false NULL,
	recog_loan numeric(10, 2) DEFAULT 0.00 NULL,
	paid bool DEFAULT false NULL,
	CONSTRAINT loan_pkey PRIMARY KEY (loan_id),
	CONSTRAINT fk_loan_damge FOREIGN KEY (damage_id) REFERENCES public.damage(damage_id) ON DELETE SET NULL,
	CONSTRAINT fk_loan_return FOREIGN KEY (return_id) REFERENCES public.return_room(return_id) ON DELETE SET NULL,
	CONSTRAINT fk_loan_user FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE
);

-- Permissions

ALTER TABLE public.loan OWNER TO lib_admin;
GRANT ALL ON TABLE public.loan TO lib_admin;



-- DROP FUNCTION public._int_contained(_int4, _int4);

CREATE OR REPLACE FUNCTION public._int_contained(integer[], integer[])
 RETURNS boolean
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$_int_contained$function$
;

COMMENT ON FUNCTION public._int_contained(_int4, _int4) IS 'contained in';

-- Permissions

ALTER FUNCTION public._int_contained(_int4, _int4) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public._int_contained(_int4, _int4) TO lib_admin;

-- DROP FUNCTION public._int_contained_joinsel(internal, oid, internal, int2, internal);

CREATE OR REPLACE FUNCTION public._int_contained_joinsel(internal, oid, internal, smallint, internal)
 RETURNS double precision
 LANGUAGE c
 STABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$_int_contained_joinsel$function$
;

-- Permissions

ALTER FUNCTION public._int_contained_joinsel(internal, oid, internal, int2, internal) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public._int_contained_joinsel(internal, oid, internal, int2, internal) TO lib_admin;

-- DROP FUNCTION public._int_contained_sel(internal, oid, internal, int4);

CREATE OR REPLACE FUNCTION public._int_contained_sel(internal, oid, internal, integer)
 RETURNS double precision
 LANGUAGE c
 STABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$_int_contained_sel$function$
;

-- Permissions

ALTER FUNCTION public._int_contained_sel(internal, oid, internal, int4) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public._int_contained_sel(internal, oid, internal, int4) TO lib_admin;

-- DROP FUNCTION public._int_contains(_int4, _int4);

CREATE OR REPLACE FUNCTION public._int_contains(integer[], integer[])
 RETURNS boolean
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$_int_contains$function$
;

COMMENT ON FUNCTION public._int_contains(_int4, _int4) IS 'contains';

-- Permissions

ALTER FUNCTION public._int_contains(_int4, _int4) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public._int_contains(_int4, _int4) TO lib_admin;

-- DROP FUNCTION public._int_contains_joinsel(internal, oid, internal, int2, internal);

CREATE OR REPLACE FUNCTION public._int_contains_joinsel(internal, oid, internal, smallint, internal)
 RETURNS double precision
 LANGUAGE c
 STABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$_int_contains_joinsel$function$
;

-- Permissions

ALTER FUNCTION public._int_contains_joinsel(internal, oid, internal, int2, internal) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public._int_contains_joinsel(internal, oid, internal, int2, internal) TO lib_admin;

-- DROP FUNCTION public._int_contains_sel(internal, oid, internal, int4);

CREATE OR REPLACE FUNCTION public._int_contains_sel(internal, oid, internal, integer)
 RETURNS double precision
 LANGUAGE c
 STABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$_int_contains_sel$function$
;

-- Permissions

ALTER FUNCTION public._int_contains_sel(internal, oid, internal, int4) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public._int_contains_sel(internal, oid, internal, int4) TO lib_admin;

-- DROP FUNCTION public._int_different(_int4, _int4);

CREATE OR REPLACE FUNCTION public._int_different(integer[], integer[])
 RETURNS boolean
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$_int_different$function$
;

COMMENT ON FUNCTION public._int_different(_int4, _int4) IS 'different';

-- Permissions

ALTER FUNCTION public._int_different(_int4, _int4) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public._int_different(_int4, _int4) TO lib_admin;

-- DROP FUNCTION public._int_inter(_int4, _int4);

CREATE OR REPLACE FUNCTION public._int_inter(integer[], integer[])
 RETURNS integer[]
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$_int_inter$function$
;

-- Permissions

ALTER FUNCTION public._int_inter(_int4, _int4) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public._int_inter(_int4, _int4) TO lib_admin;

-- DROP FUNCTION public._int_matchsel(internal, oid, internal, int4);

CREATE OR REPLACE FUNCTION public._int_matchsel(internal, oid, internal, integer)
 RETURNS double precision
 LANGUAGE c
 STABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$_int_matchsel$function$
;

-- Permissions

ALTER FUNCTION public._int_matchsel(internal, oid, internal, int4) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public._int_matchsel(internal, oid, internal, int4) TO lib_admin;

-- DROP FUNCTION public._int_overlap(_int4, _int4);

CREATE OR REPLACE FUNCTION public._int_overlap(integer[], integer[])
 RETURNS boolean
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$_int_overlap$function$
;

COMMENT ON FUNCTION public._int_overlap(_int4, _int4) IS 'overlaps';

-- Permissions

ALTER FUNCTION public._int_overlap(_int4, _int4) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public._int_overlap(_int4, _int4) TO lib_admin;

-- DROP FUNCTION public._int_overlap_joinsel(internal, oid, internal, int2, internal);

CREATE OR REPLACE FUNCTION public._int_overlap_joinsel(internal, oid, internal, smallint, internal)
 RETURNS double precision
 LANGUAGE c
 STABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$_int_overlap_joinsel$function$
;

-- Permissions

ALTER FUNCTION public._int_overlap_joinsel(internal, oid, internal, int2, internal) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public._int_overlap_joinsel(internal, oid, internal, int2, internal) TO lib_admin;

-- DROP FUNCTION public._int_overlap_sel(internal, oid, internal, int4);

CREATE OR REPLACE FUNCTION public._int_overlap_sel(internal, oid, internal, integer)
 RETURNS double precision
 LANGUAGE c
 STABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$_int_overlap_sel$function$
;

-- Permissions

ALTER FUNCTION public._int_overlap_sel(internal, oid, internal, int4) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public._int_overlap_sel(internal, oid, internal, int4) TO lib_admin;

-- DROP FUNCTION public._int_same(_int4, _int4);

CREATE OR REPLACE FUNCTION public._int_same(integer[], integer[])
 RETURNS boolean
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$_int_same$function$
;

COMMENT ON FUNCTION public._int_same(_int4, _int4) IS 'same as';

-- Permissions

ALTER FUNCTION public._int_same(_int4, _int4) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public._int_same(_int4, _int4) TO lib_admin;

-- DROP FUNCTION public._int_union(_int4, _int4);

CREATE OR REPLACE FUNCTION public._int_union(integer[], integer[])
 RETURNS integer[]
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$_int_union$function$
;

-- Permissions

ALTER FUNCTION public._int_union(_int4, _int4) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public._int_union(_int4, _int4) TO lib_admin;

-- DROP FUNCTION public._intbig_in(cstring);

CREATE OR REPLACE FUNCTION public._intbig_in(cstring)
 RETURNS intbig_gkey
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$_intbig_in$function$
;

-- Permissions

ALTER FUNCTION public._intbig_in(cstring) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public._intbig_in(cstring) TO lib_admin;

-- DROP FUNCTION public._intbig_out(intbig_gkey);

CREATE OR REPLACE FUNCTION public._intbig_out(intbig_gkey)
 RETURNS cstring
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$_intbig_out$function$
;

-- Permissions

ALTER FUNCTION public._intbig_out(intbig_gkey) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public._intbig_out(intbig_gkey) TO lib_admin;

-- DROP FUNCTION public.array_to_halfvec(_float4, int4, bool);

CREATE OR REPLACE FUNCTION public.array_to_halfvec(real[], integer, boolean)
 RETURNS halfvec
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$array_to_halfvec$function$
;

-- Permissions

ALTER FUNCTION public.array_to_halfvec(_float4, int4, bool) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.array_to_halfvec(_float4, int4, bool) TO lib_admin;

-- DROP FUNCTION public.array_to_halfvec(_int4, int4, bool);

CREATE OR REPLACE FUNCTION public.array_to_halfvec(integer[], integer, boolean)
 RETURNS halfvec
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$array_to_halfvec$function$
;

-- Permissions

ALTER FUNCTION public.array_to_halfvec(_int4, int4, bool) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.array_to_halfvec(_int4, int4, bool) TO lib_admin;

-- DROP FUNCTION public.array_to_halfvec(_float8, int4, bool);

CREATE OR REPLACE FUNCTION public.array_to_halfvec(double precision[], integer, boolean)
 RETURNS halfvec
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$array_to_halfvec$function$
;

-- Permissions

ALTER FUNCTION public.array_to_halfvec(_float8, int4, bool) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.array_to_halfvec(_float8, int4, bool) TO lib_admin;

-- DROP FUNCTION public.array_to_halfvec(_numeric, int4, bool);

CREATE OR REPLACE FUNCTION public.array_to_halfvec(numeric[], integer, boolean)
 RETURNS halfvec
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$array_to_halfvec$function$
;

-- Permissions

ALTER FUNCTION public.array_to_halfvec(_numeric, int4, bool) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.array_to_halfvec(_numeric, int4, bool) TO lib_admin;

-- DROP FUNCTION public.array_to_sparsevec(_float4, int4, bool);

CREATE OR REPLACE FUNCTION public.array_to_sparsevec(real[], integer, boolean)
 RETURNS sparsevec
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$array_to_sparsevec$function$
;

-- Permissions

ALTER FUNCTION public.array_to_sparsevec(_float4, int4, bool) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.array_to_sparsevec(_float4, int4, bool) TO lib_admin;

-- DROP FUNCTION public.array_to_sparsevec(_int4, int4, bool);

CREATE OR REPLACE FUNCTION public.array_to_sparsevec(integer[], integer, boolean)
 RETURNS sparsevec
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$array_to_sparsevec$function$
;

-- Permissions

ALTER FUNCTION public.array_to_sparsevec(_int4, int4, bool) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.array_to_sparsevec(_int4, int4, bool) TO lib_admin;

-- DROP FUNCTION public.array_to_sparsevec(_numeric, int4, bool);

CREATE OR REPLACE FUNCTION public.array_to_sparsevec(numeric[], integer, boolean)
 RETURNS sparsevec
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$array_to_sparsevec$function$
;

-- Permissions

ALTER FUNCTION public.array_to_sparsevec(_numeric, int4, bool) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.array_to_sparsevec(_numeric, int4, bool) TO lib_admin;

-- DROP FUNCTION public.array_to_sparsevec(_float8, int4, bool);

CREATE OR REPLACE FUNCTION public.array_to_sparsevec(double precision[], integer, boolean)
 RETURNS sparsevec
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$array_to_sparsevec$function$
;

-- Permissions

ALTER FUNCTION public.array_to_sparsevec(_float8, int4, bool) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.array_to_sparsevec(_float8, int4, bool) TO lib_admin;

-- DROP FUNCTION public.array_to_vector(_int4, int4, bool);

CREATE OR REPLACE FUNCTION public.array_to_vector(integer[], integer, boolean)
 RETURNS vector
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$array_to_vector$function$
;

-- Permissions

ALTER FUNCTION public.array_to_vector(_int4, int4, bool) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.array_to_vector(_int4, int4, bool) TO lib_admin;

-- DROP FUNCTION public.array_to_vector(_float8, int4, bool);

CREATE OR REPLACE FUNCTION public.array_to_vector(double precision[], integer, boolean)
 RETURNS vector
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$array_to_vector$function$
;

-- Permissions

ALTER FUNCTION public.array_to_vector(_float8, int4, bool) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.array_to_vector(_float8, int4, bool) TO lib_admin;

-- DROP FUNCTION public.array_to_vector(_numeric, int4, bool);

CREATE OR REPLACE FUNCTION public.array_to_vector(numeric[], integer, boolean)
 RETURNS vector
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$array_to_vector$function$
;

-- Permissions

ALTER FUNCTION public.array_to_vector(_numeric, int4, bool) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.array_to_vector(_numeric, int4, bool) TO lib_admin;

-- DROP FUNCTION public.array_to_vector(_float4, int4, bool);

CREATE OR REPLACE FUNCTION public.array_to_vector(real[], integer, boolean)
 RETURNS vector
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$array_to_vector$function$
;

-- Permissions

ALTER FUNCTION public.array_to_vector(_float4, int4, bool) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.array_to_vector(_float4, int4, bool) TO lib_admin;

-- DROP AGGREGATE public.avg(vector);

-- Aggregate function public.avg(vector)
-- ERROR: more than one function named "public.avg";

-- Permissions

ALTER AGGREGATE public.avg(vector) OWNER TO lib_admin;
GRANT ALL ON AGGREGATE public.avg(vector) TO lib_admin;

-- DROP AGGREGATE public.avg(halfvec);

-- Aggregate function public.avg(halfvec)
-- ERROR: more than one function named "public.avg";

-- Permissions

ALTER AGGREGATE public.avg(halfvec) OWNER TO lib_admin;
GRANT ALL ON AGGREGATE public.avg(halfvec) TO lib_admin;

-- DROP FUNCTION public.binary_quantize(vector);

CREATE OR REPLACE FUNCTION public.binary_quantize(vector)
 RETURNS bit
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$binary_quantize$function$
;

-- Permissions

ALTER FUNCTION public.binary_quantize(vector) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.binary_quantize(vector) TO lib_admin;

-- DROP FUNCTION public.binary_quantize(halfvec);

CREATE OR REPLACE FUNCTION public.binary_quantize(halfvec)
 RETURNS bit
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$halfvec_binary_quantize$function$
;

-- Permissions

ALTER FUNCTION public.binary_quantize(halfvec) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.binary_quantize(halfvec) TO lib_admin;

-- DROP FUNCTION public.boolop(_int4, query_int);

CREATE OR REPLACE FUNCTION public.boolop(integer[], query_int)
 RETURNS boolean
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$boolop$function$
;

COMMENT ON FUNCTION public.boolop(_int4, query_int) IS 'boolean operation with array';

-- Permissions

ALTER FUNCTION public.boolop(_int4, query_int) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.boolop(_int4, query_int) TO lib_admin;

-- DROP FUNCTION public.bqarr_in(cstring);

CREATE OR REPLACE FUNCTION public.bqarr_in(cstring)
 RETURNS query_int
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$bqarr_in$function$
;

-- Permissions

ALTER FUNCTION public.bqarr_in(cstring) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.bqarr_in(cstring) TO lib_admin;

-- DROP FUNCTION public.bqarr_out(query_int);

CREATE OR REPLACE FUNCTION public.bqarr_out(query_int)
 RETURNS cstring
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$bqarr_out$function$
;

-- Permissions

ALTER FUNCTION public.bqarr_out(query_int) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.bqarr_out(query_int) TO lib_admin;

-- DROP FUNCTION public.cosine_distance(vector, vector);

CREATE OR REPLACE FUNCTION public.cosine_distance(vector, vector)
 RETURNS double precision
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$cosine_distance$function$
;

-- Permissions

ALTER FUNCTION public.cosine_distance(vector, vector) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.cosine_distance(vector, vector) TO lib_admin;

-- DROP FUNCTION public.cosine_distance(halfvec, halfvec);

CREATE OR REPLACE FUNCTION public.cosine_distance(halfvec, halfvec)
 RETURNS double precision
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$halfvec_cosine_distance$function$
;

-- Permissions

ALTER FUNCTION public.cosine_distance(halfvec, halfvec) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.cosine_distance(halfvec, halfvec) TO lib_admin;

-- DROP FUNCTION public.cosine_distance(sparsevec, sparsevec);

CREATE OR REPLACE FUNCTION public.cosine_distance(sparsevec, sparsevec)
 RETURNS double precision
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$sparsevec_cosine_distance$function$
;

-- Permissions

ALTER FUNCTION public.cosine_distance(sparsevec, sparsevec) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.cosine_distance(sparsevec, sparsevec) TO lib_admin;

-- DROP FUNCTION public.g_int_compress(internal);

CREATE OR REPLACE FUNCTION public.g_int_compress(internal)
 RETURNS internal
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$g_int_compress$function$
;

-- Permissions

ALTER FUNCTION public.g_int_compress(internal) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.g_int_compress(internal) TO lib_admin;

-- DROP FUNCTION public.g_int_consistent(internal, _int4, int2, oid, internal);

CREATE OR REPLACE FUNCTION public.g_int_consistent(internal, integer[], smallint, oid, internal)
 RETURNS boolean
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$g_int_consistent$function$
;

-- Permissions

ALTER FUNCTION public.g_int_consistent(internal, _int4, int2, oid, internal) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.g_int_consistent(internal, _int4, int2, oid, internal) TO lib_admin;

-- DROP FUNCTION public.g_int_decompress(internal);

CREATE OR REPLACE FUNCTION public.g_int_decompress(internal)
 RETURNS internal
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$g_int_decompress$function$
;

-- Permissions

ALTER FUNCTION public.g_int_decompress(internal) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.g_int_decompress(internal) TO lib_admin;

-- DROP FUNCTION public.g_int_options(internal);

CREATE OR REPLACE FUNCTION public.g_int_options(internal)
 RETURNS void
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE
AS '$libdir/_int', $function$g_int_options$function$
;

-- Permissions

ALTER FUNCTION public.g_int_options(internal) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.g_int_options(internal) TO lib_admin;

-- DROP FUNCTION public.g_int_penalty(internal, internal, internal);

CREATE OR REPLACE FUNCTION public.g_int_penalty(internal, internal, internal)
 RETURNS internal
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$g_int_penalty$function$
;

-- Permissions

ALTER FUNCTION public.g_int_penalty(internal, internal, internal) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.g_int_penalty(internal, internal, internal) TO lib_admin;

-- DROP FUNCTION public.g_int_picksplit(internal, internal);

CREATE OR REPLACE FUNCTION public.g_int_picksplit(internal, internal)
 RETURNS internal
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$g_int_picksplit$function$
;

-- Permissions

ALTER FUNCTION public.g_int_picksplit(internal, internal) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.g_int_picksplit(internal, internal) TO lib_admin;

-- DROP FUNCTION public.g_int_same(_int4, _int4, internal);

CREATE OR REPLACE FUNCTION public.g_int_same(integer[], integer[], internal)
 RETURNS internal
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$g_int_same$function$
;

-- Permissions

ALTER FUNCTION public.g_int_same(_int4, _int4, internal) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.g_int_same(_int4, _int4, internal) TO lib_admin;

-- DROP FUNCTION public.g_int_union(internal, internal);

CREATE OR REPLACE FUNCTION public.g_int_union(internal, internal)
 RETURNS integer[]
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$g_int_union$function$
;

-- Permissions

ALTER FUNCTION public.g_int_union(internal, internal) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.g_int_union(internal, internal) TO lib_admin;

-- DROP FUNCTION public.g_intbig_compress(internal);

CREATE OR REPLACE FUNCTION public.g_intbig_compress(internal)
 RETURNS internal
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$g_intbig_compress$function$
;

-- Permissions

ALTER FUNCTION public.g_intbig_compress(internal) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.g_intbig_compress(internal) TO lib_admin;

-- DROP FUNCTION public.g_intbig_consistent(internal, _int4, int2, oid, internal);

CREATE OR REPLACE FUNCTION public.g_intbig_consistent(internal, integer[], smallint, oid, internal)
 RETURNS boolean
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$g_intbig_consistent$function$
;

-- Permissions

ALTER FUNCTION public.g_intbig_consistent(internal, _int4, int2, oid, internal) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.g_intbig_consistent(internal, _int4, int2, oid, internal) TO lib_admin;

-- DROP FUNCTION public.g_intbig_decompress(internal);

CREATE OR REPLACE FUNCTION public.g_intbig_decompress(internal)
 RETURNS internal
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$g_intbig_decompress$function$
;

-- Permissions

ALTER FUNCTION public.g_intbig_decompress(internal) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.g_intbig_decompress(internal) TO lib_admin;

-- DROP FUNCTION public.g_intbig_options(internal);

CREATE OR REPLACE FUNCTION public.g_intbig_options(internal)
 RETURNS void
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE
AS '$libdir/_int', $function$g_intbig_options$function$
;

-- Permissions

ALTER FUNCTION public.g_intbig_options(internal) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.g_intbig_options(internal) TO lib_admin;

-- DROP FUNCTION public.g_intbig_penalty(internal, internal, internal);

CREATE OR REPLACE FUNCTION public.g_intbig_penalty(internal, internal, internal)
 RETURNS internal
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$g_intbig_penalty$function$
;

-- Permissions

ALTER FUNCTION public.g_intbig_penalty(internal, internal, internal) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.g_intbig_penalty(internal, internal, internal) TO lib_admin;

-- DROP FUNCTION public.g_intbig_picksplit(internal, internal);

CREATE OR REPLACE FUNCTION public.g_intbig_picksplit(internal, internal)
 RETURNS internal
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$g_intbig_picksplit$function$
;

-- Permissions

ALTER FUNCTION public.g_intbig_picksplit(internal, internal) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.g_intbig_picksplit(internal, internal) TO lib_admin;

-- DROP FUNCTION public.g_intbig_same(intbig_gkey, intbig_gkey, internal);

CREATE OR REPLACE FUNCTION public.g_intbig_same(intbig_gkey, intbig_gkey, internal)
 RETURNS internal
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$g_intbig_same$function$
;

-- Permissions

ALTER FUNCTION public.g_intbig_same(intbig_gkey, intbig_gkey, internal) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.g_intbig_same(intbig_gkey, intbig_gkey, internal) TO lib_admin;

-- DROP FUNCTION public.g_intbig_union(internal, internal);

CREATE OR REPLACE FUNCTION public.g_intbig_union(internal, internal)
 RETURNS intbig_gkey
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$g_intbig_union$function$
;

-- Permissions

ALTER FUNCTION public.g_intbig_union(internal, internal) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.g_intbig_union(internal, internal) TO lib_admin;

-- DROP FUNCTION public.gin_extract_query_trgm(text, internal, int2, internal, internal, internal, internal);

CREATE OR REPLACE FUNCTION public.gin_extract_query_trgm(text, internal, smallint, internal, internal, internal, internal)
 RETURNS internal
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$gin_extract_query_trgm$function$
;

-- Permissions

ALTER FUNCTION public.gin_extract_query_trgm(text, internal, int2, internal, internal, internal, internal) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.gin_extract_query_trgm(text, internal, int2, internal, internal, internal, internal) TO lib_admin;

-- DROP FUNCTION public.gin_extract_value_trgm(text, internal);

CREATE OR REPLACE FUNCTION public.gin_extract_value_trgm(text, internal)
 RETURNS internal
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$gin_extract_value_trgm$function$
;

-- Permissions

ALTER FUNCTION public.gin_extract_value_trgm(text, internal) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.gin_extract_value_trgm(text, internal) TO lib_admin;

-- DROP FUNCTION public.gin_trgm_consistent(internal, int2, text, int4, internal, internal, internal, internal);

CREATE OR REPLACE FUNCTION public.gin_trgm_consistent(internal, smallint, text, integer, internal, internal, internal, internal)
 RETURNS boolean
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$gin_trgm_consistent$function$
;

-- Permissions

ALTER FUNCTION public.gin_trgm_consistent(internal, int2, text, int4, internal, internal, internal, internal) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.gin_trgm_consistent(internal, int2, text, int4, internal, internal, internal, internal) TO lib_admin;

-- DROP FUNCTION public.gin_trgm_triconsistent(internal, int2, text, int4, internal, internal, internal);

CREATE OR REPLACE FUNCTION public.gin_trgm_triconsistent(internal, smallint, text, integer, internal, internal, internal)
 RETURNS "char"
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$gin_trgm_triconsistent$function$
;

-- Permissions

ALTER FUNCTION public.gin_trgm_triconsistent(internal, int2, text, int4, internal, internal, internal) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.gin_trgm_triconsistent(internal, int2, text, int4, internal, internal, internal) TO lib_admin;

-- DROP FUNCTION public.ginint4_consistent(internal, int2, _int4, int4, internal, internal, internal, internal);

CREATE OR REPLACE FUNCTION public.ginint4_consistent(internal, smallint, integer[], integer, internal, internal, internal, internal)
 RETURNS boolean
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$ginint4_consistent$function$
;

-- Permissions

ALTER FUNCTION public.ginint4_consistent(internal, int2, _int4, int4, internal, internal, internal, internal) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.ginint4_consistent(internal, int2, _int4, int4, internal, internal, internal, internal) TO lib_admin;

-- DROP FUNCTION public.ginint4_queryextract(_int4, internal, int2, internal, internal, internal, internal);

CREATE OR REPLACE FUNCTION public.ginint4_queryextract(integer[], internal, smallint, internal, internal, internal, internal)
 RETURNS internal
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$ginint4_queryextract$function$
;

-- Permissions

ALTER FUNCTION public.ginint4_queryextract(_int4, internal, int2, internal, internal, internal, internal) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.ginint4_queryextract(_int4, internal, int2, internal, internal, internal, internal) TO lib_admin;

-- DROP FUNCTION public.gtrgm_compress(internal);

CREATE OR REPLACE FUNCTION public.gtrgm_compress(internal)
 RETURNS internal
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$gtrgm_compress$function$
;

-- Permissions

ALTER FUNCTION public.gtrgm_compress(internal) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.gtrgm_compress(internal) TO lib_admin;

-- DROP FUNCTION public.gtrgm_consistent(internal, text, int2, oid, internal);

CREATE OR REPLACE FUNCTION public.gtrgm_consistent(internal, text, smallint, oid, internal)
 RETURNS boolean
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$gtrgm_consistent$function$
;

-- Permissions

ALTER FUNCTION public.gtrgm_consistent(internal, text, int2, oid, internal) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.gtrgm_consistent(internal, text, int2, oid, internal) TO lib_admin;

-- DROP FUNCTION public.gtrgm_decompress(internal);

CREATE OR REPLACE FUNCTION public.gtrgm_decompress(internal)
 RETURNS internal
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$gtrgm_decompress$function$
;

-- Permissions

ALTER FUNCTION public.gtrgm_decompress(internal) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.gtrgm_decompress(internal) TO lib_admin;

-- DROP FUNCTION public.gtrgm_distance(internal, text, int2, oid, internal);

CREATE OR REPLACE FUNCTION public.gtrgm_distance(internal, text, smallint, oid, internal)
 RETURNS double precision
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$gtrgm_distance$function$
;

-- Permissions

ALTER FUNCTION public.gtrgm_distance(internal, text, int2, oid, internal) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.gtrgm_distance(internal, text, int2, oid, internal) TO lib_admin;

-- DROP FUNCTION public.gtrgm_in(cstring);

CREATE OR REPLACE FUNCTION public.gtrgm_in(cstring)
 RETURNS gtrgm
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$gtrgm_in$function$
;

-- Permissions

ALTER FUNCTION public.gtrgm_in(cstring) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.gtrgm_in(cstring) TO lib_admin;

-- DROP FUNCTION public.gtrgm_options(internal);

CREATE OR REPLACE FUNCTION public.gtrgm_options(internal)
 RETURNS void
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE
AS '$libdir/pg_trgm', $function$gtrgm_options$function$
;

-- Permissions

ALTER FUNCTION public.gtrgm_options(internal) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.gtrgm_options(internal) TO lib_admin;

-- DROP FUNCTION public.gtrgm_out(gtrgm);

CREATE OR REPLACE FUNCTION public.gtrgm_out(gtrgm)
 RETURNS cstring
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$gtrgm_out$function$
;

-- Permissions

ALTER FUNCTION public.gtrgm_out(gtrgm) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.gtrgm_out(gtrgm) TO lib_admin;

-- DROP FUNCTION public.gtrgm_penalty(internal, internal, internal);

CREATE OR REPLACE FUNCTION public.gtrgm_penalty(internal, internal, internal)
 RETURNS internal
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$gtrgm_penalty$function$
;

-- Permissions

ALTER FUNCTION public.gtrgm_penalty(internal, internal, internal) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.gtrgm_penalty(internal, internal, internal) TO lib_admin;

-- DROP FUNCTION public.gtrgm_picksplit(internal, internal);

CREATE OR REPLACE FUNCTION public.gtrgm_picksplit(internal, internal)
 RETURNS internal
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$gtrgm_picksplit$function$
;

-- Permissions

ALTER FUNCTION public.gtrgm_picksplit(internal, internal) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.gtrgm_picksplit(internal, internal) TO lib_admin;

-- DROP FUNCTION public.gtrgm_same(gtrgm, gtrgm, internal);

CREATE OR REPLACE FUNCTION public.gtrgm_same(gtrgm, gtrgm, internal)
 RETURNS internal
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$gtrgm_same$function$
;

-- Permissions

ALTER FUNCTION public.gtrgm_same(gtrgm, gtrgm, internal) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.gtrgm_same(gtrgm, gtrgm, internal) TO lib_admin;

-- DROP FUNCTION public.gtrgm_union(internal, internal);

CREATE OR REPLACE FUNCTION public.gtrgm_union(internal, internal)
 RETURNS gtrgm
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$gtrgm_union$function$
;

-- Permissions

ALTER FUNCTION public.gtrgm_union(internal, internal) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.gtrgm_union(internal, internal) TO lib_admin;

-- DROP FUNCTION public.halfvec(halfvec, int4, bool);

CREATE OR REPLACE FUNCTION public.halfvec(halfvec, integer, boolean)
 RETURNS halfvec
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$halfvec$function$
;

-- Permissions

ALTER FUNCTION public.halfvec(halfvec, int4, bool) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.halfvec(halfvec, int4, bool) TO lib_admin;

-- DROP FUNCTION public.halfvec_accum(_float8, halfvec);

CREATE OR REPLACE FUNCTION public.halfvec_accum(double precision[], halfvec)
 RETURNS double precision[]
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$halfvec_accum$function$
;

-- Permissions

ALTER FUNCTION public.halfvec_accum(_float8, halfvec) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.halfvec_accum(_float8, halfvec) TO lib_admin;

-- DROP FUNCTION public.halfvec_add(halfvec, halfvec);

CREATE OR REPLACE FUNCTION public.halfvec_add(halfvec, halfvec)
 RETURNS halfvec
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$halfvec_add$function$
;

-- Permissions

ALTER FUNCTION public.halfvec_add(halfvec, halfvec) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.halfvec_add(halfvec, halfvec) TO lib_admin;

-- DROP FUNCTION public.halfvec_avg(_float8);

CREATE OR REPLACE FUNCTION public.halfvec_avg(double precision[])
 RETURNS halfvec
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$halfvec_avg$function$
;

-- Permissions

ALTER FUNCTION public.halfvec_avg(_float8) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.halfvec_avg(_float8) TO lib_admin;

-- DROP FUNCTION public.halfvec_cmp(halfvec, halfvec);

CREATE OR REPLACE FUNCTION public.halfvec_cmp(halfvec, halfvec)
 RETURNS integer
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$halfvec_cmp$function$
;

-- Permissions

ALTER FUNCTION public.halfvec_cmp(halfvec, halfvec) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.halfvec_cmp(halfvec, halfvec) TO lib_admin;

-- DROP FUNCTION public.halfvec_combine(_float8, _float8);

CREATE OR REPLACE FUNCTION public.halfvec_combine(double precision[], double precision[])
 RETURNS double precision[]
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$vector_combine$function$
;

-- Permissions

ALTER FUNCTION public.halfvec_combine(_float8, _float8) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.halfvec_combine(_float8, _float8) TO lib_admin;

-- DROP FUNCTION public.halfvec_concat(halfvec, halfvec);

CREATE OR REPLACE FUNCTION public.halfvec_concat(halfvec, halfvec)
 RETURNS halfvec
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$halfvec_concat$function$
;

-- Permissions

ALTER FUNCTION public.halfvec_concat(halfvec, halfvec) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.halfvec_concat(halfvec, halfvec) TO lib_admin;

-- DROP FUNCTION public.halfvec_eq(halfvec, halfvec);

CREATE OR REPLACE FUNCTION public.halfvec_eq(halfvec, halfvec)
 RETURNS boolean
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$halfvec_eq$function$
;

-- Permissions

ALTER FUNCTION public.halfvec_eq(halfvec, halfvec) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.halfvec_eq(halfvec, halfvec) TO lib_admin;

-- DROP FUNCTION public.halfvec_ge(halfvec, halfvec);

CREATE OR REPLACE FUNCTION public.halfvec_ge(halfvec, halfvec)
 RETURNS boolean
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$halfvec_ge$function$
;

-- Permissions

ALTER FUNCTION public.halfvec_ge(halfvec, halfvec) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.halfvec_ge(halfvec, halfvec) TO lib_admin;

-- DROP FUNCTION public.halfvec_gt(halfvec, halfvec);

CREATE OR REPLACE FUNCTION public.halfvec_gt(halfvec, halfvec)
 RETURNS boolean
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$halfvec_gt$function$
;

-- Permissions

ALTER FUNCTION public.halfvec_gt(halfvec, halfvec) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.halfvec_gt(halfvec, halfvec) TO lib_admin;

-- DROP FUNCTION public.halfvec_in(cstring, oid, int4);

CREATE OR REPLACE FUNCTION public.halfvec_in(cstring, oid, integer)
 RETURNS halfvec
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$halfvec_in$function$
;

-- Permissions

ALTER FUNCTION public.halfvec_in(cstring, oid, int4) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.halfvec_in(cstring, oid, int4) TO lib_admin;

-- DROP FUNCTION public.halfvec_l2_squared_distance(halfvec, halfvec);

CREATE OR REPLACE FUNCTION public.halfvec_l2_squared_distance(halfvec, halfvec)
 RETURNS double precision
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$halfvec_l2_squared_distance$function$
;

-- Permissions

ALTER FUNCTION public.halfvec_l2_squared_distance(halfvec, halfvec) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.halfvec_l2_squared_distance(halfvec, halfvec) TO lib_admin;

-- DROP FUNCTION public.halfvec_le(halfvec, halfvec);

CREATE OR REPLACE FUNCTION public.halfvec_le(halfvec, halfvec)
 RETURNS boolean
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$halfvec_le$function$
;

-- Permissions

ALTER FUNCTION public.halfvec_le(halfvec, halfvec) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.halfvec_le(halfvec, halfvec) TO lib_admin;

-- DROP FUNCTION public.halfvec_lt(halfvec, halfvec);

CREATE OR REPLACE FUNCTION public.halfvec_lt(halfvec, halfvec)
 RETURNS boolean
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$halfvec_lt$function$
;

-- Permissions

ALTER FUNCTION public.halfvec_lt(halfvec, halfvec) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.halfvec_lt(halfvec, halfvec) TO lib_admin;

-- DROP FUNCTION public.halfvec_mul(halfvec, halfvec);

CREATE OR REPLACE FUNCTION public.halfvec_mul(halfvec, halfvec)
 RETURNS halfvec
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$halfvec_mul$function$
;

-- Permissions

ALTER FUNCTION public.halfvec_mul(halfvec, halfvec) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.halfvec_mul(halfvec, halfvec) TO lib_admin;

-- DROP FUNCTION public.halfvec_ne(halfvec, halfvec);

CREATE OR REPLACE FUNCTION public.halfvec_ne(halfvec, halfvec)
 RETURNS boolean
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$halfvec_ne$function$
;

-- Permissions

ALTER FUNCTION public.halfvec_ne(halfvec, halfvec) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.halfvec_ne(halfvec, halfvec) TO lib_admin;

-- DROP FUNCTION public.halfvec_negative_inner_product(halfvec, halfvec);

CREATE OR REPLACE FUNCTION public.halfvec_negative_inner_product(halfvec, halfvec)
 RETURNS double precision
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$halfvec_negative_inner_product$function$
;

-- Permissions

ALTER FUNCTION public.halfvec_negative_inner_product(halfvec, halfvec) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.halfvec_negative_inner_product(halfvec, halfvec) TO lib_admin;

-- DROP FUNCTION public.halfvec_out(halfvec);

CREATE OR REPLACE FUNCTION public.halfvec_out(halfvec)
 RETURNS cstring
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$halfvec_out$function$
;

-- Permissions

ALTER FUNCTION public.halfvec_out(halfvec) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.halfvec_out(halfvec) TO lib_admin;

-- DROP FUNCTION public.halfvec_recv(internal, oid, int4);

CREATE OR REPLACE FUNCTION public.halfvec_recv(internal, oid, integer)
 RETURNS halfvec
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$halfvec_recv$function$
;

-- Permissions

ALTER FUNCTION public.halfvec_recv(internal, oid, int4) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.halfvec_recv(internal, oid, int4) TO lib_admin;

-- DROP FUNCTION public.halfvec_send(halfvec);

CREATE OR REPLACE FUNCTION public.halfvec_send(halfvec)
 RETURNS bytea
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$halfvec_send$function$
;

-- Permissions

ALTER FUNCTION public.halfvec_send(halfvec) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.halfvec_send(halfvec) TO lib_admin;

-- DROP FUNCTION public.halfvec_spherical_distance(halfvec, halfvec);

CREATE OR REPLACE FUNCTION public.halfvec_spherical_distance(halfvec, halfvec)
 RETURNS double precision
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$halfvec_spherical_distance$function$
;

-- Permissions

ALTER FUNCTION public.halfvec_spherical_distance(halfvec, halfvec) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.halfvec_spherical_distance(halfvec, halfvec) TO lib_admin;

-- DROP FUNCTION public.halfvec_sub(halfvec, halfvec);

CREATE OR REPLACE FUNCTION public.halfvec_sub(halfvec, halfvec)
 RETURNS halfvec
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$halfvec_sub$function$
;

-- Permissions

ALTER FUNCTION public.halfvec_sub(halfvec, halfvec) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.halfvec_sub(halfvec, halfvec) TO lib_admin;

-- DROP FUNCTION public.halfvec_to_float4(halfvec, int4, bool);

CREATE OR REPLACE FUNCTION public.halfvec_to_float4(halfvec, integer, boolean)
 RETURNS real[]
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$halfvec_to_float4$function$
;

-- Permissions

ALTER FUNCTION public.halfvec_to_float4(halfvec, int4, bool) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.halfvec_to_float4(halfvec, int4, bool) TO lib_admin;

-- DROP FUNCTION public.halfvec_to_sparsevec(halfvec, int4, bool);

CREATE OR REPLACE FUNCTION public.halfvec_to_sparsevec(halfvec, integer, boolean)
 RETURNS sparsevec
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$halfvec_to_sparsevec$function$
;

-- Permissions

ALTER FUNCTION public.halfvec_to_sparsevec(halfvec, int4, bool) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.halfvec_to_sparsevec(halfvec, int4, bool) TO lib_admin;

-- DROP FUNCTION public.halfvec_to_vector(halfvec, int4, bool);

CREATE OR REPLACE FUNCTION public.halfvec_to_vector(halfvec, integer, boolean)
 RETURNS vector
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$halfvec_to_vector$function$
;

-- Permissions

ALTER FUNCTION public.halfvec_to_vector(halfvec, int4, bool) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.halfvec_to_vector(halfvec, int4, bool) TO lib_admin;

-- DROP FUNCTION public.halfvec_typmod_in(_cstring);

CREATE OR REPLACE FUNCTION public.halfvec_typmod_in(cstring[])
 RETURNS integer
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$halfvec_typmod_in$function$
;

-- Permissions

ALTER FUNCTION public.halfvec_typmod_in(_cstring) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.halfvec_typmod_in(_cstring) TO lib_admin;

-- DROP FUNCTION public.hamming_distance(bit, bit);

CREATE OR REPLACE FUNCTION public.hamming_distance(bit, bit)
 RETURNS double precision
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$hamming_distance$function$
;

-- Permissions

ALTER FUNCTION public.hamming_distance(bit, bit) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.hamming_distance(bit, bit) TO lib_admin;

-- DROP FUNCTION public.hnsw_bit_support(internal);

CREATE OR REPLACE FUNCTION public.hnsw_bit_support(internal)
 RETURNS internal
 LANGUAGE c
AS '$libdir/vector', $function$hnsw_bit_support$function$
;

-- Permissions

ALTER FUNCTION public.hnsw_bit_support(internal) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.hnsw_bit_support(internal) TO lib_admin;

-- DROP FUNCTION public.hnsw_halfvec_support(internal);

CREATE OR REPLACE FUNCTION public.hnsw_halfvec_support(internal)
 RETURNS internal
 LANGUAGE c
AS '$libdir/vector', $function$hnsw_halfvec_support$function$
;

-- Permissions

ALTER FUNCTION public.hnsw_halfvec_support(internal) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.hnsw_halfvec_support(internal) TO lib_admin;

-- DROP FUNCTION public.hnsw_sparsevec_support(internal);

CREATE OR REPLACE FUNCTION public.hnsw_sparsevec_support(internal)
 RETURNS internal
 LANGUAGE c
AS '$libdir/vector', $function$hnsw_sparsevec_support$function$
;

-- Permissions

ALTER FUNCTION public.hnsw_sparsevec_support(internal) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.hnsw_sparsevec_support(internal) TO lib_admin;

-- DROP FUNCTION public.hnswhandler(internal);

CREATE OR REPLACE FUNCTION public.hnswhandler(internal)
 RETURNS index_am_handler
 LANGUAGE c
AS '$libdir/vector', $function$hnswhandler$function$
;

-- Permissions

ALTER FUNCTION public.hnswhandler(internal) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.hnswhandler(internal) TO lib_admin;

-- DROP FUNCTION public.icount(_int4);

CREATE OR REPLACE FUNCTION public.icount(integer[])
 RETURNS integer
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$icount$function$
;

-- Permissions

ALTER FUNCTION public.icount(_int4) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.icount(_int4) TO lib_admin;

-- DROP FUNCTION public.idx(_int4, int4);

CREATE OR REPLACE FUNCTION public.idx(integer[], integer)
 RETURNS integer
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$idx$function$
;

-- Permissions

ALTER FUNCTION public.idx(_int4, int4) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.idx(_int4, int4) TO lib_admin;

-- DROP FUNCTION public.immutable_array_to_string(_text, text);

CREATE OR REPLACE FUNCTION public.immutable_array_to_string(arr text[], sep text)
 RETURNS text
 LANGUAGE sql
 IMMUTABLE
AS $function$

    SELECT array_to_string(arr, sep);

$function$
;

-- Permissions

ALTER FUNCTION public.immutable_array_to_string(_text, text) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.immutable_array_to_string(_text, text) TO lib_admin;

-- DROP FUNCTION public.inner_product(halfvec, halfvec);

CREATE OR REPLACE FUNCTION public.inner_product(halfvec, halfvec)
 RETURNS double precision
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$halfvec_inner_product$function$
;

-- Permissions

ALTER FUNCTION public.inner_product(halfvec, halfvec) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.inner_product(halfvec, halfvec) TO lib_admin;

-- DROP FUNCTION public.inner_product(vector, vector);

CREATE OR REPLACE FUNCTION public.inner_product(vector, vector)
 RETURNS double precision
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$inner_product$function$
;

-- Permissions

ALTER FUNCTION public.inner_product(vector, vector) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.inner_product(vector, vector) TO lib_admin;

-- DROP FUNCTION public.inner_product(sparsevec, sparsevec);

CREATE OR REPLACE FUNCTION public.inner_product(sparsevec, sparsevec)
 RETURNS double precision
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$sparsevec_inner_product$function$
;

-- Permissions

ALTER FUNCTION public.inner_product(sparsevec, sparsevec) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.inner_product(sparsevec, sparsevec) TO lib_admin;

-- DROP FUNCTION public.intarray_del_elem(_int4, int4);

CREATE OR REPLACE FUNCTION public.intarray_del_elem(integer[], integer)
 RETURNS integer[]
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$intarray_del_elem$function$
;

-- Permissions

ALTER FUNCTION public.intarray_del_elem(_int4, int4) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.intarray_del_elem(_int4, int4) TO lib_admin;

-- DROP FUNCTION public.intarray_push_array(_int4, _int4);

CREATE OR REPLACE FUNCTION public.intarray_push_array(integer[], integer[])
 RETURNS integer[]
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$intarray_push_array$function$
;

-- Permissions

ALTER FUNCTION public.intarray_push_array(_int4, _int4) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.intarray_push_array(_int4, _int4) TO lib_admin;

-- DROP FUNCTION public.intarray_push_elem(_int4, int4);

CREATE OR REPLACE FUNCTION public.intarray_push_elem(integer[], integer)
 RETURNS integer[]
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$intarray_push_elem$function$
;

-- Permissions

ALTER FUNCTION public.intarray_push_elem(_int4, int4) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.intarray_push_elem(_int4, int4) TO lib_admin;

-- DROP FUNCTION public.intset(int4);

CREATE OR REPLACE FUNCTION public.intset(integer)
 RETURNS integer[]
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$intset$function$
;

-- Permissions

ALTER FUNCTION public.intset(int4) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.intset(int4) TO lib_admin;

-- DROP FUNCTION public.intset_subtract(_int4, _int4);

CREATE OR REPLACE FUNCTION public.intset_subtract(integer[], integer[])
 RETURNS integer[]
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$intset_subtract$function$
;

-- Permissions

ALTER FUNCTION public.intset_subtract(_int4, _int4) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.intset_subtract(_int4, _int4) TO lib_admin;

-- DROP FUNCTION public.intset_union_elem(_int4, int4);

CREATE OR REPLACE FUNCTION public.intset_union_elem(integer[], integer)
 RETURNS integer[]
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$intset_union_elem$function$
;

-- Permissions

ALTER FUNCTION public.intset_union_elem(_int4, int4) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.intset_union_elem(_int4, int4) TO lib_admin;

-- DROP FUNCTION public.ivfflat_bit_support(internal);

CREATE OR REPLACE FUNCTION public.ivfflat_bit_support(internal)
 RETURNS internal
 LANGUAGE c
AS '$libdir/vector', $function$ivfflat_bit_support$function$
;

-- Permissions

ALTER FUNCTION public.ivfflat_bit_support(internal) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.ivfflat_bit_support(internal) TO lib_admin;

-- DROP FUNCTION public.ivfflat_halfvec_support(internal);

CREATE OR REPLACE FUNCTION public.ivfflat_halfvec_support(internal)
 RETURNS internal
 LANGUAGE c
AS '$libdir/vector', $function$ivfflat_halfvec_support$function$
;

-- Permissions

ALTER FUNCTION public.ivfflat_halfvec_support(internal) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.ivfflat_halfvec_support(internal) TO lib_admin;

-- DROP FUNCTION public.ivfflathandler(internal);

CREATE OR REPLACE FUNCTION public.ivfflathandler(internal)
 RETURNS index_am_handler
 LANGUAGE c
AS '$libdir/vector', $function$ivfflathandler$function$
;

-- Permissions

ALTER FUNCTION public.ivfflathandler(internal) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.ivfflathandler(internal) TO lib_admin;

-- DROP FUNCTION public.jaccard_distance(bit, bit);

CREATE OR REPLACE FUNCTION public.jaccard_distance(bit, bit)
 RETURNS double precision
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$jaccard_distance$function$
;

-- Permissions

ALTER FUNCTION public.jaccard_distance(bit, bit) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.jaccard_distance(bit, bit) TO lib_admin;

-- DROP FUNCTION public.l1_distance(vector, vector);

CREATE OR REPLACE FUNCTION public.l1_distance(vector, vector)
 RETURNS double precision
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$l1_distance$function$
;

-- Permissions

ALTER FUNCTION public.l1_distance(vector, vector) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.l1_distance(vector, vector) TO lib_admin;

-- DROP FUNCTION public.l1_distance(sparsevec, sparsevec);

CREATE OR REPLACE FUNCTION public.l1_distance(sparsevec, sparsevec)
 RETURNS double precision
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$sparsevec_l1_distance$function$
;

-- Permissions

ALTER FUNCTION public.l1_distance(sparsevec, sparsevec) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.l1_distance(sparsevec, sparsevec) TO lib_admin;

-- DROP FUNCTION public.l1_distance(halfvec, halfvec);

CREATE OR REPLACE FUNCTION public.l1_distance(halfvec, halfvec)
 RETURNS double precision
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$halfvec_l1_distance$function$
;

-- Permissions

ALTER FUNCTION public.l1_distance(halfvec, halfvec) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.l1_distance(halfvec, halfvec) TO lib_admin;

-- DROP FUNCTION public.l2_distance(vector, vector);

CREATE OR REPLACE FUNCTION public.l2_distance(vector, vector)
 RETURNS double precision
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$l2_distance$function$
;

-- Permissions

ALTER FUNCTION public.l2_distance(vector, vector) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.l2_distance(vector, vector) TO lib_admin;

-- DROP FUNCTION public.l2_distance(halfvec, halfvec);

CREATE OR REPLACE FUNCTION public.l2_distance(halfvec, halfvec)
 RETURNS double precision
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$halfvec_l2_distance$function$
;

-- Permissions

ALTER FUNCTION public.l2_distance(halfvec, halfvec) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.l2_distance(halfvec, halfvec) TO lib_admin;

-- DROP FUNCTION public.l2_distance(sparsevec, sparsevec);

CREATE OR REPLACE FUNCTION public.l2_distance(sparsevec, sparsevec)
 RETURNS double precision
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$sparsevec_l2_distance$function$
;

-- Permissions

ALTER FUNCTION public.l2_distance(sparsevec, sparsevec) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.l2_distance(sparsevec, sparsevec) TO lib_admin;

-- DROP FUNCTION public.l2_norm(halfvec);

CREATE OR REPLACE FUNCTION public.l2_norm(halfvec)
 RETURNS double precision
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$halfvec_l2_norm$function$
;

-- Permissions

ALTER FUNCTION public.l2_norm(halfvec) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.l2_norm(halfvec) TO lib_admin;

-- DROP FUNCTION public.l2_norm(sparsevec);

CREATE OR REPLACE FUNCTION public.l2_norm(sparsevec)
 RETURNS double precision
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$sparsevec_l2_norm$function$
;

-- Permissions

ALTER FUNCTION public.l2_norm(sparsevec) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.l2_norm(sparsevec) TO lib_admin;

-- DROP FUNCTION public.l2_normalize(sparsevec);

CREATE OR REPLACE FUNCTION public.l2_normalize(sparsevec)
 RETURNS sparsevec
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$sparsevec_l2_normalize$function$
;

-- Permissions

ALTER FUNCTION public.l2_normalize(sparsevec) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.l2_normalize(sparsevec) TO lib_admin;

-- DROP FUNCTION public.l2_normalize(halfvec);

CREATE OR REPLACE FUNCTION public.l2_normalize(halfvec)
 RETURNS halfvec
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$halfvec_l2_normalize$function$
;

-- Permissions

ALTER FUNCTION public.l2_normalize(halfvec) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.l2_normalize(halfvec) TO lib_admin;

-- DROP FUNCTION public.l2_normalize(vector);

CREATE OR REPLACE FUNCTION public.l2_normalize(vector)
 RETURNS vector
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$l2_normalize$function$
;

-- Permissions

ALTER FUNCTION public.l2_normalize(vector) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.l2_normalize(vector) TO lib_admin;

-- DROP FUNCTION public.querytree(query_int);

CREATE OR REPLACE FUNCTION public.querytree(query_int)
 RETURNS text
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$querytree$function$
;

-- Permissions

ALTER FUNCTION public.querytree(query_int) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.querytree(query_int) TO lib_admin;

-- DROP FUNCTION public.rboolop(query_int, _int4);

CREATE OR REPLACE FUNCTION public.rboolop(query_int, integer[])
 RETURNS boolean
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$rboolop$function$
;

COMMENT ON FUNCTION public.rboolop(query_int, _int4) IS 'boolean operation with array';

-- Permissions

ALTER FUNCTION public.rboolop(query_int, _int4) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.rboolop(query_int, _int4) TO lib_admin;

-- DROP FUNCTION public.set_limit(float4);

CREATE OR REPLACE FUNCTION public.set_limit(real)
 RETURNS real
 LANGUAGE c
 STRICT
AS '$libdir/pg_trgm', $function$set_limit$function$
;

-- Permissions

ALTER FUNCTION public.set_limit(float4) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.set_limit(float4) TO lib_admin;

-- DROP FUNCTION public.show_limit();

CREATE OR REPLACE FUNCTION public.show_limit()
 RETURNS real
 LANGUAGE c
 STABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$show_limit$function$
;

-- Permissions

ALTER FUNCTION public.show_limit() OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.show_limit() TO lib_admin;

-- DROP FUNCTION public.show_trgm(text);

CREATE OR REPLACE FUNCTION public.show_trgm(text)
 RETURNS text[]
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$show_trgm$function$
;

-- Permissions

ALTER FUNCTION public.show_trgm(text) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.show_trgm(text) TO lib_admin;

-- DROP FUNCTION public.similarity(text, text);

CREATE OR REPLACE FUNCTION public.similarity(text, text)
 RETURNS real
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$similarity$function$
;

-- Permissions

ALTER FUNCTION public.similarity(text, text) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.similarity(text, text) TO lib_admin;

-- DROP FUNCTION public.similarity_dist(text, text);

CREATE OR REPLACE FUNCTION public.similarity_dist(text, text)
 RETURNS real
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$similarity_dist$function$
;

-- Permissions

ALTER FUNCTION public.similarity_dist(text, text) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.similarity_dist(text, text) TO lib_admin;

-- DROP FUNCTION public.similarity_op(text, text);

CREATE OR REPLACE FUNCTION public.similarity_op(text, text)
 RETURNS boolean
 LANGUAGE c
 STABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$similarity_op$function$
;

-- Permissions

ALTER FUNCTION public.similarity_op(text, text) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.similarity_op(text, text) TO lib_admin;

-- DROP FUNCTION public.sort(_int4, text);

CREATE OR REPLACE FUNCTION public.sort(integer[], text)
 RETURNS integer[]
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$sort$function$
;

-- Permissions

ALTER FUNCTION public.sort(_int4, text) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.sort(_int4, text) TO lib_admin;

-- DROP FUNCTION public.sort(_int4);

CREATE OR REPLACE FUNCTION public.sort(integer[])
 RETURNS integer[]
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$sort$function$
;

-- Permissions

ALTER FUNCTION public.sort(_int4) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.sort(_int4) TO lib_admin;

-- DROP FUNCTION public.sort_asc(_int4);

CREATE OR REPLACE FUNCTION public.sort_asc(integer[])
 RETURNS integer[]
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$sort_asc$function$
;

-- Permissions

ALTER FUNCTION public.sort_asc(_int4) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.sort_asc(_int4) TO lib_admin;

-- DROP FUNCTION public.sort_desc(_int4);

CREATE OR REPLACE FUNCTION public.sort_desc(integer[])
 RETURNS integer[]
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$sort_desc$function$
;

-- Permissions

ALTER FUNCTION public.sort_desc(_int4) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.sort_desc(_int4) TO lib_admin;

-- DROP FUNCTION public.sparsevec(sparsevec, int4, bool);

CREATE OR REPLACE FUNCTION public.sparsevec(sparsevec, integer, boolean)
 RETURNS sparsevec
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$sparsevec$function$
;

-- Permissions

ALTER FUNCTION public.sparsevec(sparsevec, int4, bool) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.sparsevec(sparsevec, int4, bool) TO lib_admin;

-- DROP FUNCTION public.sparsevec_cmp(sparsevec, sparsevec);

CREATE OR REPLACE FUNCTION public.sparsevec_cmp(sparsevec, sparsevec)
 RETURNS integer
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$sparsevec_cmp$function$
;

-- Permissions

ALTER FUNCTION public.sparsevec_cmp(sparsevec, sparsevec) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.sparsevec_cmp(sparsevec, sparsevec) TO lib_admin;

-- DROP FUNCTION public.sparsevec_eq(sparsevec, sparsevec);

CREATE OR REPLACE FUNCTION public.sparsevec_eq(sparsevec, sparsevec)
 RETURNS boolean
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$sparsevec_eq$function$
;

-- Permissions

ALTER FUNCTION public.sparsevec_eq(sparsevec, sparsevec) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.sparsevec_eq(sparsevec, sparsevec) TO lib_admin;

-- DROP FUNCTION public.sparsevec_ge(sparsevec, sparsevec);

CREATE OR REPLACE FUNCTION public.sparsevec_ge(sparsevec, sparsevec)
 RETURNS boolean
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$sparsevec_ge$function$
;

-- Permissions

ALTER FUNCTION public.sparsevec_ge(sparsevec, sparsevec) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.sparsevec_ge(sparsevec, sparsevec) TO lib_admin;

-- DROP FUNCTION public.sparsevec_gt(sparsevec, sparsevec);

CREATE OR REPLACE FUNCTION public.sparsevec_gt(sparsevec, sparsevec)
 RETURNS boolean
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$sparsevec_gt$function$
;

-- Permissions

ALTER FUNCTION public.sparsevec_gt(sparsevec, sparsevec) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.sparsevec_gt(sparsevec, sparsevec) TO lib_admin;

-- DROP FUNCTION public.sparsevec_in(cstring, oid, int4);

CREATE OR REPLACE FUNCTION public.sparsevec_in(cstring, oid, integer)
 RETURNS sparsevec
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$sparsevec_in$function$
;

-- Permissions

ALTER FUNCTION public.sparsevec_in(cstring, oid, int4) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.sparsevec_in(cstring, oid, int4) TO lib_admin;

-- DROP FUNCTION public.sparsevec_l2_squared_distance(sparsevec, sparsevec);

CREATE OR REPLACE FUNCTION public.sparsevec_l2_squared_distance(sparsevec, sparsevec)
 RETURNS double precision
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$sparsevec_l2_squared_distance$function$
;

-- Permissions

ALTER FUNCTION public.sparsevec_l2_squared_distance(sparsevec, sparsevec) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.sparsevec_l2_squared_distance(sparsevec, sparsevec) TO lib_admin;

-- DROP FUNCTION public.sparsevec_le(sparsevec, sparsevec);

CREATE OR REPLACE FUNCTION public.sparsevec_le(sparsevec, sparsevec)
 RETURNS boolean
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$sparsevec_le$function$
;

-- Permissions

ALTER FUNCTION public.sparsevec_le(sparsevec, sparsevec) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.sparsevec_le(sparsevec, sparsevec) TO lib_admin;

-- DROP FUNCTION public.sparsevec_lt(sparsevec, sparsevec);

CREATE OR REPLACE FUNCTION public.sparsevec_lt(sparsevec, sparsevec)
 RETURNS boolean
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$sparsevec_lt$function$
;

-- Permissions

ALTER FUNCTION public.sparsevec_lt(sparsevec, sparsevec) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.sparsevec_lt(sparsevec, sparsevec) TO lib_admin;

-- DROP FUNCTION public.sparsevec_ne(sparsevec, sparsevec);

CREATE OR REPLACE FUNCTION public.sparsevec_ne(sparsevec, sparsevec)
 RETURNS boolean
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$sparsevec_ne$function$
;

-- Permissions

ALTER FUNCTION public.sparsevec_ne(sparsevec, sparsevec) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.sparsevec_ne(sparsevec, sparsevec) TO lib_admin;

-- DROP FUNCTION public.sparsevec_negative_inner_product(sparsevec, sparsevec);

CREATE OR REPLACE FUNCTION public.sparsevec_negative_inner_product(sparsevec, sparsevec)
 RETURNS double precision
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$sparsevec_negative_inner_product$function$
;

-- Permissions

ALTER FUNCTION public.sparsevec_negative_inner_product(sparsevec, sparsevec) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.sparsevec_negative_inner_product(sparsevec, sparsevec) TO lib_admin;

-- DROP FUNCTION public.sparsevec_out(sparsevec);

CREATE OR REPLACE FUNCTION public.sparsevec_out(sparsevec)
 RETURNS cstring
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$sparsevec_out$function$
;

-- Permissions

ALTER FUNCTION public.sparsevec_out(sparsevec) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.sparsevec_out(sparsevec) TO lib_admin;

-- DROP FUNCTION public.sparsevec_recv(internal, oid, int4);

CREATE OR REPLACE FUNCTION public.sparsevec_recv(internal, oid, integer)
 RETURNS sparsevec
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$sparsevec_recv$function$
;

-- Permissions

ALTER FUNCTION public.sparsevec_recv(internal, oid, int4) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.sparsevec_recv(internal, oid, int4) TO lib_admin;

-- DROP FUNCTION public.sparsevec_send(sparsevec);

CREATE OR REPLACE FUNCTION public.sparsevec_send(sparsevec)
 RETURNS bytea
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$sparsevec_send$function$
;

-- Permissions

ALTER FUNCTION public.sparsevec_send(sparsevec) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.sparsevec_send(sparsevec) TO lib_admin;

-- DROP FUNCTION public.sparsevec_to_halfvec(sparsevec, int4, bool);

CREATE OR REPLACE FUNCTION public.sparsevec_to_halfvec(sparsevec, integer, boolean)
 RETURNS halfvec
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$sparsevec_to_halfvec$function$
;

-- Permissions

ALTER FUNCTION public.sparsevec_to_halfvec(sparsevec, int4, bool) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.sparsevec_to_halfvec(sparsevec, int4, bool) TO lib_admin;

-- DROP FUNCTION public.sparsevec_to_vector(sparsevec, int4, bool);

CREATE OR REPLACE FUNCTION public.sparsevec_to_vector(sparsevec, integer, boolean)
 RETURNS vector
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$sparsevec_to_vector$function$
;

-- Permissions

ALTER FUNCTION public.sparsevec_to_vector(sparsevec, int4, bool) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.sparsevec_to_vector(sparsevec, int4, bool) TO lib_admin;

-- DROP FUNCTION public.sparsevec_typmod_in(_cstring);

CREATE OR REPLACE FUNCTION public.sparsevec_typmod_in(cstring[])
 RETURNS integer
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$sparsevec_typmod_in$function$
;

-- Permissions

ALTER FUNCTION public.sparsevec_typmod_in(_cstring) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.sparsevec_typmod_in(_cstring) TO lib_admin;

-- DROP FUNCTION public.strict_word_similarity(text, text);

CREATE OR REPLACE FUNCTION public.strict_word_similarity(text, text)
 RETURNS real
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$strict_word_similarity$function$
;

-- Permissions

ALTER FUNCTION public.strict_word_similarity(text, text) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.strict_word_similarity(text, text) TO lib_admin;

-- DROP FUNCTION public.strict_word_similarity_commutator_op(text, text);

CREATE OR REPLACE FUNCTION public.strict_word_similarity_commutator_op(text, text)
 RETURNS boolean
 LANGUAGE c
 STABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$strict_word_similarity_commutator_op$function$
;

-- Permissions

ALTER FUNCTION public.strict_word_similarity_commutator_op(text, text) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.strict_word_similarity_commutator_op(text, text) TO lib_admin;

-- DROP FUNCTION public.strict_word_similarity_dist_commutator_op(text, text);

CREATE OR REPLACE FUNCTION public.strict_word_similarity_dist_commutator_op(text, text)
 RETURNS real
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$strict_word_similarity_dist_commutator_op$function$
;

-- Permissions

ALTER FUNCTION public.strict_word_similarity_dist_commutator_op(text, text) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.strict_word_similarity_dist_commutator_op(text, text) TO lib_admin;

-- DROP FUNCTION public.strict_word_similarity_dist_op(text, text);

CREATE OR REPLACE FUNCTION public.strict_word_similarity_dist_op(text, text)
 RETURNS real
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$strict_word_similarity_dist_op$function$
;

-- Permissions

ALTER FUNCTION public.strict_word_similarity_dist_op(text, text) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.strict_word_similarity_dist_op(text, text) TO lib_admin;

-- DROP FUNCTION public.strict_word_similarity_op(text, text);

CREATE OR REPLACE FUNCTION public.strict_word_similarity_op(text, text)
 RETURNS boolean
 LANGUAGE c
 STABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$strict_word_similarity_op$function$
;

-- Permissions

ALTER FUNCTION public.strict_word_similarity_op(text, text) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.strict_word_similarity_op(text, text) TO lib_admin;

-- DROP FUNCTION public.subarray(_int4, int4, int4);

CREATE OR REPLACE FUNCTION public.subarray(integer[], integer, integer)
 RETURNS integer[]
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$subarray$function$
;

-- Permissions

ALTER FUNCTION public.subarray(_int4, int4, int4) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.subarray(_int4, int4, int4) TO lib_admin;

-- DROP FUNCTION public.subarray(_int4, int4);

CREATE OR REPLACE FUNCTION public.subarray(integer[], integer)
 RETURNS integer[]
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$subarray$function$
;

-- Permissions

ALTER FUNCTION public.subarray(_int4, int4) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.subarray(_int4, int4) TO lib_admin;

-- DROP FUNCTION public.subvector(halfvec, int4, int4);

CREATE OR REPLACE FUNCTION public.subvector(halfvec, integer, integer)
 RETURNS halfvec
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$halfvec_subvector$function$
;

-- Permissions

ALTER FUNCTION public.subvector(halfvec, int4, int4) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.subvector(halfvec, int4, int4) TO lib_admin;

-- DROP FUNCTION public.subvector(vector, int4, int4);

CREATE OR REPLACE FUNCTION public.subvector(vector, integer, integer)
 RETURNS vector
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$subvector$function$
;

-- Permissions

ALTER FUNCTION public.subvector(vector, int4, int4) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.subvector(vector, int4, int4) TO lib_admin;

-- DROP AGGREGATE public.sum(vector);

-- Aggregate function public.sum(vector)
-- ERROR: more than one function named "public.sum";

-- Permissions

ALTER AGGREGATE public.sum(vector) OWNER TO lib_admin;
GRANT ALL ON AGGREGATE public.sum(vector) TO lib_admin;

-- DROP AGGREGATE public.sum(halfvec);

-- Aggregate function public.sum(halfvec)
-- ERROR: more than one function named "public.sum";

-- Permissions

ALTER AGGREGATE public.sum(halfvec) OWNER TO lib_admin;
GRANT ALL ON AGGREGATE public.sum(halfvec) TO lib_admin;

-- DROP FUNCTION public.uniq(_int4);

CREATE OR REPLACE FUNCTION public.uniq(integer[])
 RETURNS integer[]
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/_int', $function$uniq$function$
;

-- Permissions

ALTER FUNCTION public.uniq(_int4) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.uniq(_int4) TO lib_admin;

-- DROP FUNCTION public.vector(vector, int4, bool);

CREATE OR REPLACE FUNCTION public.vector(vector, integer, boolean)
 RETURNS vector
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$vector$function$
;

-- Permissions

ALTER FUNCTION public.vector(vector, int4, bool) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.vector(vector, int4, bool) TO lib_admin;

-- DROP FUNCTION public.vector_accum(_float8, vector);

CREATE OR REPLACE FUNCTION public.vector_accum(double precision[], vector)
 RETURNS double precision[]
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$vector_accum$function$
;

-- Permissions

ALTER FUNCTION public.vector_accum(_float8, vector) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.vector_accum(_float8, vector) TO lib_admin;

-- DROP FUNCTION public.vector_add(vector, vector);

CREATE OR REPLACE FUNCTION public.vector_add(vector, vector)
 RETURNS vector
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$vector_add$function$
;

-- Permissions

ALTER FUNCTION public.vector_add(vector, vector) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.vector_add(vector, vector) TO lib_admin;

-- DROP FUNCTION public.vector_avg(_float8);

CREATE OR REPLACE FUNCTION public.vector_avg(double precision[])
 RETURNS vector
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$vector_avg$function$
;

-- Permissions

ALTER FUNCTION public.vector_avg(_float8) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.vector_avg(_float8) TO lib_admin;

-- DROP FUNCTION public.vector_cmp(vector, vector);

CREATE OR REPLACE FUNCTION public.vector_cmp(vector, vector)
 RETURNS integer
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$vector_cmp$function$
;

-- Permissions

ALTER FUNCTION public.vector_cmp(vector, vector) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.vector_cmp(vector, vector) TO lib_admin;

-- DROP FUNCTION public.vector_combine(_float8, _float8);

CREATE OR REPLACE FUNCTION public.vector_combine(double precision[], double precision[])
 RETURNS double precision[]
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$vector_combine$function$
;

-- Permissions

ALTER FUNCTION public.vector_combine(_float8, _float8) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.vector_combine(_float8, _float8) TO lib_admin;

-- DROP FUNCTION public.vector_concat(vector, vector);

CREATE OR REPLACE FUNCTION public.vector_concat(vector, vector)
 RETURNS vector
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$vector_concat$function$
;

-- Permissions

ALTER FUNCTION public.vector_concat(vector, vector) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.vector_concat(vector, vector) TO lib_admin;

-- DROP FUNCTION public.vector_dims(vector);

CREATE OR REPLACE FUNCTION public.vector_dims(vector)
 RETURNS integer
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$vector_dims$function$
;

-- Permissions

ALTER FUNCTION public.vector_dims(vector) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.vector_dims(vector) TO lib_admin;

-- DROP FUNCTION public.vector_dims(halfvec);

CREATE OR REPLACE FUNCTION public.vector_dims(halfvec)
 RETURNS integer
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$halfvec_vector_dims$function$
;

-- Permissions

ALTER FUNCTION public.vector_dims(halfvec) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.vector_dims(halfvec) TO lib_admin;

-- DROP FUNCTION public.vector_eq(vector, vector);

CREATE OR REPLACE FUNCTION public.vector_eq(vector, vector)
 RETURNS boolean
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$vector_eq$function$
;

-- Permissions

ALTER FUNCTION public.vector_eq(vector, vector) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.vector_eq(vector, vector) TO lib_admin;

-- DROP FUNCTION public.vector_ge(vector, vector);

CREATE OR REPLACE FUNCTION public.vector_ge(vector, vector)
 RETURNS boolean
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$vector_ge$function$
;

-- Permissions

ALTER FUNCTION public.vector_ge(vector, vector) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.vector_ge(vector, vector) TO lib_admin;

-- DROP FUNCTION public.vector_gt(vector, vector);

CREATE OR REPLACE FUNCTION public.vector_gt(vector, vector)
 RETURNS boolean
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$vector_gt$function$
;

-- Permissions

ALTER FUNCTION public.vector_gt(vector, vector) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.vector_gt(vector, vector) TO lib_admin;

-- DROP FUNCTION public.vector_in(cstring, oid, int4);

CREATE OR REPLACE FUNCTION public.vector_in(cstring, oid, integer)
 RETURNS vector
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$vector_in$function$
;

-- Permissions

ALTER FUNCTION public.vector_in(cstring, oid, int4) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.vector_in(cstring, oid, int4) TO lib_admin;

-- DROP FUNCTION public.vector_l2_squared_distance(vector, vector);

CREATE OR REPLACE FUNCTION public.vector_l2_squared_distance(vector, vector)
 RETURNS double precision
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$vector_l2_squared_distance$function$
;

-- Permissions

ALTER FUNCTION public.vector_l2_squared_distance(vector, vector) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.vector_l2_squared_distance(vector, vector) TO lib_admin;

-- DROP FUNCTION public.vector_le(vector, vector);

CREATE OR REPLACE FUNCTION public.vector_le(vector, vector)
 RETURNS boolean
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$vector_le$function$
;

-- Permissions

ALTER FUNCTION public.vector_le(vector, vector) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.vector_le(vector, vector) TO lib_admin;

-- DROP FUNCTION public.vector_lt(vector, vector);

CREATE OR REPLACE FUNCTION public.vector_lt(vector, vector)
 RETURNS boolean
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$vector_lt$function$
;

-- Permissions

ALTER FUNCTION public.vector_lt(vector, vector) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.vector_lt(vector, vector) TO lib_admin;

-- DROP FUNCTION public.vector_mul(vector, vector);

CREATE OR REPLACE FUNCTION public.vector_mul(vector, vector)
 RETURNS vector
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$vector_mul$function$
;

-- Permissions

ALTER FUNCTION public.vector_mul(vector, vector) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.vector_mul(vector, vector) TO lib_admin;

-- DROP FUNCTION public.vector_ne(vector, vector);

CREATE OR REPLACE FUNCTION public.vector_ne(vector, vector)
 RETURNS boolean
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$vector_ne$function$
;

-- Permissions

ALTER FUNCTION public.vector_ne(vector, vector) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.vector_ne(vector, vector) TO lib_admin;

-- DROP FUNCTION public.vector_negative_inner_product(vector, vector);

CREATE OR REPLACE FUNCTION public.vector_negative_inner_product(vector, vector)
 RETURNS double precision
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$vector_negative_inner_product$function$
;

-- Permissions

ALTER FUNCTION public.vector_negative_inner_product(vector, vector) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.vector_negative_inner_product(vector, vector) TO lib_admin;

-- DROP FUNCTION public.vector_norm(vector);

CREATE OR REPLACE FUNCTION public.vector_norm(vector)
 RETURNS double precision
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$vector_norm$function$
;

-- Permissions

ALTER FUNCTION public.vector_norm(vector) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.vector_norm(vector) TO lib_admin;

-- DROP FUNCTION public.vector_out(vector);

CREATE OR REPLACE FUNCTION public.vector_out(vector)
 RETURNS cstring
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$vector_out$function$
;

-- Permissions

ALTER FUNCTION public.vector_out(vector) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.vector_out(vector) TO lib_admin;

-- DROP FUNCTION public.vector_recv(internal, oid, int4);

CREATE OR REPLACE FUNCTION public.vector_recv(internal, oid, integer)
 RETURNS vector
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$vector_recv$function$
;

-- Permissions

ALTER FUNCTION public.vector_recv(internal, oid, int4) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.vector_recv(internal, oid, int4) TO lib_admin;

-- DROP FUNCTION public.vector_send(vector);

CREATE OR REPLACE FUNCTION public.vector_send(vector)
 RETURNS bytea
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$vector_send$function$
;

-- Permissions

ALTER FUNCTION public.vector_send(vector) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.vector_send(vector) TO lib_admin;

-- DROP FUNCTION public.vector_spherical_distance(vector, vector);

CREATE OR REPLACE FUNCTION public.vector_spherical_distance(vector, vector)
 RETURNS double precision
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$vector_spherical_distance$function$
;

-- Permissions

ALTER FUNCTION public.vector_spherical_distance(vector, vector) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.vector_spherical_distance(vector, vector) TO lib_admin;

-- DROP FUNCTION public.vector_sub(vector, vector);

CREATE OR REPLACE FUNCTION public.vector_sub(vector, vector)
 RETURNS vector
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$vector_sub$function$
;

-- Permissions

ALTER FUNCTION public.vector_sub(vector, vector) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.vector_sub(vector, vector) TO lib_admin;

-- DROP FUNCTION public.vector_to_float4(vector, int4, bool);

CREATE OR REPLACE FUNCTION public.vector_to_float4(vector, integer, boolean)
 RETURNS real[]
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$vector_to_float4$function$
;

-- Permissions

ALTER FUNCTION public.vector_to_float4(vector, int4, bool) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.vector_to_float4(vector, int4, bool) TO lib_admin;

-- DROP FUNCTION public.vector_to_halfvec(vector, int4, bool);

CREATE OR REPLACE FUNCTION public.vector_to_halfvec(vector, integer, boolean)
 RETURNS halfvec
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$vector_to_halfvec$function$
;

-- Permissions

ALTER FUNCTION public.vector_to_halfvec(vector, int4, bool) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.vector_to_halfvec(vector, int4, bool) TO lib_admin;

-- DROP FUNCTION public.vector_to_sparsevec(vector, int4, bool);

CREATE OR REPLACE FUNCTION public.vector_to_sparsevec(vector, integer, boolean)
 RETURNS sparsevec
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$vector_to_sparsevec$function$
;

-- Permissions

ALTER FUNCTION public.vector_to_sparsevec(vector, int4, bool) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.vector_to_sparsevec(vector, int4, bool) TO lib_admin;

-- DROP FUNCTION public.vector_typmod_in(_cstring);

CREATE OR REPLACE FUNCTION public.vector_typmod_in(cstring[])
 RETURNS integer
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/vector', $function$vector_typmod_in$function$
;

-- Permissions

ALTER FUNCTION public.vector_typmod_in(_cstring) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.vector_typmod_in(_cstring) TO lib_admin;

-- DROP FUNCTION public.word_similarity(text, text);

CREATE OR REPLACE FUNCTION public.word_similarity(text, text)
 RETURNS real
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$word_similarity$function$
;

-- Permissions

ALTER FUNCTION public.word_similarity(text, text) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.word_similarity(text, text) TO lib_admin;

-- DROP FUNCTION public.word_similarity_commutator_op(text, text);

CREATE OR REPLACE FUNCTION public.word_similarity_commutator_op(text, text)
 RETURNS boolean
 LANGUAGE c
 STABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$word_similarity_commutator_op$function$
;

-- Permissions

ALTER FUNCTION public.word_similarity_commutator_op(text, text) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.word_similarity_commutator_op(text, text) TO lib_admin;

-- DROP FUNCTION public.word_similarity_dist_commutator_op(text, text);

CREATE OR REPLACE FUNCTION public.word_similarity_dist_commutator_op(text, text)
 RETURNS real
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$word_similarity_dist_commutator_op$function$
;

-- Permissions

ALTER FUNCTION public.word_similarity_dist_commutator_op(text, text) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.word_similarity_dist_commutator_op(text, text) TO lib_admin;

-- DROP FUNCTION public.word_similarity_dist_op(text, text);

CREATE OR REPLACE FUNCTION public.word_similarity_dist_op(text, text)
 RETURNS real
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$word_similarity_dist_op$function$
;

-- Permissions

ALTER FUNCTION public.word_similarity_dist_op(text, text) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.word_similarity_dist_op(text, text) TO lib_admin;

-- DROP FUNCTION public.word_similarity_op(text, text);

CREATE OR REPLACE FUNCTION public.word_similarity_op(text, text)
 RETURNS boolean
 LANGUAGE c
 STABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$word_similarity_op$function$
;

-- Permissions

ALTER FUNCTION public.word_similarity_op(text, text) OWNER TO lib_admin;
GRANT ALL ON FUNCTION public.word_similarity_op(text, text) TO lib_admin;


-- Permissions

GRANT ALL ON SCHEMA public TO lib_admin;
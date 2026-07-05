-- public.books definition
-- Drop table
-- DROP TABLE public.books;

create table public.books (
	book_id varchar(20) not null,
	title text null,
	original_title text null,
	description text null,
	num_pages int4 null,
	publisher text null,
	publication_date date null,
	isbn varchar(50) null,
	rating float4 null,
	series text null,
	author _text null,
	language_code varchar(50) null,
	book_format varchar(50) null,
	genres _text null,
	image_url text null,
	price float4 null,
	embedding public.vector null,
	constraint books_pk primary key (book_id)
);

create index books_author_immutable_trgm_idx on
public.books
    using gin (immutable_array_to_string(author, ' '::text) gin_trgm_ops);

create index books_publisher_trgm_idx on
public.books
    using gin (publisher gin_trgm_ops);

create index books_title_trgm_idx on
public.books
    using gin (title gin_trgm_ops);

create index books_vector_hnsw_idx on
public.books
    using hnsw (embedding vector_cosine_ops);
-- public.branches definition
-- Drop table
-- DROP TABLE public.branches;

create table public.branches (
	branch_id serial4 not null,
	"name" varchar(255) not null,
	name_short varchar(10) not null,
	address text not null,
	contact varchar(50) not null,
	constraint branches_name_short_key unique (name_short),
	constraint branches_pkey primary key (branch_id)
);
-- public."library" definition
-- Drop table
-- DROP TABLE public."library";

create table public."library" (
	book_id varchar(20) not null,
	branch_id int4 not null,
	quantity int4 default 0 not null,
	available_quantity int4 default 0 not null,
	shelf varchar(20) null,
	constraint chk_available_qty check ((available_quantity <= quantity)),
	constraint library_pkey primary key (book_id,
branch_id)
);
-- public.otp_store definition
-- Drop table
-- DROP TABLE public.otp_store;

create table public.otp_store (
	email varchar(255) not null,
	otp varchar(10) not null,
	expired_at timestamp not null,
	verified bool default false null,
	constraint otp_store_pkey primary key (email)
);
-- public.pending_users definition
-- Drop table
-- DROP TABLE public.pending_users;

create table public.pending_users (
	"token" uuid not null,
	email varchar(255) not null,
	password_hash varchar(255) not null,
	username varchar(100) not null,
	"role" varchar(20) default 'user'::character varying not null,
	expired_at timestamp not null,
	constraint chk_role check (((role)::text = any (array[('admin'::character varying)::text,
('librarian'::character varying)::text,
('user'::character varying)::text]))),
	constraint pending_users_pkey primary key (token)
);
-- public.study_room definition
-- Drop table
-- DROP TABLE public.study_room;

create table public.study_room (
	room_id serial4 not null,
	branch_id int4 not null,
	room_name varchar(30) not null,
	tv_num int4 default 0 null,
	board_num int4 default 0 null,
	socket_num int4 default 0 null,
	capacity int4 default 1 not null,
	description text null,
	constraint chk_boardnum_positive check ((board_num >= 0)),
	constraint chk_capacity_positive check ((capacity >= 1)),
	constraint chk_socketnum_positive check ((socket_num >= 0)),
	constraint chk_tvnum_positve check ((tv_num >= 0)),
	constraint study_room_pkey primary key (room_id),
	constraint study_room_room_name_key unique (room_name)
);
-- public.users definition
-- Drop table
-- DROP TABLE public.users;

create table public.users (
	user_id uuid default gen_random_uuid() not null,
	branch_id int4 null,
	email varchar(255) not null,
	password_hash varchar(255) not null,
	username varchar(100) not null,
	phone_number varchar(20) null,
	avatar varchar(2048) null,
	gender varchar(10) null,
	birth_date date null,
	hometown varchar(255) null,
	occupation varchar(150) null,
	description text null,
	"role" varchar(20) default 'user'::character varying not null,
	borrow_num int4 default 0 not null,
	constraint chk_gender check (((gender)::text = any (array[('male'::character varying)::text,
('female'::character varying)::text]))),
	constraint chk_role check (((role)::text = any (array[('admin'::character varying)::text,
('librarian'::character varying)::text,
('user'::character varying)::text]))),
	constraint users_email_key unique (email),
	constraint users_pkey primary key (user_id)
);
-- public.borrow_book definition
-- Drop table
-- DROP TABLE public.borrow_book;

create table public.borrow_book (
	borrow_id uuid default gen_random_uuid() not null,
	user_id uuid not null,
	book_id varchar(20) not null,
	branch_id int4 not null,
	reserve_date date default CURRENT_DATE not null,
	borrow_date date null,
	due_date date null,
	pin varchar(10) null,
	expired_at timestamp null,
	status varchar(20) default 'reserved'::character varying not null,
	constraint borrow_book_pin_key unique (pin),
	constraint borrow_book_pkey primary key (borrow_id),
	constraint chk_borrow_dates check ((due_date >= borrow_date)),
	constraint chk_status check (((status)::text = any (array[('reserved'::character varying)::text,
('pending'::character varying)::text,
('borrowed'::character varying)::text]))),
	constraint fk_borrowbook_user foreign key (user_id) references public.users(user_id) on
delete
    cascade
);

create index idx_borrow_book_book_status on
public.borrow_book
    using btree (book_id,
status);

create index idx_borrow_book_expired on
public.borrow_book
    using btree (expired_at)
where
((status)::text = 'pending'::text);

create index idx_borrow_book_user_status on
public.borrow_book
    using btree (user_id,
status);
-- public.damage definition
-- Drop table
-- DROP TABLE public.damage;

create table public.damage (
	damage_id uuid default gen_random_uuid() not null,
	borrow_id uuid not null,
	acm_date date default CURRENT_DATE not null,
	lose bool default false null,
	torn bool default false null,
	constraint damage_pkey primary key (damage_id),
	constraint fk_damage_borrowbook foreign key (borrow_id) references public.borrow_book(borrow_id) on
delete
    cascade
);
-- public.return_book definition
-- Drop table
-- DROP TABLE public.return_book;

create table public.return_book (
	return_id uuid default gen_random_uuid() not null,
	borrow_id uuid not null,
	branch_id int4 not null,
	return_date date default CURRENT_DATE not null,
	constraint return_book_pkey primary key (return_id),
	constraint fk_returnbook_borrowbook foreign key (borrow_id) references public.borrow_book(borrow_id) on
delete
    cascade
);
-- public.room_avail definition
-- Drop table
-- DROP TABLE public.room_avail;

create table public.room_avail (
	avail_id serial4 not null,
	room_id int4 not null,
	start_time time not null,
	end_time time not null,
	constraint chk_start_end check ((start_time < end_time)),
	constraint room_avail_pkey primary key (avail_id),
	constraint fk_availroom_room foreign key (room_id) references public.study_room(room_id)
);
-- public.search_history definition
-- Drop table
-- DROP TABLE public.search_history;

create table public.search_history (
	search_id uuid default gen_random_uuid() not null,
	user_id uuid not null,
	book_clicked varchar(20) null,
	created_at timestamp default CURRENT_TIMESTAMP not null,
	search_content text null,
	filters jsonb null,
	constraint search_history_pkey primary key (search_id),
	constraint fk_search_user foreign key (user_id) references public.users(user_id) on
delete
    cascade
);
-- public.reserve_room definition
-- Drop table
-- DROP TABLE public.reserve_room;

create table public.reserve_room (
	reserve_id uuid default gen_random_uuid() not null,
	user_id uuid not null,
	avail_id int4 not null,
	start_date date not null,
	checkin_time timestamp null,
	pin varchar(10) null,
	expired_at timestamp null,
	status varchar(20) default 'reserved'::character varying not null,
	constraint chk_status check (((status)::text = any (array[('pending'::character varying)::text,
('reserved'::character varying)::text,
('used'::character varying)::text]))),
	constraint reserve_room_pin_key unique (pin),
	constraint reserve_room_pkey primary key (reserve_id),
	constraint fk_reserve_availroom foreign key (avail_id) references public.room_avail(avail_id) on
delete
    cascade,
    constraint fk_reserve_user foreign key (user_id) references public.users(user_id) on
    delete
        cascade
);
-- public.return_room definition
-- Drop table
-- DROP TABLE public.return_room;

create table public.return_room (
	return_id uuid default gen_random_uuid() not null,
	reserve_id uuid not null,
	checkout_time timestamp default CURRENT_TIMESTAMP not null,
	constraint return_room_pkey primary key (return_id),
	constraint fk_returnroom_reserve foreign key (reserve_id) references public.reserve_room(reserve_id) on
delete
    cascade
);
-- public.study_group definition
-- Drop table
-- DROP TABLE public.study_group;

create table public.study_group (
	group_id uuid default gen_random_uuid() not null,
	created_by uuid not null,
	reserve_id uuid not null,
	subject varchar(30) not null,
	title text not null,
	description text null,
	requirements _text null,
	capacity int4 not null,
	current_num int4 default 1 not null,
	status varchar(20) default 'upcoming'::character varying not null,
	constraint chk_capacity_currentnum check ((current_num <= capacity)),
	constraint chk_capacity_positive check ((capacity > 0)),
	constraint chk_currentnum_positive check ((current_num >= 0)),
	constraint chk_status check (((status)::text = any (array[('upcoming'::character varying)::text,
('full'::character varying)::text,
('cancelled'::character varying)::text,
('inprogress'::character varying)::text,
('completed'::character varying)::text,
('expired'::character varying)::text]))),
	constraint study_group_pkey primary key (group_id),
	constraint study_group_reserve_id_key unique (reserve_id),
	constraint fk_studygroup_reserveroom foreign key (reserve_id) references public.reserve_room(reserve_id) on
delete
    cascade,
    constraint fk_studygroup_user foreign key (created_by) references public.users(user_id) on
    delete
        cascade
);
-- public.group_request definition
-- Drop table
-- DROP TABLE public.group_request;

create table public.group_request (
	request_id uuid default gen_random_uuid() not null,
	group_id uuid not null,
	user_id uuid not null,
	created_at timestamp default CURRENT_TIMESTAMP not null,
	"content" text null,
	status varchar(20) default 'pending'::character varying not null,
	constraint chk_status check (((status)::text = any (array[('pending'::character varying)::text,
('approved'::character varying)::text,
('denied'::character varying)::text,
('expired'::character varying)::text]))),
	constraint group_request_pkey primary key (request_id),
	constraint fk_request_studygroup foreign key (group_id) references public.study_group(group_id) on
delete
    cascade,
    constraint fk_request_user foreign key (user_id) references public.users(user_id) on
    delete
        cascade
);
-- public.loan definition
-- Drop table
-- DROP TABLE public.loan;

create table public.loan (
	loan_id uuid default gen_random_uuid() not null,
	return_id uuid null,
	damage_id uuid null,
	user_id uuid not null,
	recog_date date default CURRENT_DATE not null,
	loss bool default false null,
	torn bool default false null,
	overdue bool default false null,
	recog_loan numeric(10, 2) default 0.00 null,
	paid bool default false null,
	constraint loan_pkey primary key (loan_id),
	constraint fk_loan_damge foreign key (damage_id) references public.damage(damage_id) on
delete
    set
    null,
    constraint fk_loan_return foreign key (return_id) references public.return_room(return_id) on
    delete
        set
        null,
        constraint fk_loan_user foreign key (user_id) references public.users(user_id) on
        delete
            cascade
);

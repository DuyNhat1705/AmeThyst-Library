export-databook:
	docker exec -t library_postgres pg_dump -U lib_admin -d postgres -t books -t immutable_array_to_string --clean --if-exists >> 01_databook.sql

export-datalibrary:
	docker exec -t library_postgres pg_dump -U lib_admin -d postgres -t branches -t library > 02_datalibrary.sql

export-initrest:
	docker exec -t library_postgres pg_dump -U lib_admin -d postgres -T books -T branches -T branches_branch_id_seq -T library > 03_init_rest.sql

export-datacsv:
	docker exec -i -e PGCLIENTENCODING=UTF8 library_postgres psql -U lib_admin -d postgres -c "\copy (SELECT book_id, title, author, description, genres, publication_date, num_pages, rating, language_code, embedding FROM public.books) TO '/tmp/books.csv' WITH CSV HEADER;"	
	docker exec -i -e PGCLIENTENCODING=UTF8 library_postgres psql -U lib_admin -d postgres -c "\copy (SELECT branch_id, name_short, address FROM public.branches) TO '/tmp/branches.csv' WITH CSV HEADER;"
	docker exec -i -e PGCLIENTENCODING=UTF8 library_postgres psql -U lib_admin -d postgres -c "\copy (SELECT book_id, branch_id, quantity, available_quantity FROM public.library) TO '/tmp/library.csv' WITH CSV HEADER;"
	docker exec -i -e PGCLIENTENCODING=UTF8 library_postgres psql -U lib_admin -d postgres -c "\copy (SELECT user_id, username, role FROM public.users) TO '/tmp/users.csv' WITH CSV HEADER;"
	docker exec -i -e PGCLIENTENCODING=UTF8 library_postgres psql -U lib_admin -d postgres -c "\copy (SELECT search_id, user_id, book_clicked, created_at, search_content FROM public.search_history) TO '/tmp/searches.csv' WITH CSV HEADER;"
	docker exec -i -e PGCLIENTENCODING=UTF8 library_postgres psql -U lib_admin -d postgres -c "\copy (SELECT borrow_id, user_id, book_id, branch_id, reserve_date, borrow_date, due_date FROM public.borrow_book) TO '/tmp/borrow.csv' WITH CSV HEADER;"

export-cpcsv:
	docker cp library_postgres:/tmp/books.csv ./tmp_csv/books.csv
	docker cp library_postgres:/tmp/branches.csv ./tmp_csv/branches.csv
	docker cp library_postgres:/tmp/library.csv ./tmp_csv/library.csv
	docker cp library_postgres:/tmp/users.csv ./tmp_csv/users.csv
	docker cp library_postgres:/tmp/searches.csv ./tmp_csv/searches.csv
	docker cp library_postgres:/tmp/borrow.csv ./tmp_csv/borrow.csv

export-graph:
	docker exec -i amethyst_memgraph mgconsole -c "DUMP DATABASE;" > ./amethyst_graph_dump.cypherl


import-data:
	docker exec -i library_postgres psql -U lib_admin -d postgres < ./init_db/01_databook.sql
	docker exec -i library_postgres psql -U lib_admin -d postgres < ./init_db/02_datalibrary.sql
	docker exec -i library_postgres psql -U lib_admin -d postgres < ./init_db/03_datafacility.sql
	docker exec -i library_postgres psql -U lib_admin -d postgres < ./init_db/04_datauser.sql
	docker exec -i library_postgres psql -U lib_admin -d postgres < ./init_db/05_init_rest.sql
	docker exec -i library_postgres psql -U lib_admin -d postgres < ./init_db/06_indexes.sql
	docker exec -i library_postgres psql -U lib_admin -d postgres < ./init_db/07_mock_data.sql

nothing:
	
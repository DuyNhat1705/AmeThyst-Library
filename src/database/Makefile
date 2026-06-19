export-databook:
	docker exec -t library_postgres pg_dump -U lib_admin -d library_db -t books > 01_databook.sql

export-datalibrary:
	docker exec -t library_postgres pg_dump -U lib_admin -d library_db -t branches -t library > 02_datalibrary.sql

export-initrest:
	docker exec -t library_postgres pg_dump -U lib_admin -d library_db -T books -T branches -T branches_branch_id_seq -T library > 03_init_rest.sql

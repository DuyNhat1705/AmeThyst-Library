export-databook:
	docker exec -t amethyst_postgres pg_dump -U lib_admin -d postgres -t books > 01_databook.sql

export-datalibrary:
	docker exec -t amethyst_postgres pg_dump -U lib_admin -d postgres -t branches -t library > 02_datalibrary.sql

export-initrest:
	docker exec -t amethyst_postgres pg_dump -U lib_admin -d postgres -T books -T branches -T branches_branch_id_seq -T library > 03_init_rest.sql

CREATE SEQUENCE tb_vaccination_address_seq INCREMENT 1 START 1;

CREATE TABLE tb_vaccination_address
(
	id integer NOT NULL DEFAULT nextval(('tb_vaccination_address_seq'::text)::regclass),
	name varchar(200) NOT NULL,
	zipcode varchar(400) NOT NULL
);

ALTER TABLE tb_vaccination_address ADD CONSTRAINT PK_tb_vaccination_address PRIMARY KEY (id);

CREATE SEQUENCE tb_vaccination_address_agenda_seq INCREMENT 1 START 1;

CREATE TABLE tb_vaccination_address_agenda
(
	id integer NOT NULL DEFAULT nextval(('tb_vaccination_address_agenda_seq'::text)::regclass),
	id_vaccination_address integer NOT NULL,
	date date NOT NULL,
    capacity integer NOT NULL,
	applied integer DEFAULT 0
);

ALTER TABLE tb_vaccination_address_agenda ADD CONSTRAINT PK_tb_vaccination_address_agenda PRIMARY KEY (id);

ALTER TABLE tb_vaccination_address_agenda ADD CONSTRAINT FK_tb_vaccination_address_agenda_tb_tb_vaccination_address
FOREIGN KEY (id_vaccination_address) REFERENCES tb_vaccination_address (id) ON DELETE No Action ON UPDATE No Action;

ALTER TABLE tb_vaccination_address_agenda ADD CONSTRAINT unique_date_address UNIQUE (id_vaccination_address, date);



CREATE SEQUENCE tb_patient_seq INCREMENT 1 START 1;

CREATE TABLE tb_patient
(
	id integer NOT NULL DEFAULT nextval(('tb_patient_seq'::text)::regclass),
	name VARCHAR(250) NOT NULL,
	birthday date NOT NULL,
    zipcode VARCHAR(20) NOT NULL
);

ALTER TABLE tb_patient ADD CONSTRAINT PK_tb_patient PRIMARY KEY (id);

ALTER TABLE tb_patient ADD CONSTRAINT unique_patient UNIQUE (name, birthday, zipcode);
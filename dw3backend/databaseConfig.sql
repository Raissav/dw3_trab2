----- Cria um banco de dados
-- create database dw3;

create table IF NOT EXISTS medicos (
    medicoid bigserial constraint pk_medicos PRIMARY KEY,
    crm varchar(50) UNIQUE,
    nome VARCHAR(70),
    especializacao VARCHAR(40),
    deleted boolean DEFAULT false
);

insert into medicos values 
    (default, '123456/SP', 'Dr. Carlos Almeida da Silva', 'Clinico Geral', true),
    (default, '789101/SP', 'Dra. Maria Eduarda Rodrigues', 'Pediatra', true),
    (default, '123212/SP', 'Dra. Fabiana Castro de Oliveira', 'Dermatologista', false)
    ON CONFLICT DO NOTHING;

create table IF NOT EXISTS pacientes (
    pacienteid bigserial constraint pk_pacientes PRIMARY KEY,
    cpf varchar(14) UNIQUE,
    nome varchar(50),
    endereco VARCHAR(70),
    datanascimento date,
    deleted boolean DEFAULT false
);

insert into pacientes values 
    (default, '111.222.333-44', 'José de Jesus Gomes', 'Rua São Paulo, 1 - São Paulo/SP', '1975-01-31'),
    (default, '444.555.666-77', 'Eduardo de Leite Romeo', 'Av. Brasil, 341 - Votuporanga/SP', '2017-08-13'),
    (default, '111.111.111-11', 'Laura Ferrari Otelo II', 'Rua Pena Telhado, 2005 - São Paulo/SP', '1999-02-21'),
    (default, '333.222.333-22', 'Marta C. Nascimento Alves', 'Rua Caire, 5601 - São Paulo/SP', '1969-07-20')
ON CONFLICT DO NOTHING;

create table IF NOT EXISTS usuarios (
    usuarioid bigserial constraint pk_usuarios PRIMARY KEY,
    username varchar(10) UNIQUE,
    password text,
    deleted boolean DEFAULT false
);

CREATE EXTENSION if NOT EXISTS pgcrypto;

insert into usuarios values 
    (default, 'admin', crypt('admin', gen_salt('bf'))), -- senha criptografada com bcrypt
    (default, 'qwe', crypt('qwe', gen_salt('bf'))) -- senha criptografada com bcrypt
ON CONFLICT DO NOTHING;

create table IF NOT EXISTS consultas (
    consultaid bigserial constraint pk_consultas PRIMARY KEY,
    codigo varchar(20) UNIQUE,
    dataconsulta date,
    medicoid bigint constraint fk_medicos_consultas REFERENCES medicos,
    pacienteid bigint constraint fk_pacientes_consultas REFERENCES pacientes,
    deleted boolean DEFAULT false
);

insert into consultas values 
    (default, 'C001', '2023-11-20',(SELECT medicoid from medicos where crm = '123456/SP'),(SELECT pacienteid from pacientes where cpf = '111.222.333-44')),
    (default, 'C002', '2023-11-05',(SELECT medicoid from medicos where crm = '789101/SP'),(SELECT pacienteid from pacientes where cpf = '444.555.666-77'))
ON CONFLICT DO NOTHING;

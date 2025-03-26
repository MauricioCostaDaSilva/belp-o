--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2025-03-26 00:56:24

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 16617)
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- TOC entry 4876 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- TOC entry 890 (class 1247 OID 16655)
-- Name: forma_pagamento; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.forma_pagamento AS ENUM (
    'dinheiro',
    'cartao',
    'pix'
);


ALTER TYPE public.forma_pagamento OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 16661)
-- Name: cliente; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cliente (
    id integer NOT NULL,
    nome character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    telefone character varying(20),
    senha text NOT NULL,
    endereco_id integer
);


ALTER TABLE public.cliente OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16666)
-- Name: cliente_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cliente_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cliente_id_seq OWNER TO postgres;

--
-- TOC entry 4877 (class 0 OID 0)
-- Dependencies: 219
-- Name: cliente_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cliente_id_seq OWNED BY public.cliente.id;


--
-- TOC entry 220 (class 1259 OID 16667)
-- Name: endereco; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.endereco (
    id integer NOT NULL,
    cliente_id integer,
    cidade character varying(100) NOT NULL,
    bairro character varying(100) NOT NULL,
    rua character varying(200) NOT NULL,
    cep character varying(20),
    numero character varying(200)
);


ALTER TABLE public.endereco OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16672)
-- Name: endereco_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.endereco_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.endereco_id_seq OWNER TO postgres;

--
-- TOC entry 4878 (class 0 OID 0)
-- Dependencies: 221
-- Name: endereco_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.endereco_id_seq OWNED BY public.endereco.id;


--
-- TOC entry 222 (class 1259 OID 16673)
-- Name: pagamentos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pagamentos (
    id integer NOT NULL,
    forma_pagamento character varying(50) NOT NULL,
    valor numeric(10,2) NOT NULL,
    status character varying(20) NOT NULL,
    cliente_id integer
);


ALTER TABLE public.pagamentos OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16676)
-- Name: pagamentos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pagamentos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pagamentos_id_seq OWNER TO postgres;

--
-- TOC entry 4879 (class 0 OID 0)
-- Dependencies: 223
-- Name: pagamentos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pagamentos_id_seq OWNED BY public.pagamentos.id;


--
-- TOC entry 224 (class 1259 OID 16677)
-- Name: reset_senha; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reset_senha (
    id integer NOT NULL,
    cliente_id integer,
    token character varying(255) NOT NULL,
    expiracao timestamp without time zone DEFAULT (now() + '48:00:00'::interval) NOT NULL
);


ALTER TABLE public.reset_senha OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16681)
-- Name: reset_senha_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reset_senha_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reset_senha_id_seq OWNER TO postgres;

--
-- TOC entry 4880 (class 0 OID 0)
-- Dependencies: 225
-- Name: reset_senha_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reset_senha_id_seq OWNED BY public.reset_senha.id;


--
-- TOC entry 4696 (class 2604 OID 16682)
-- Name: cliente id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cliente ALTER COLUMN id SET DEFAULT nextval('public.cliente_id_seq'::regclass);


--
-- TOC entry 4697 (class 2604 OID 16683)
-- Name: endereco id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.endereco ALTER COLUMN id SET DEFAULT nextval('public.endereco_id_seq'::regclass);


--
-- TOC entry 4698 (class 2604 OID 16684)
-- Name: pagamentos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pagamentos ALTER COLUMN id SET DEFAULT nextval('public.pagamentos_id_seq'::regclass);


--
-- TOC entry 4699 (class 2604 OID 16685)
-- Name: reset_senha id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reset_senha ALTER COLUMN id SET DEFAULT nextval('public.reset_senha_id_seq'::regclass);


--
-- TOC entry 4863 (class 0 OID 16661)
-- Dependencies: 218
-- Data for Name: cliente; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cliente (id, nome, email, telefone, senha, endereco_id) FROM stdin;
1	rafael	rafael@gmail	1233233	$2a$06$PDe70KLz9vKz.uM/qp5W8OQlekrY6.mSuZjfXM5bBt3m6mDcM/1Z.	1
\.


--
-- TOC entry 4865 (class 0 OID 16667)
-- Dependencies: 220
-- Data for Name: endereco; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.endereco (id, cliente_id, cidade, bairro, rua, cep, numero) FROM stdin;
1	1	rio grande	sao joao	kennedy	22222233	20
\.


--
-- TOC entry 4867 (class 0 OID 16673)
-- Dependencies: 222
-- Data for Name: pagamentos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pagamentos (id, forma_pagamento, valor, status, cliente_id) FROM stdin;
1	dinheiro	25.00	pago	1
\.


--
-- TOC entry 4869 (class 0 OID 16677)
-- Dependencies: 224
-- Data for Name: reset_senha; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reset_senha (id, cliente_id, token, expiracao) FROM stdin;
\.


--
-- TOC entry 4881 (class 0 OID 0)
-- Dependencies: 219
-- Name: cliente_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cliente_id_seq', 2, true);


--
-- TOC entry 4882 (class 0 OID 0)
-- Dependencies: 221
-- Name: endereco_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.endereco_id_seq', 2, false);


--
-- TOC entry 4883 (class 0 OID 0)
-- Dependencies: 223
-- Name: pagamentos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pagamentos_id_seq', 1, true);


--
-- TOC entry 4884 (class 0 OID 0)
-- Dependencies: 225
-- Name: reset_senha_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reset_senha_id_seq', 1, false);


--
-- TOC entry 4702 (class 2606 OID 16687)
-- Name: cliente cliente_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_email_key UNIQUE (email);


--
-- TOC entry 4704 (class 2606 OID 16689)
-- Name: cliente cliente_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_pkey PRIMARY KEY (id);


--
-- TOC entry 4706 (class 2606 OID 16691)
-- Name: endereco endereco_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.endereco
    ADD CONSTRAINT endereco_pkey PRIMARY KEY (id);


--
-- TOC entry 4708 (class 2606 OID 16693)
-- Name: pagamentos pagamentos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pagamentos
    ADD CONSTRAINT pagamentos_pkey PRIMARY KEY (id);


--
-- TOC entry 4710 (class 2606 OID 16695)
-- Name: reset_senha reset_senha_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reset_senha
    ADD CONSTRAINT reset_senha_pkey PRIMARY KEY (id);


--
-- TOC entry 4712 (class 2606 OID 16697)
-- Name: reset_senha reset_senha_token_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reset_senha
    ADD CONSTRAINT reset_senha_token_key UNIQUE (token);


--
-- TOC entry 4714 (class 2606 OID 16698)
-- Name: endereco endereco_cliente_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.endereco
    ADD CONSTRAINT endereco_cliente_id_fkey FOREIGN KEY (cliente_id) REFERENCES public.cliente(id);


--
-- TOC entry 4713 (class 2606 OID 16703)
-- Name: cliente fk_cliente_endereco; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT fk_cliente_endereco FOREIGN KEY (endereco_id) REFERENCES public.endereco(id);


--
-- TOC entry 4715 (class 2606 OID 16708)
-- Name: pagamentos fk_pagamentos_cliente; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pagamentos
    ADD CONSTRAINT fk_pagamentos_cliente FOREIGN KEY (cliente_id) REFERENCES public.cliente(id);


--
-- TOC entry 4716 (class 2606 OID 16713)
-- Name: pagamentos pagamentos_cliente_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pagamentos
    ADD CONSTRAINT pagamentos_cliente_id_fkey FOREIGN KEY (cliente_id) REFERENCES public.cliente(id);


--
-- TOC entry 4717 (class 2606 OID 16718)
-- Name: reset_senha reset_senha_cliente_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reset_senha
    ADD CONSTRAINT reset_senha_cliente_id_fkey FOREIGN KEY (cliente_id) REFERENCES public.cliente(id);


-- Completed on 2025-03-26 00:56:24

--
-- PostgreSQL database dump complete
--


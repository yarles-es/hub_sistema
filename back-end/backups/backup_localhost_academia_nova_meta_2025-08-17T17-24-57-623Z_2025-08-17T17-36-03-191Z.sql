--
-- PostgreSQL database dump
--

\restrict PJBpyMge3J60ucaEJOQNgMzenbNR9KD11zzK6qcmdppupgrIFCneoYrzASAzCDa

-- Dumped from database version 17.2 (Debian 17.2-1.pgdg120+1)
-- Dumped by pg_dump version 17.6 (Ubuntu 17.6-1.pgdg22.04+1)

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
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- *not* creating schema, since initdb creates it


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS '';


--
-- Name: FormPagamento; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."FormPagamento" AS ENUM (
    'DINHEIRO',
    'CARTAO',
    'PIX',
    'GRATIS'
);


--
-- Name: StatusMensalidade; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."StatusMensalidade" AS ENUM (
    'PENDENTE',
    'PAGO',
    'CANCELADO',
    'ATRASADO'
);


--
-- Name: TipoCatraca; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."TipoCatraca" AS ENUM (
    'ENTRADA',
    'SAIDA',
    'BLOQUEIO'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: CadastroBiometria; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."CadastroBiometria" (
    id integer NOT NULL,
    cliente_id integer NOT NULL,
    id_catraca integer NOT NULL,
    primeira_etapa boolean DEFAULT true NOT NULL,
    segunda_etapa boolean DEFAULT false NOT NULL,
    terceira_etapa boolean DEFAULT false NOT NULL,
    error_message text,
    success boolean DEFAULT false NOT NULL
);


--
-- Name: CadastroBiometria_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."CadastroBiometria_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: CadastroBiometria_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."CadastroBiometria_id_seq" OWNED BY public."CadastroBiometria".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


--
-- Name: catracas_info; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.catracas_info (
    id integer NOT NULL,
    ip text NOT NULL,
    porta integer NOT NULL,
    tipo integer,
    conectado boolean DEFAULT false NOT NULL,
    conexao_manual boolean DEFAULT false NOT NULL,
    network_name text NOT NULL
);


--
-- Name: clientes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.clientes (
    id integer NOT NULL,
    nome text NOT NULL,
    email text NOT NULL,
    telefone text,
    data_nascimento timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    catraca_id integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    plano_id integer NOT NULL,
    dia_mensalidade integer,
    ativo boolean DEFAULT true NOT NULL,
    "CadastroBiometriaId" integer,
    isento boolean DEFAULT false NOT NULL
);


--
-- Name: clientes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.clientes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: clientes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.clientes_id_seq OWNED BY public.clientes.id;


--
-- Name: logs_sistema; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.logs_sistema (
    id integer NOT NULL,
    usuario_id integer NOT NULL,
    acao text NOT NULL,
    cliente_id integer,
    data_hora timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: logs_sistema_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.logs_sistema_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: logs_sistema_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.logs_sistema_id_seq OWNED BY public.logs_sistema.id;


--
-- Name: mensalidades; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.mensalidades (
    id integer NOT NULL,
    cliente_id integer NOT NULL,
    valor double precision NOT NULL,
    vencimento timestamp(3) without time zone NOT NULL,
    status public."StatusMensalidade" DEFAULT 'PENDENTE'::public."StatusMensalidade" NOT NULL,
    forma_pagamento public."FormPagamento",
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    data_pagamento timestamp(3) without time zone,
    valor_pago double precision
);


--
-- Name: mensalidades_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.mensalidades_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: mensalidades_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.mensalidades_id_seq OWNED BY public.mensalidades.id;


--
-- Name: pagamentos_avulsos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pagamentos_avulsos (
    id integer NOT NULL,
    nome_cliente text,
    valor double precision NOT NULL,
    forma_pagamento public."FormPagamento" NOT NULL,
    data_hora timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    observacao text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


--
-- Name: pagamentos_avulsos_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.pagamentos_avulsos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pagamentos_avulsos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.pagamentos_avulsos_id_seq OWNED BY public.pagamentos_avulsos.id;


--
-- Name: planos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.planos (
    id integer NOT NULL,
    nome text NOT NULL,
    descricao text,
    valor double precision NOT NULL,
    ativo boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


--
-- Name: planos_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.planos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: planos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.planos_id_seq OWNED BY public.planos.id;


--
-- Name: registros_acesso; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.registros_acesso (
    id integer NOT NULL,
    cliente_id integer,
    tipo_catraca public."TipoCatraca" NOT NULL,
    data_hora timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


--
-- Name: registros_acesso_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.registros_acesso_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: registros_acesso_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.registros_acesso_id_seq OWNED BY public.registros_acesso.id;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nome text NOT NULL,
    email text NOT NULL,
    senha text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    ativo boolean DEFAULT true NOT NULL,
    administrador boolean DEFAULT false NOT NULL
);


--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- Name: CadastroBiometria id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CadastroBiometria" ALTER COLUMN id SET DEFAULT nextval('public."CadastroBiometria_id_seq"'::regclass);


--
-- Name: clientes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clientes ALTER COLUMN id SET DEFAULT nextval('public.clientes_id_seq'::regclass);


--
-- Name: logs_sistema id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.logs_sistema ALTER COLUMN id SET DEFAULT nextval('public.logs_sistema_id_seq'::regclass);


--
-- Name: mensalidades id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mensalidades ALTER COLUMN id SET DEFAULT nextval('public.mensalidades_id_seq'::regclass);


--
-- Name: pagamentos_avulsos id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pagamentos_avulsos ALTER COLUMN id SET DEFAULT nextval('public.pagamentos_avulsos_id_seq'::regclass);


--
-- Name: planos id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.planos ALTER COLUMN id SET DEFAULT nextval('public.planos_id_seq'::regclass);


--
-- Name: registros_acesso id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.registros_acesso ALTER COLUMN id SET DEFAULT nextval('public.registros_acesso_id_seq'::regclass);


--
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Data for Name: CadastroBiometria; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."CadastroBiometria" (id, cliente_id, id_catraca, primeira_etapa, segunda_etapa, terceira_etapa, error_message, success) FROM stdin;
93	23	5	t	f	f	Erro ao registrar biometria	f
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
85688651-f7f7-47bd-aaaa-26cc842c1469	b65f7e92935a576217d85f45459505da2c402fdde69d32ff74158d56f3c31e10	2025-07-24 18:20:05.635675+00	20250724182005_init	\N	\N	2025-07-24 18:20:05.621207+00	1
13f340af-e610-4ce3-a64d-34fc01b9e237	84aa8c58a9fc6075490b40d9f8aa7c780e658213d850b801e539465d601c8941	2025-07-24 19:27:48.018936+00	20250724192748_init2	\N	\N	2025-07-24 19:27:48.01268+00	1
c77c089e-eba0-47c5-80d3-3cbda2ecbb02	2ca8b449ccb5b53f3c20f35319981708ce7cf866ae937c809beeab00f52464a8	2025-08-08 04:09:02.031601+00	20250808040902_nova_tabela_config_catraca	\N	\N	2025-08-08 04:09:02.025804+00	1
2542ecf6-43ce-4f23-b4ec-fddfa5b5de8d	6b7f94a35b0087f7d411cee72cbea2d65db408a56ee97ce3e8b223585d817f36	2025-07-24 19:28:10.495733+00	20250724192810_init3	\N	\N	2025-07-24 19:28:10.491514+00	1
6059c20e-9ce8-47c8-92f8-9413da0c6d84	feeb5b36964796d277c44379ca7c068dbcb31d8845e8a46749c7a4cc37460604	2025-07-24 21:38:52.071669+00	20250724213852_init4	\N	\N	2025-07-24 21:38:52.065781+00	1
cb8c5ced-380c-49d9-99e8-360bfd410ee9	8c26e55e4cb29a15b98b31f0300a7c249442559d9964b25cf4d137458459de85	2025-07-29 20:25:59.413835+00	20250729202559_adicionado_coluna_ativo_clientes	\N	\N	2025-07-29 20:25:59.40593+00	1
7e6780d0-41f7-4784-9597-3af48f13a334	bc04b3ee2c83e57b7654e2c2f1a15585ed18ff951c0d67e0d010d44d42e8f81c	2025-08-08 04:09:30.956384+00	20250808040930_adicionado_network_tabela_catraca	\N	\N	2025-08-08 04:09:30.951673+00	1
6e9ba206-bc9f-4ab3-9493-0fd8757d9aef	307e37f56161ab557197bfffd6c7b5f557091ff2c24b3db66587eb2a5bb36578	2025-07-30 17:53:28.28479+00	20250730175328_adicionado_dia_mensalidade_opcional	\N	\N	2025-07-30 17:53:28.278777+00	1
e81aeb88-b41d-452e-bf03-e1c64ed7f734	02256400911cb81445b5f2c47b746d15b2e9da460afe5e2154ab77b78b479359	2025-07-31 21:18:19.909033+00	20250731211819_novo_migrate	\N	\N	2025-07-31 21:18:19.902669+00	1
af16918c-6db0-4058-881d-3ebdecb5436e	b1d3dd58776ad41e128a72e02cafa5f903c1f72ca0cd5b4a58aa7e219f8f10a2	2025-08-15 03:17:25.338554+00	20250815031725_migration_isento_cliente	\N	\N	2025-08-15 03:17:25.331988+00	1
699bcdaa-6593-4740-9dbc-29fcd970bf6b	c1aa39f54290ee455cd6a63e59bc5e0760fab3c1be5dd3bc69af7075a51efb0a	2025-08-01 03:20:35.420396+00	20250801032035_novo_migrate_1	\N	\N	2025-08-01 03:20:35.402278+00	1
36bcb18f-a37f-48e3-b68b-2c5e41981a5c	a0fa90a541ebc1dea473acfef280f24220c1578785df985ff7ffc518ed98d991	2025-08-09 03:12:26.847947+00	20250809031226_adicionado_tabela_cadastro_biometria	\N	\N	2025-08-09 03:12:26.833014+00	1
d36897d9-5f73-4d31-9e3c-a48ffb4bc875	b4bbf65d0dc08751b85a74a9df1d8d1d9d6bac2faf38481c826704079c9bdedb	2025-08-01 03:26:12.409568+00	20250801032612_novo_migrate_2	\N	\N	2025-08-01 03:26:12.404907+00	1
24d00112-3078-426f-bd7f-7458812cf365	78de1026aca2eed1e128134364611a2590fe832e995c682e9ba9ec7ea41762ef	2025-08-07 14:33:32.380044+00	20250807143332_adicionado_unique_catraca_id	\N	\N	2025-08-07 14:33:32.371286+00	1
a1b46e93-f950-4733-86ca-8ab9d379a1cb	b474d6f9e2a7734363113648d15cba8f8bf9b19a0617ad7ba661b8b86b3a435e	2025-08-07 14:40:45.619854+00	20250807144045_adicionado_bloqueio_no_tipo_catraca	\N	\N	2025-08-07 14:40:45.61529+00	1
c7008008-fb43-45cf-bffc-b06366042146	e9bb6acf4046982be7137402a7a14b6779a763d03e1f939eb56b9e0d973553aa	2025-08-10 21:41:05.501397+00	20250810214105_adicionado_primeira_etapa_true	\N	\N	2025-08-10 21:41:05.492819+00	1
21fcc79d-5cab-44c8-9125-8380d3e8b4b2	c002d111be664506aeb27da42d63b723a03afb5023c600812d6f8bb9244b9f7b	2025-08-08 02:59:05.601492+00	20250808025905_nova_tabela_config_catraca	\N	\N	2025-08-08 02:59:05.588121+00	1
e2522255-0bbc-486e-a776-910b227b4b10	f8522a9b09156bc84759a9ab01a5fa3e3d61ae69b2eedea78904218dc2b8272f	2025-08-08 04:07:12.54824+00	20250808040712_adicionado_network_tabela_catraca	\N	\N	2025-08-08 04:07:12.543174+00	1
abd50ca4-fca7-4c97-8373-8b4aaeebe5ee	a243323232dc094249af942252d38d3a2aa54d308d336a085fdb6b79c8afc483	2025-08-10 21:44:17.386291+00	20250810214417_adicionado_error_cadastro_biometria	\N	\N	2025-08-10 21:44:17.378514+00	1
4591f75d-6ee7-4d19-bc46-44b049c110f2	b713540d1b352bfbf89df21a8c302027d28b0486a2781496c812621c48777a4a	2025-08-11 17:24:35.645482+00	20250811172435_adicionado_coluna_success_cadastro_biometria	\N	\N	2025-08-11 17:24:35.638035+00	1
05e12cf6-69ca-40d1-b319-ae6fa77b2a7a	e869dcd1cdfde6b297dd71fe126431feefc21722fbd5152f7736f42e72d4253c	2025-08-14 20:55:07.431232+00	20250814205507_cliente_opcional_registro_acesso	\N	\N	2025-08-14 20:55:07.421179+00	1
2146ee23-aba9-4775-9b98-d729b7929723	a35a6a725d86fca5b15e18ae55e531980242f77a3219ea6c596cd87edb2ad73f	2025-08-14 21:01:09.23297+00	20250814210109_cliente_opcional_registro_acesso	\N	\N	2025-08-14 21:01:09.226603+00	1
\.


--
-- Data for Name: catracas_info; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.catracas_info (id, ip, porta, tipo, conectado, conexao_manual, network_name) FROM stdin;
41	192.168.4.37	7878	1	f	f	eth0
\.


--
-- Data for Name: clientes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.clientes (id, nome, email, telefone, data_nascimento, catraca_id, "createdAt", "updatedAt", plano_id, dia_mensalidade, ativo, "CadastroBiometriaId", isento) FROM stdin;
23	AUGUSTO ESCOPELI GOMES	augusto100@gmail.com	99999999999	1962-08-14 03:00:00	\N	2025-08-15 00:35:56.571	2025-08-15 00:35:56.607	3	15	t	\N	f
12	DIOGO DOS SANTOS	diogo100@gmail.com	27995195426	1995-09-15 03:00:00	\N	2025-08-03 16:54:29.459	2025-08-04 21:22:12.164	1	4	t	\N	f
11	VANDERLEI DO ESPIRITO SANTO	vanderleidoespiritosanto100@gmail.com	27999824553	1968-01-02 03:00:00	\N	2025-08-01 23:48:51.45	2025-08-11 00:26:19.798	1	4	t	\N	f
18	RODRIGO EMERSON TEIXEIRA	rodrigo100@gmail.com	27998646546	1989-05-10 03:00:00	\N	2025-08-05 16:05:08.081	2025-08-06 16:16:36.262	1	3	t	\N	f
14	JONAS DA SILVA PEREIRA	jonas100@gmail.com	27994152348	1990-04-25 03:00:00	\N	2025-08-04 21:31:57.774	2025-08-04 21:33:28.33	1	4	t	\N	f
19	VANESSA TEIXEIRA	vanessa100@gmail.com	27997771165	1995-03-04 03:00:00	\N	2025-08-05 16:15:15.156	2025-08-11 02:01:18.03	1	10	t	\N	f
15	JOSE ANTONIO DA SILVA	jose10@gmail.com	27999999999	1984-08-26 03:00:00	\N	2025-08-05 15:28:49.865	2025-08-05 15:29:53.032	2	5	t	\N	f
21	TESTE ANDRADE	teste100@gmail.com	27985656554	1996-06-25 03:00:00	\N	2025-08-05 16:21:40.603	2025-08-11 17:46:03.557	2	10	t	\N	f
17	ELIAS NETO DA SILVA	elias@gmail.com	27998485302	1990-04-15 03:00:00	\N	2025-08-05 15:56:22.651	2025-08-11 17:46:03.557	2	5	t	\N	f
20	ELIAS ZUMBERG	elias200@gmail.com	27954664225	1985-06-10 03:00:00	\N	2025-08-05 16:18:29.965	2025-08-10 22:05:22.548	1	4	t	\N	f
16	ANDRE MATOS	andre123@gmail.com	27995196020	1996-06-23 03:00:00	\N	2025-08-05 15:53:03.22	2025-08-10 22:42:55.075	1	4	t	\N	f
25	TESTANDO NOVO	testando100@gmail.com	27997771165	1995-06-15 03:00:00	\N	2025-08-15 03:37:50.513	2025-08-15 03:37:50.549	1	15	t	\N	f
22	JOAO PENA	joao100@gmail.com	27997771165	1996-06-20 03:00:00	\N	2025-08-05 16:33:26.005	2025-08-11 18:00:30.535	1	10	t	\N	f
10	LUSINETE MOREIRA DE ANDRADE	lusinete100@gmail.com	27997771165	1965-09-25 03:00:00	\N	2025-07-31 18:14:23.979	2025-08-11 18:44:13.392	2	15	t	\N	f
9	YARLES DE ANDRADE DO ESPIRITO SANTO	yarles100@gmail.com	27995196020	1996-06-24 03:00:00	1	2025-07-30 18:20:40.262	2025-08-11 18:44:32.672	2	4	t	\N	f
13	DAVI MOREIRA DO ESPIRITO SANTO	davimoreira100@gmail.com	27999824553	1995-08-27 03:00:00	2	2025-08-04 21:15:11.125	2025-08-14 20:31:32.426	2	4	t	\N	f
24	ADRIANO KNACK	adriano100@gmail.com	99999999999	1992-05-16 03:00:00	3	2025-08-15 00:54:31.879	2025-08-15 04:02:14.394	1	15	t	\N	t
26	JORGE DA SILVA	jorge100@gmail.com	27997771160	2000-09-06 03:00:00	4	2025-08-15 03:39:22.557	2025-08-16 17:38:13.965	2	15	t	\N	f
\.


--
-- Data for Name: logs_sistema; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.logs_sistema (id, usuario_id, acao, cliente_id, data_hora) FROM stdin;
1	2	Usuário logado	\N	2025-08-15 17:18:31.98
2	2	Buscou clientes por aniversário	\N	2025-08-15 17:18:32.866
3	2	Buscou clientes por aniversário	\N	2025-08-15 17:19:17.43
4	2	Consultou todas as diárias	\N	2025-08-15 17:19:23.505
5	2	Consultou todas as diárias	\N	2025-08-15 17:19:36.004
6	2	Consultou todas as diárias	\N	2025-08-15 17:19:37.414
7	2	Consultou todas as diárias	\N	2025-08-15 17:19:38.128
8	2	Consultou todas as diárias	\N	2025-08-15 17:19:38.721
9	2	Consultou todas as diárias	\N	2025-08-15 17:19:39.19
10	2	Consultou todas as diárias	\N	2025-08-15 17:19:41.615
11	2	Criou diária id: 12	\N	2025-08-15 17:19:57.383
12	2	Consultou todas as diárias	\N	2025-08-15 17:19:57.391
13	2	Buscou mensagens da Catraca	\N	2025-08-15 17:21:43.597
14	2	Buscou duração de interação da Catraca	\N	2025-08-15 17:21:43.597
15	2	Liberou entrada da Catraca	\N	2025-08-15 17:21:47.178
16	2	Buscou duração de interação da Catraca	\N	2025-08-15 17:21:52.145
17	2	Buscou mensagens da Catraca	\N	2025-08-15 17:21:52.189
18	2	Liberou livre da Catraca	\N	2025-08-15 17:21:53.991
23	2	Buscou ID disponível da Catraca	\N	2025-08-15 17:27:07.69
24	2	Setou primeira mensagem da Catraca	\N	2025-08-15 17:28:53.74
25	2	Usuário logado	\N	2025-08-16 13:54:37.916
26	2	Usuário logado	\N	2025-08-16 13:56:38.625
27	2	Liberou entrada da Catraca	\N	2025-08-16 13:57:00.128
28	2	Usuário logado	\N	2025-08-16 13:58:35.577
29	2	Buscou ID disponível da Catraca	\N	2025-08-16 14:43:00.203
30	2	Buscou ID disponível da Catraca	\N	2025-08-16 14:43:17.916
31	2	Iniciou cadastro de biometria	25	2025-08-16 14:43:22.551
32	2	Buscou primeiro cadastro de biometria	\N	2025-08-16 14:43:22.566
33	2	Buscou primeiro cadastro de biometria	\N	2025-08-16 14:43:26.782
34	2	Buscou ID disponível da Catraca	\N	2025-08-16 14:44:01.33
35	2	Atualizou plano id: 3	\N	2025-08-16 14:46:13.276
36	2	Atualizou plano id: 3	\N	2025-08-16 14:46:15.359
37	2	Liberou livre da Catraca	\N	2025-08-16 14:46:42.6
38	2	Liberou saída da Catraca	\N	2025-08-16 14:48:27.404
39	2	Buscou ID disponível da Catraca	\N	2025-08-16 14:53:07.855
40	2	Iniciou cadastro de biometria	25	2025-08-16 14:53:14.498
41	2	Buscou primeiro cadastro de biometria	\N	2025-08-16 14:53:14.516
42	2	Buscou primeiro cadastro de biometria	\N	2025-08-16 14:53:18.722
43	2	Cancelou operação de biometria	\N	2025-08-16 14:54:17.214
44	2	Buscou ID disponível da Catraca	\N	2025-08-16 14:54:20.623
45	2	Iniciou cadastro de biometria	25	2025-08-16 14:54:24.424
46	2	Buscou primeiro cadastro de biometria	\N	2025-08-16 14:54:24.437
47	2	Cancelou operação de biometria	\N	2025-08-16 14:54:27.434
48	2	Usuário logado	\N	2025-08-16 15:59:12.23
49	2	Liberou entrada da Catraca	\N	2025-08-16 16:02:41.724
50	2	Liberou livre da Catraca	\N	2025-08-16 16:32:25.99
51	2	Setou duração de interação da Catraca	\N	2025-08-16 16:37:55.01
52	2	Setou duração de interação da Catraca	\N	2025-08-16 16:37:58.824
53	2	Setou sentido horário da Catraca	\N	2025-08-16 16:38:01.522
54	2	Setou sentido horário da Catraca	\N	2025-08-16 16:38:03.268
55	2	Buscou ID disponível da Catraca	\N	2025-08-16 16:38:13.618
56	2	Cancelou operação de biometria	\N	2025-08-16 16:38:15.53
57	2	Buscou ID disponível da Catraca	\N	2025-08-16 16:40:49.321
58	2	Cancelou operação de biometria	\N	2025-08-16 16:41:10.728
59	2	Buscou ID disponível da Catraca	\N	2025-08-16 16:41:13.514
60	2	Iniciou cadastro de biometria	23	2025-08-16 16:41:18.548
61	2	Buscou primeiro cadastro de biometria	\N	2025-08-16 16:41:18.563
62	2	Buscou primeiro cadastro de biometria	\N	2025-08-16 16:42:04.071
63	2	Cancelou operação de biometria	\N	2025-08-16 16:42:03.065
64	2	Buscou ID disponível da Catraca	\N	2025-08-16 16:42:09.659
65	2	Iniciou cadastro de biometria	23	2025-08-16 16:42:11.429
66	2	Buscou primeiro cadastro de biometria	\N	2025-08-16 16:42:11.441
67	2	Buscou ID disponível da Catraca	\N	2025-08-16 16:42:24.9
68	2	Iniciou cadastro de biometria	23	2025-08-16 16:42:27.77
69	2	Buscou primeiro cadastro de biometria	\N	2025-08-16 16:42:27.784
70	2	Cancelou operação de biometria	\N	2025-08-16 16:42:30.357
71	2	Atualizou cliente	26	2025-08-16 17:38:13.97
72	2	Usuário logado	\N	2025-08-16 17:41:45.637
73	2	Buscou clientes por nome	\N	2025-08-16 18:15:58.486
74	2	Buscou clientes por nome	\N	2025-08-16 18:18:44.125
75	2	Buscou clientes por nome	\N	2025-08-16 18:19:37.096
76	2	Buscou clientes por nome	\N	2025-08-16 18:20:40.823
77	2	Buscou clientes por nome	\N	2025-08-16 18:27:49.002
78	2	Buscou clientes por nome	\N	2025-08-16 18:27:56.953
79	2	Buscou clientes por nome	\N	2025-08-16 18:28:41.491
80	2	Buscou clientes por nome	\N	2025-08-16 18:28:43.425
81	2	Buscou clientes por nome	\N	2025-08-16 18:32:02.832
82	2	Criou usuário id: 3	\N	2025-08-16 19:00:51.33
83	3	Usuário logado	\N	2025-08-16 19:05:28.374
84	2	Usuário logado	\N	2025-08-16 19:13:01.572
85	2	Atualizou usuário id: 3	\N	2025-08-16 19:36:56.792
86	2	Usuário logado	\N	2025-08-17 16:21:40.744
87	2	Liberou entrada da Catraca	\N	2025-08-17 16:27:34.729
88	2	Liberou livre da Catraca	\N	2025-08-17 16:27:37.127
89	2	Liberou saída da Catraca	\N	2025-08-17 16:27:40.548
90	2	Liberou livre da Catraca	\N	2025-08-17 16:27:41.597
91	2	Liberou livre da Catraca	\N	2025-08-17 16:27:42.421
92	2	Liberou livre da Catraca	\N	2025-08-17 16:27:43.019
93	2	Liberou livre da Catraca	\N	2025-08-17 16:30:30.274
\.


--
-- Data for Name: mensalidades; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.mensalidades (id, cliente_id, valor, vencimento, status, forma_pagamento, created_at, updated_at, data_pagamento, valor_pago) FROM stdin;
9	9	100	2025-07-31 03:00:00	CANCELADO	\N	2025-07-31 17:44:12.994	2025-07-31 17:44:26.414	\N	\N
8	9	100	2025-07-30 03:00:00	PAGO	PIX	2025-07-30 18:20:40.298	2025-07-31 21:20:16.235	2025-07-30 03:00:00	100
13	12	100	2025-08-03 03:00:00	CANCELADO	\N	2025-08-03 16:54:29.473	2025-08-04 02:35:36.269	\N	\N
12	11	100	2025-08-01 03:00:00	CANCELADO	\N	2025-08-01 23:48:51.477	2025-08-04 02:38:22.381	\N	\N
78	26	100	2025-08-15 03:00:00	PENDENTE	\N	2025-08-15 03:55:01.461	2025-08-15 03:55:01.461	\N	\N
14	12	100	2025-08-04 03:00:00	CANCELADO	\N	2025-08-04 21:07:28.019	2025-08-04 21:09:09.811	\N	\N
15	11	100	2025-08-04 03:00:00	CANCELADO	\N	2025-08-04 21:08:50.036	2025-08-04 21:09:12.752	\N	\N
17	9	100	2025-08-04 03:00:00	CANCELADO	\N	2025-08-04 21:08:54.865	2025-08-04 21:09:14.21	\N	\N
76	24	100	2025-07-15 03:00:00	CANCELADO	\N	2025-08-15 00:54:31.891	2025-08-15 03:55:33.192	\N	\N
18	12	100	2025-08-04 03:00:00	CANCELADO	\N	2025-08-04 21:09:22.922	2025-08-04 21:11:05.487	\N	\N
19	12	100	2025-08-04 03:00:00	CANCELADO	\N	2025-08-04 21:11:10.958	2025-08-04 21:11:29.391	\N	\N
21	13	80	2025-08-04 03:00:00	CANCELADO	\N	2025-08-04 21:15:11.134	2025-08-04 21:15:36.382	\N	\N
20	12	100	2025-08-04 03:00:00	CANCELADO	\N	2025-08-04 21:11:43.259	2025-08-04 21:21:55.947	\N	\N
23	11	100	2025-08-04 03:00:00	CANCELADO	\N	2025-08-04 21:16:24.702	2025-08-04 21:21:57.605	\N	\N
22	13	80	2025-08-04 03:00:00	CANCELADO	\N	2025-08-04 21:15:48.667	2025-08-04 21:21:58.918	\N	\N
25	9	100	2025-08-04 03:00:00	CANCELADO	\N	2025-08-04 21:16:28.429	2025-08-04 21:22:01.781	\N	\N
26	13	80	2025-08-04 03:00:00	CANCELADO	\N	2025-08-04 21:22:09.508	2025-08-04 21:23:03.575	\N	\N
30	9	100	2025-08-04 03:00:00	CANCELADO	\N	2025-08-04 21:22:14.011	2025-08-04 21:23:43.129	\N	\N
57	21	80	2025-10-05 03:00:00	CANCELADO	\N	2025-08-05 16:26:49.359	2025-08-05 16:28:44.299	\N	\N
33	14	80	2025-08-04 03:00:00	CANCELADO	\N	2025-08-04 21:31:57.793	2025-08-04 21:32:19.365	\N	\N
54	19	100	2025-08-03 03:00:00	PAGO	DINHEIRO	2025-08-05 16:21:07.066	2025-08-05 16:29:12.507	\N	100
34	14	100	2025-08-04 03:00:00	CANCELADO	\N	2025-08-04 21:32:36.681	2025-08-04 21:33:09.602	\N	\N
27	12	100	2025-08-04 03:00:00	PAGO	DINHEIRO	2025-08-04 21:22:12.166	2025-08-05 15:04:10.91	\N	\N
28	11	100	2025-08-04 03:00:00	PAGO	PIX	2025-08-04 21:22:12.777	2025-08-05 15:08:57.977	\N	100
38	15	100	2025-08-05 03:00:00	PAGO	PIX	2025-08-05 15:28:49.875	2025-08-05 15:29:11.184	\N	100
39	15	100	2025-09-05 03:00:00	CANCELADO	\N	2025-08-05 15:29:11.192	2025-08-05 15:29:30.195	\N	\N
79	24	100	2025-08-15 03:00:00	CANCELADO	\N	2025-08-15 03:59:38.887	2025-08-15 04:01:23.155	\N	\N
32	9	80	2025-08-04 03:00:00	PAGO	GRATIS	2025-08-04 21:24:01.468	2025-08-05 15:30:29.317	\N	\N
43	17	80	2025-08-03 03:00:00	PAGO	GRATIS	2025-08-05 15:56:22.662	2025-08-05 15:56:45.005	\N	\N
45	18	100	2025-08-03 03:00:00	PAGO	CARTAO	2025-08-05 16:05:08.097	2025-08-05 16:05:40.436	\N	100
46	18	100	2025-09-03 03:00:00	CANCELADO	\N	2025-08-05 16:05:40.443	2025-08-05 16:06:13.039	\N	\N
47	18	100	2025-08-03 03:00:00	CANCELADO	\N	2025-08-05 16:06:22.193	2025-08-05 16:10:24.682	\N	\N
48	19	100	2025-08-03 03:00:00	PAGO	PIX	2025-08-05 16:15:15.164	2025-08-05 16:15:39.586	\N	100
49	19	100	2025-09-03 03:00:00	CANCELADO	\N	2025-08-05 16:15:39.593	2025-08-05 16:15:59.59	\N	\N
50	20	100	2025-08-04 03:00:00	PAGO	DINHEIRO	2025-08-05 16:18:29.974	2025-08-05 16:18:59.784	\N	100
51	20	100	2025-09-04 03:00:00	CANCELADO	\N	2025-08-05 16:18:59.79	2025-08-05 16:19:18.359	\N	\N
52	20	100	2025-08-04 03:00:00	CANCELADO	\N	2025-08-05 16:19:33.479	2025-08-05 16:20:09.659	\N	\N
55	21	80	2025-08-05 03:00:00	PAGO	DINHEIRO	2025-08-05 16:21:40.611	2025-08-05 16:22:13.2	\N	80
56	21	80	2025-09-05 03:00:00	PAGO	DINHEIRO	2025-08-05 16:22:13.207	2025-08-05 16:26:49.352	\N	80
58	19	100	2025-09-10 06:00:00	PAGO	DINHEIRO	2025-08-05 16:29:12.514	2025-08-05 16:29:29.053	\N	100
44	17	80	2025-09-03 03:00:00	CANCELADO	\N	2025-08-05 15:56:45.01	2025-08-05 16:31:29.762	\N	\N
61	22	100	2025-08-03 03:00:00	PAGO	CARTAO	2025-08-05 16:33:26.012	2025-08-05 16:33:56.483	\N	100
62	22	100	2025-09-03 06:00:00	PAGO	DINHEIRO	2025-08-05 16:33:56.507	2025-08-05 16:34:38.713	\N	100
63	22	100	2025-10-10 06:00:00	CANCELADO	\N	2025-08-05 16:34:38.719	2025-08-05 16:34:48.43	\N	\N
68	21	70	2025-08-10 03:00:00	PAGO	DINHEIRO	2025-08-09 03:24:03.861	2025-08-09 03:24:24.347	\N	70
80	24	100	2025-08-15 03:00:00	CANCELADO	\N	2025-08-15 04:01:28.186	2025-08-15 04:01:48.29	\N	\N
69	21	80	2025-09-10 06:00:00	PAGO	PIX	2025-08-09 03:24:24.356	2025-08-09 03:26:34.79	\N	80
70	21	100	2025-10-10 06:00:00	PENDENTE	\N	2025-08-09 03:26:34.795	2025-08-09 03:27:05.618	\N	\N
60	17	100	2025-08-05 03:00:00	PENDENTE	\N	2025-08-05 16:32:23.167	2025-08-09 03:27:05.618	\N	\N
53	20	100	2025-08-04 03:00:00	PENDENTE	\N	2025-08-05 16:20:32.55	2025-08-06 21:07:51.245	\N	\N
66	18	100	2025-08-03 03:00:00	PENDENTE	\N	2025-08-06 16:16:36.264	2025-08-06 21:07:51.245	\N	\N
42	16	100	2025-08-05 03:00:00	PENDENTE	\N	2025-08-05 15:53:03.253	2025-08-06 21:07:51.245	\N	\N
35	14	100	2025-08-04 03:00:00	PENDENTE	\N	2025-08-04 21:33:28.328	2025-08-06 21:07:51.245	\N	\N
36	12	100	2025-09-04 03:00:00	PENDENTE	\N	2025-08-05 15:04:10.969	2025-08-06 21:07:51.245	\N	\N
81	24	100	2025-08-15 03:00:00	CANCELADO	\N	2025-08-15 04:01:54.971	2025-08-15 04:02:14.391	\N	\N
64	22	100	2025-08-10 03:00:00	CANCELADO	\N	2025-08-05 16:35:10.84	2025-08-09 03:20:56.327	\N	\N
65	21	70	2025-08-10 03:00:00	CANCELADO	\N	2025-08-06 16:15:50.214	2025-08-09 03:21:13.641	\N	\N
67	21	70	2025-08-10 03:00:00	CANCELADO	\N	2025-08-09 03:22:55.423	2025-08-09 03:23:44.015	\N	\N
40	15	100	2025-08-05 03:00:00	PENDENTE	\N	2025-08-05 15:29:46.445	2025-08-09 03:27:05.618	\N	\N
31	13	100	2025-08-04 03:00:00	PENDENTE	\N	2025-08-04 21:23:19.835	2025-08-09 03:27:05.618	\N	\N
41	9	100	2025-09-04 03:00:00	PENDENTE	\N	2025-08-05 15:30:29.324	2025-08-09 03:27:05.618	\N	\N
71	10	100	2025-08-04 03:00:00	CANCELADO	\N	2025-08-10 21:56:37.092	2025-08-10 21:57:01.674	\N	\N
72	10	100	2025-08-15 03:00:00	PENDENTE	\N	2025-08-10 21:57:07.032	2025-08-10 21:57:07.032	\N	\N
37	11	100	2025-09-04 03:00:00	PENDENTE	\N	2025-08-05 15:08:58.031	2025-08-11 00:25:46.04	\N	\N
59	19	100	2025-10-10 06:00:00	CANCELADO	\N	2025-08-05 16:29:29.059	2025-08-11 00:39:43.409	\N	\N
73	19	100	2025-08-10 03:00:00	PENDENTE	\N	2025-08-11 02:01:18.039	2025-08-11 02:01:18.039	\N	\N
74	22	100	2025-08-10 03:00:00	PENDENTE	\N	2025-08-11 18:00:30.537	2025-08-11 18:00:30.537	\N	\N
75	23	70	2025-08-15 03:00:00	PENDENTE	\N	2025-08-15 00:35:56.611	2025-08-15 00:35:56.611	\N	\N
77	25	100	2025-08-15 03:00:00	PENDENTE	\N	2025-08-15 03:37:50.552	2025-08-15 03:37:50.552	\N	\N
\.


--
-- Data for Name: pagamentos_avulsos; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pagamentos_avulsos (id, nome_cliente, valor, forma_pagamento, data_hora, observacao, created_at, updated_at) FROM stdin;
9	yarles	10	CARTAO	2025-08-05 16:14:07.136	diaria	2025-08-05 16:14:07.136	2025-08-05 16:14:07.136
10		10	PIX	2025-08-05 16:17:28.386		2025-08-05 16:17:28.386	2025-08-05 16:17:28.386
11	yarles	10	DINHEIRO	2025-08-09 03:19:33.958		2025-08-09 03:19:33.958	2025-08-09 03:19:33.958
12	testando	10	DINHEIRO	2025-08-15 17:19:57.378	teste de cadastro de diaria	2025-08-15 17:19:57.378	2025-08-15 17:19:57.378
\.


--
-- Data for Name: planos; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.planos (id, nome, descricao, valor, ativo, created_at, updated_at) FROM stdin;
1	PLANO COMUM	plano com valor normal	100	t	2025-07-24 21:10:48.347	2025-08-06 21:07:51.234
2	PLANO FAMILIA	plano para clientes da mesma familia	100	t	2025-07-24 21:11:28.997	2025-08-09 03:27:05.607
3	PLANO PROMOCIONAL	plano promocional para clientes novos	70	t	2025-08-06 03:10:19.801	2025-08-16 14:46:15.355
\.


--
-- Data for Name: registros_acesso; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.registros_acesso (id, cliente_id, tipo_catraca, data_hora, created_at, updated_at) FROM stdin;
1	9	ENTRADA	2025-08-09 00:39:41.151	2025-08-09 00:39:41.152	2025-08-09 00:39:41.152
2	9	SAIDA	2025-08-09 02:03:48.516	2025-08-09 02:03:48.517	2025-08-09 02:03:48.517
3	9	ENTRADA	2025-08-09 02:54:23.194	2025-08-09 02:54:23.195	2025-08-09 02:54:23.195
4	9	ENTRADA	2025-08-10 19:32:53.792	2025-08-10 19:32:53.793	2025-08-10 19:32:53.793
5	9	SAIDA	2025-08-10 19:33:47.76	2025-08-10 19:33:47.761	2025-08-10 19:33:47.761
6	9	ENTRADA	2025-08-10 19:34:44.048	2025-08-10 19:34:44.049	2025-08-10 19:34:44.049
7	9	SAIDA	2025-08-10 21:17:50.19	2025-08-10 21:17:50.191	2025-08-10 21:17:50.191
8	9	ENTRADA	2025-08-10 21:48:11.468	2025-08-10 21:48:11.469	2025-08-10 21:48:11.469
9	9	SAIDA	2025-08-10 21:49:32.613	2025-08-10 21:49:32.614	2025-08-10 21:49:32.614
10	9	ENTRADA	2025-08-10 21:53:00.819	2025-08-10 21:53:00.82	2025-08-10 21:53:00.82
11	9	SAIDA	2025-08-10 21:57:27.988	2025-08-10 21:57:27.989	2025-08-10 21:57:27.989
12	10	ENTRADA	2025-08-10 22:07:27.831	2025-08-10 22:07:27.832	2025-08-10 22:07:27.832
13	22	BLOQUEIO	2025-08-10 22:38:52.693	2025-08-10 22:38:52.719	2025-08-10 22:38:52.719
14	22	BLOQUEIO	2025-08-10 22:42:02.203	2025-08-10 22:42:02.229	2025-08-10 22:42:02.229
15	9	ENTRADA	2025-08-10 22:43:44.728	2025-08-10 22:43:44.729	2025-08-10 22:43:44.729
16	10	SAIDA	2025-08-10 22:57:50.799	2025-08-10 22:57:50.8	2025-08-10 22:57:50.8
17	10	ENTRADA	2025-08-10 22:58:23.375	2025-08-10 22:58:23.376	2025-08-10 22:58:23.376
18	11	ENTRADA	2025-08-11 00:22:57.793	2025-08-11 00:22:57.794	2025-08-11 00:22:57.794
19	11	BLOQUEIO	2025-08-11 00:24:40.269	2025-08-11 00:24:40.27	2025-08-11 00:24:40.27
20	9	SAIDA	2025-08-11 00:24:58.893	2025-08-11 00:24:58.893	2025-08-11 00:24:58.893
21	9	ENTRADA	2025-08-11 00:25:09.471	2025-08-11 00:25:09.472	2025-08-11 00:25:09.472
22	9	SAIDA	2025-08-11 00:25:18.576	2025-08-11 00:25:18.576	2025-08-11 00:25:18.576
23	10	SAIDA	2025-08-11 00:29:30.694	2025-08-11 00:29:30.695	2025-08-11 00:29:30.695
24	9	ENTRADA	2025-08-11 00:44:22.923	2025-08-11 00:44:22.923	2025-08-11 00:44:22.923
25	9	SAIDA	2025-08-11 00:44:38.901	2025-08-11 00:44:38.902	2025-08-11 00:44:38.902
26	10	ENTRADA	2025-08-11 00:45:24.192	2025-08-11 00:45:24.193	2025-08-11 00:45:24.193
27	17	BLOQUEIO	2025-08-11 02:07:44.753	2025-08-11 02:07:44.78	2025-08-11 02:07:44.78
28	9	ENTRADA	2025-08-11 02:07:55.941	2025-08-11 02:07:55.941	2025-08-11 02:07:55.941
29	9	SAIDA	2025-08-11 02:08:05.459	2025-08-11 02:08:05.459	2025-08-11 02:08:05.459
30	9	ENTRADA	2025-08-11 18:46:20.187	2025-08-11 18:46:20.187	2025-08-11 18:46:20.187
31	9	SAIDA	2025-08-11 18:56:08.378	2025-08-11 18:56:08.379	2025-08-11 18:56:08.379
32	9	ENTRADA	2025-08-13 17:06:46.513	2025-08-13 17:06:46.514	2025-08-13 17:06:46.514
33	9	SAIDA	2025-08-13 17:06:58.785	2025-08-13 17:06:58.786	2025-08-13 17:06:58.786
34	9	ENTRADA	2025-08-13 17:21:15.822	2025-08-13 17:21:15.823	2025-08-13 17:21:15.823
35	9	SAIDA	2025-08-13 17:24:29.459	2025-08-13 17:24:29.46	2025-08-13 17:24:29.46
36	9	ENTRADA	2025-08-14 20:02:17.913	2025-08-14 20:02:17.914	2025-08-14 20:02:17.914
37	9	SAIDA	2025-08-14 20:02:25.552	2025-08-14 20:02:25.553	2025-08-14 20:02:25.553
38	9	ENTRADA	2025-08-14 20:15:50.791	2025-08-14 20:15:50.792	2025-08-14 20:15:50.792
39	9	SAIDA	2025-08-14 20:15:54.569	2025-08-14 20:15:54.57	2025-08-14 20:15:54.57
40	9	ENTRADA	2025-08-14 20:16:13.336	2025-08-14 20:16:13.337	2025-08-14 20:16:13.337
41	9	SAIDA	2025-08-14 20:16:14.893	2025-08-14 20:16:14.893	2025-08-14 20:16:14.893
42	9	ENTRADA	2025-08-14 20:16:17.073	2025-08-14 20:16:17.073	2025-08-14 20:16:17.073
43	9	SAIDA	2025-08-14 20:16:18.626	2025-08-14 20:16:18.626	2025-08-14 20:16:18.626
44	9	ENTRADA	2025-08-14 20:16:20.016	2025-08-14 20:16:20.017	2025-08-14 20:16:20.017
45	9	SAIDA	2025-08-14 20:16:21.562	2025-08-14 20:16:21.562	2025-08-14 20:16:21.562
46	9	ENTRADA	2025-08-14 20:16:23.105	2025-08-14 20:16:23.106	2025-08-14 20:16:23.106
47	9	SAIDA	2025-08-14 20:16:24.787	2025-08-14 20:16:24.788	2025-08-14 20:16:24.788
48	9	ENTRADA	2025-08-14 20:16:26.638	2025-08-14 20:16:26.638	2025-08-14 20:16:26.638
49	9	SAIDA	2025-08-14 20:16:28.33	2025-08-14 20:16:28.331	2025-08-14 20:16:28.331
50	9	ENTRADA	2025-08-14 20:16:29.688	2025-08-14 20:16:29.689	2025-08-14 20:16:29.689
51	9	SAIDA	2025-08-14 20:16:31.237	2025-08-14 20:16:31.238	2025-08-14 20:16:31.238
52	9	ENTRADA	2025-08-14 20:29:18.778	2025-08-14 20:29:18.779	2025-08-14 20:29:18.779
53	13	BLOQUEIO	2025-08-14 20:31:40.989	2025-08-14 20:31:40.99	2025-08-14 20:31:40.99
54	13	BLOQUEIO	2025-08-14 20:31:51.647	2025-08-14 20:31:51.648	2025-08-14 20:31:51.648
55	9	SAIDA	2025-08-14 20:39:28.299	2025-08-14 20:39:28.3	2025-08-14 20:39:28.3
56	9	ENTRADA	2025-08-14 20:39:30.871	2025-08-14 20:39:30.872	2025-08-14 20:39:30.872
57	13	BLOQUEIO	2025-08-14 20:39:37.081	2025-08-14 20:39:37.081	2025-08-14 20:39:37.081
58	13	BLOQUEIO	2025-08-14 20:39:39.983	2025-08-14 20:39:39.984	2025-08-14 20:39:39.984
59	9	SAIDA	2025-08-14 20:48:54.76	2025-08-14 20:48:54.761	2025-08-14 20:48:54.761
60	9	ENTRADA	2025-08-14 20:48:59.043	2025-08-14 20:48:59.043	2025-08-14 20:48:59.043
61	9	SAIDA	2025-08-14 20:49:00.877	2025-08-14 20:49:00.877	2025-08-14 20:49:00.877
62	9	ENTRADA	2025-08-14 20:51:20.766	2025-08-14 20:51:20.767	2025-08-14 20:51:20.767
63	9	SAIDA	2025-08-14 20:51:26.761	2025-08-14 20:51:26.762	2025-08-14 20:51:26.762
64	13	BLOQUEIO	2025-08-14 20:51:37.24	2025-08-14 20:51:37.241	2025-08-14 20:51:37.241
65	13	BLOQUEIO	2025-08-14 20:51:45.665	2025-08-14 20:51:45.665	2025-08-14 20:51:45.665
66	9	ENTRADA	2025-08-14 20:53:50.609	2025-08-14 20:53:50.61	2025-08-14 20:53:50.61
67	9	SAIDA	2025-08-14 20:53:54.77	2025-08-14 20:53:54.771	2025-08-14 20:53:54.771
68	9	ENTRADA	2025-08-14 21:02:55.538	2025-08-14 21:02:55.539	2025-08-14 21:02:55.539
69	9	SAIDA	2025-08-14 21:02:59.319	2025-08-14 21:02:59.32	2025-08-14 21:02:59.32
70	13	BLOQUEIO	2025-08-14 21:03:57.79	2025-08-14 21:03:57.816	2025-08-14 21:03:57.816
71	\N	BLOQUEIO	2025-08-14 21:04:07.923	2025-08-14 21:04:07.924	2025-08-14 21:04:07.924
72	\N	BLOQUEIO	2025-08-14 21:06:14.305	2025-08-14 21:06:14.306	2025-08-14 21:06:14.306
73	9	ENTRADA	2025-08-14 21:10:15.359	2025-08-14 21:10:15.359	2025-08-14 21:10:15.359
74	9	SAIDA	2025-08-14 21:10:18.347	2025-08-14 21:10:18.348	2025-08-14 21:10:18.348
75	13	BLOQUEIO	2025-08-14 21:10:23.731	2025-08-14 21:10:23.731	2025-08-14 21:10:23.731
76	13	BLOQUEIO	2025-08-14 21:10:28.717	2025-08-14 21:10:28.718	2025-08-14 21:10:28.718
77	\N	BLOQUEIO	2025-08-14 21:10:34.22	2025-08-14 21:10:34.221	2025-08-14 21:10:34.221
78	\N	BLOQUEIO	2025-08-14 21:10:41.031	2025-08-14 21:10:41.032	2025-08-14 21:10:41.032
79	9	ENTRADA	2025-08-14 21:10:47.175	2025-08-14 21:10:47.176	2025-08-14 21:10:47.176
80	13	BLOQUEIO	2025-08-14 21:10:50.37	2025-08-14 21:10:50.371	2025-08-14 21:10:50.371
81	9	SAIDA	2025-08-14 21:10:54.269	2025-08-14 21:10:54.27	2025-08-14 21:10:54.27
82	9	ENTRADA	2025-08-15 00:09:47.688	2025-08-15 00:09:47.689	2025-08-15 00:09:47.689
83	9	SAIDA	2025-08-15 00:09:51.515	2025-08-15 00:09:51.516	2025-08-15 00:09:51.516
84	9	ENTRADA	2025-08-15 00:48:28.244	2025-08-15 00:48:28.245	2025-08-15 00:48:28.245
85	24	ENTRADA	2025-08-15 00:55:48.95	2025-08-15 00:55:48.95	2025-08-15 00:55:48.95
86	24	SAIDA	2025-08-15 00:55:56.092	2025-08-15 00:55:56.093	2025-08-15 00:55:56.093
87	24	BLOQUEIO	2025-08-15 00:56:33.553	2025-08-15 00:56:33.554	2025-08-15 00:56:33.554
88	9	ENTRADA	2025-08-15 03:14:35.33	2025-08-15 03:14:35.331	2025-08-15 03:14:35.331
89	9	SAIDA	2025-08-15 03:14:39.871	2025-08-15 03:14:39.871	2025-08-15 03:14:39.871
90	26	ENTRADA	2025-08-15 03:40:16.976	2025-08-15 03:40:16.977	2025-08-15 03:40:16.977
91	24	ENTRADA	2025-08-15 04:03:37.704	2025-08-15 04:03:37.705	2025-08-15 04:03:37.705
92	24	SAIDA	2025-08-15 04:03:44.059	2025-08-15 04:03:44.06	2025-08-15 04:03:44.06
93	\N	BLOQUEIO	2025-08-15 04:03:53.974	2025-08-15 04:03:53.975	2025-08-15 04:03:53.975
94	9	ENTRADA	2025-08-15 04:03:58.64	2025-08-15 04:03:58.641	2025-08-15 04:03:58.641
95	13	BLOQUEIO	2025-08-15 04:04:01.559	2025-08-15 04:04:01.56	2025-08-15 04:04:01.56
96	9	SAIDA	2025-08-15 04:04:04.773	2025-08-15 04:04:04.773	2025-08-15 04:04:04.773
97	9	ENTRADA	2025-08-16 16:39:57.792	2025-08-16 16:39:57.793	2025-08-16 16:39:57.793
98	9	SAIDA	2025-08-16 16:40:40.047	2025-08-16 16:40:40.048	2025-08-16 16:40:40.048
99	9	ENTRADA	2025-08-16 17:41:59.426	2025-08-16 17:41:59.427	2025-08-16 17:41:59.427
100	13	BLOQUEIO	2025-08-16 17:42:04.924	2025-08-16 17:42:04.925	2025-08-16 17:42:04.925
101	9	SAIDA	2025-08-16 17:42:08.976	2025-08-16 17:42:08.977	2025-08-16 17:42:08.977
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.usuarios (id, nome, email, senha, created_at, updated_at, ativo, administrador) FROM stdin;
1	Administrador	admin@example.com	$2b$10$dICwUFEKibyS1ue8NptmY.KbxlM2Y7Tos8f5shHtWGuCYTwa/pp5y	2025-07-24 18:20:11.257	2025-07-25 02:52:53.947	t	t
2	Yarles de Andrade Espirito Santo	yarles100@gmail.com	$2b$10$fTJ2B.dlooqz25Tr8QgJueNB6RVFIa/vLt3Mfp5vmP/RHb2Cvp05.	2025-07-25 01:22:07.622	2025-07-25 03:00:06.509	t	t
3	teste de acesso	teste100@gmail.com		2025-08-16 19:00:51.326	2025-08-16 19:36:56.786	t	t
\.


--
-- Name: CadastroBiometria_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."CadastroBiometria_id_seq"', 93, true);


--
-- Name: clientes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.clientes_id_seq', 26, true);


--
-- Name: logs_sistema_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.logs_sistema_id_seq', 93, true);


--
-- Name: mensalidades_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.mensalidades_id_seq', 81, true);


--
-- Name: pagamentos_avulsos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.pagamentos_avulsos_id_seq', 12, true);


--
-- Name: planos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.planos_id_seq', 3, true);


--
-- Name: registros_acesso_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.registros_acesso_id_seq', 101, true);


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 3, true);


--
-- Name: CadastroBiometria CadastroBiometria_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CadastroBiometria"
    ADD CONSTRAINT "CadastroBiometria_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: catracas_info catracas_info_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.catracas_info
    ADD CONSTRAINT catracas_info_pkey PRIMARY KEY (id);


--
-- Name: clientes clientes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT clientes_pkey PRIMARY KEY (id);


--
-- Name: logs_sistema logs_sistema_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.logs_sistema
    ADD CONSTRAINT logs_sistema_pkey PRIMARY KEY (id);


--
-- Name: mensalidades mensalidades_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mensalidades
    ADD CONSTRAINT mensalidades_pkey PRIMARY KEY (id);


--
-- Name: pagamentos_avulsos pagamentos_avulsos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pagamentos_avulsos
    ADD CONSTRAINT pagamentos_avulsos_pkey PRIMARY KEY (id);


--
-- Name: planos planos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.planos
    ADD CONSTRAINT planos_pkey PRIMARY KEY (id);


--
-- Name: registros_acesso registros_acesso_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.registros_acesso
    ADD CONSTRAINT registros_acesso_pkey PRIMARY KEY (id);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- Name: CadastroBiometria_cliente_id_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "CadastroBiometria_cliente_id_key" ON public."CadastroBiometria" USING btree (cliente_id);


--
-- Name: catracas_info_ip_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX catracas_info_ip_key ON public.catracas_info USING btree (ip);


--
-- Name: catracas_info_porta_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX catracas_info_porta_key ON public.catracas_info USING btree (porta);


--
-- Name: clientes_catraca_id_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX clientes_catraca_id_key ON public.clientes USING btree (catraca_id);


--
-- Name: clientes_email_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX clientes_email_key ON public.clientes USING btree (email);


--
-- Name: usuarios_email_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX usuarios_email_key ON public.usuarios USING btree (email);


--
-- Name: CadastroBiometria CadastroBiometria_cliente_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CadastroBiometria"
    ADD CONSTRAINT "CadastroBiometria_cliente_id_fkey" FOREIGN KEY (cliente_id) REFERENCES public.clientes(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: clientes clientes_plano_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT clientes_plano_id_fkey FOREIGN KEY (plano_id) REFERENCES public.planos(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: logs_sistema logs_sistema_cliente_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.logs_sistema
    ADD CONSTRAINT logs_sistema_cliente_id_fkey FOREIGN KEY (cliente_id) REFERENCES public.clientes(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: logs_sistema logs_sistema_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.logs_sistema
    ADD CONSTRAINT logs_sistema_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: mensalidades mensalidades_cliente_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mensalidades
    ADD CONSTRAINT mensalidades_cliente_id_fkey FOREIGN KEY (cliente_id) REFERENCES public.clientes(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: registros_acesso registros_acesso_cliente_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.registros_acesso
    ADD CONSTRAINT registros_acesso_cliente_id_fkey FOREIGN KEY (cliente_id) REFERENCES public.clientes(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

\unrestrict PJBpyMge3J60ucaEJOQNgMzenbNR9KD11zzK6qcmdppupgrIFCneoYrzASAzCDa


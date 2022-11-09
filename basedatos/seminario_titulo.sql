--
-- PostgreSQL database dump
--

-- Dumped from database version 9.3.25
-- Dumped by pg_dump version 9.3.25
-- Started on 2022-11-09 02:30:26

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- TOC entry 1 (class 3079 OID 11750)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2118 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- TOC entry 207 (class 1255 OID 46113)
-- Name: login(character varying, character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.login(usuario character varying, pass character varying) RETURNS integer
    LANGUAGE plpgsql
    AS $_$

DECLARE

	count_nombre int;

	count_pass int;

BEGIN

	select count(id_usuario) from usuario where correo_electronico = $1	into count_nombre;

	if count_nombre = 1 then

		select count(id_usuario) from usuario where clave = $2  and correo_electronico = $1 into count_pass;

		if count_pass = 1 then

			return 1; -- INGRESO DEL USUARIO

		else

			return 2; -- CLAVE INCORRECTA

		end if;

	else

		return 3; -- NOMBRE DE USUARIO INCORRECTO

	end if;

END;

$_$;


ALTER FUNCTION public.login(usuario character varying, pass character varying) OWNER TO postgres;

--
-- TOC entry 208 (class 1255 OID 46123)
-- Name: registro(character varying, character varying, character varying, character varying, character varying, character varying, character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.registro(usuario character varying, pass character varying, correo character varying, numero character varying, facebook character varying, instagram character varying, whatsapp character varying) RETURNS integer
    LANGUAGE plpgsql
    AS $_$

DECLARE

	count_nombre int;

BEGIN

	select count(id_usuario) from usuario where correo_electronico = $3	into count_nombre;

	if count_nombre <= 0 then

		insert into usuario (nombre_usuario,clave,correo_electronico,numero_telefono,facebook,instagram,whatsapp) values ($1,$2,$3,$4,$5,$6,$7);

		return 1;

	else

		return 0; -- NOMBRE DE USUARIO INCORRECTO

	end if;

END;

$_$;


ALTER FUNCTION public.registro(usuario character varying, pass character varying, correo character varying, numero character varying, facebook character varying, instagram character varying, whatsapp character varying) OWNER TO postgres;

--
-- TOC entry 209 (class 1255 OID 54315)
-- Name: verificar_likes(integer, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.verificar_likes(id_usuario integer, id_producto integer) RETURNS integer
    LANGUAGE plpgsql
    AS $_$

DECLARE

	count_likes int;

	esta_vigente boolean;

	cant_likes int;

BEGIN

	select count(dl.id_detalle_likes) from detalle_likes  dl where dl.id_usuario = $1 and dl.id_producto= $2 into count_likes;

	if count_likes > 0 then

		select dl2.vigente from detalle_likes dl2 where dl2.id_usuario = $1	and dl2.id_producto= $2 into esta_vigente;

		if esta_vigente = true then
			update detalle_likes dl6 set vigente=false where  dl6.id_usuario = $1	and dl6.id_producto= $2;
			select count(dl3.id_detalle_likes)  from detalle_likes dl3 where dl3.id_producto=$2 and dl3.vigente=true into cant_likes;
			update producto p set likes=cant_likes where p.id_producto=$2;
			return 2; -- se vuelve false

		else
			update detalle_likes  dl7 set vigente=true where  dl7.id_usuario = $1	and dl7.id_producto= $2;
			select count(dl4.id_detalle_likes)  from detalle_likes dl4 where dl4.id_producto=$2 and dl4.vigente=true into cant_likes;
			update producto p2 set likes=cant_likes where p2.id_producto=$2;
			return 3; -- se vuelve true

		end if;

	else

		insert into detalle_likes (id_producto,id_usuario)values($2,$1);
		select count(dl5.id_detalle_likes)  from detalle_likes dl5 where dl5.id_producto=$2 and dl5.vigente=true into cant_likes;
		update producto p3 set likes=cant_likes where p3.id_producto=$2;
		return 1; 
	end if;

END;

$_$;


ALTER FUNCTION public.verificar_likes(id_usuario integer, id_producto integer) OWNER TO postgres;

--
-- TOC entry 210 (class 1255 OID 54349)
-- Name: verificar_likes_comentarios(integer, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.verificar_likes_comentarios(id_usuario integer, id_comentario_producto integer) RETURNS integer
    LANGUAGE plpgsql
    AS $_$

DECLARE

	count_likes int;

	esta_vigente boolean;

	cant_likes int;

BEGIN

	select count(dl.id_detalle_likes_comentario) from detalle_likes_comentario  dl where dl.id_usuario = $1 and dl.id_comentario= $2 into count_likes;

	if count_likes > 0 then

		select dl2.vigente from detalle_likes_comentario dl2 where dl2.id_usuario = $1	and dl2.id_comentario= $2 into esta_vigente;

		if esta_vigente = true then
			update detalle_likes_comentario dl6 set vigente=false where  dl6.id_usuario = $1	and dl6.id_comentario= $2;
			select count(dl3.id_detalle_likes_comentario)  from detalle_likes_comentario dl3 where dl3.id_comentario=$2 and dl3.vigente=true into cant_likes;
			update comentarios_producto p set likes=cant_likes where p.id_comentarios_producto=$2;
			return 2; -- se vuelve false

		else
			update detalle_likes_comentario  dl7 set vigente=true where  dl7.id_usuario = $1	and dl7.id_comentario= $2;
			select count(dl4.id_detalle_likes_comentario)  from detalle_likes_comentario dl4 where dl4.id_comentario=$2 and dl4.vigente=true into cant_likes;
			update comentarios_producto p2 set likes=cant_likes where p2.id_comentarios_producto=$2;
			return 3; -- se vuelve true

		end if;

	else

		insert into detalle_likes_comentario (id_comentario,id_usuario)values($2,$1);
		select count(dl5.id_detalle_likes_comentario)  from detalle_likes_comentario dl5 where dl5.id_comentario=$2 and dl5.vigente=true into cant_likes;
		update comentarios_producto p3 set likes=cant_likes where p3.id_comentarios_producto=$2;
		return 1; 
	end if;

END;

$_$;


ALTER FUNCTION public.verificar_likes_comentarios(id_usuario integer, id_comentario_producto integer) OWNER TO postgres;

--
-- TOC entry 173 (class 1259 OID 21452)
-- Name: categoria_id_categoria_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categoria_id_categoria_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categoria_id_categoria_seq OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 178 (class 1259 OID 21477)
-- Name: categoria; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public.categoria (
    id_categoria integer DEFAULT nextval('public.categoria_id_categoria_seq'::regclass) NOT NULL,
    nombre_categoria character varying(100) NOT NULL,
    orden integer DEFAULT 0,
    vigente boolean DEFAULT true,
    url character varying(300)
);


ALTER TABLE public.categoria OWNER TO postgres;

--
-- TOC entry 176 (class 1259 OID 21458)
-- Name: comentarios_producto_id_comentarios_producto_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comentarios_producto_id_comentarios_producto_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comentarios_producto_id_comentarios_producto_seq OWNER TO postgres;

--
-- TOC entry 184 (class 1259 OID 54316)
-- Name: comentarios_producto; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public.comentarios_producto (
    id_comentarios_producto integer DEFAULT nextval('public.comentarios_producto_id_comentarios_producto_seq'::regclass) NOT NULL,
    comentario character varying(250) NOT NULL,
    likes integer DEFAULT 0,
    id_producto integer DEFAULT 0,
    id_usuario integer DEFAULT 0,
    bloqueado boolean DEFAULT false,
    vigente boolean DEFAULT true,
    cant_reportes integer DEFAULT 0
);


ALTER TABLE public.comentarios_producto OWNER TO postgres;

--
-- TOC entry 183 (class 1259 OID 54306)
-- Name: detalle_likes; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public.detalle_likes (
    id_detalle_likes integer NOT NULL,
    id_producto integer DEFAULT 0,
    id_usuario integer DEFAULT 0,
    vigente boolean DEFAULT true
);


ALTER TABLE public.detalle_likes OWNER TO postgres;

--
-- TOC entry 186 (class 1259 OID 54340)
-- Name: detalle_likes_comentario; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public.detalle_likes_comentario (
    id_detalle_likes_comentario integer NOT NULL,
    id_comentario integer DEFAULT 0,
    id_usuario integer DEFAULT 0,
    vigente boolean DEFAULT true
);


ALTER TABLE public.detalle_likes_comentario OWNER TO postgres;

--
-- TOC entry 185 (class 1259 OID 54338)
-- Name: detalle_likes_comentario_id_detalle_likes_comentario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.detalle_likes_comentario_id_detalle_likes_comentario_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.detalle_likes_comentario_id_detalle_likes_comentario_seq OWNER TO postgres;

--
-- TOC entry 2119 (class 0 OID 0)
-- Dependencies: 185
-- Name: detalle_likes_comentario_id_detalle_likes_comentario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detalle_likes_comentario_id_detalle_likes_comentario_seq OWNED BY public.detalle_likes_comentario.id_detalle_likes_comentario;


--
-- TOC entry 182 (class 1259 OID 54304)
-- Name: detalle_likes_id_detalle_likes_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.detalle_likes_id_detalle_likes_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.detalle_likes_id_detalle_likes_seq OWNER TO postgres;

--
-- TOC entry 2120 (class 0 OID 0)
-- Dependencies: 182
-- Name: detalle_likes_id_detalle_likes_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detalle_likes_id_detalle_likes_seq OWNED BY public.detalle_likes.id_detalle_likes;


--
-- TOC entry 194 (class 1259 OID 62533)
-- Name: notificaciones_comentario; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public.notificaciones_comentario (
    id_notificacion_comentario integer NOT NULL,
    notificacion character varying(250) NOT NULL,
    id_usuario integer DEFAULT 0,
    id_comentario integer DEFAULT 0,
    vista boolean DEFAULT false
);


ALTER TABLE public.notificaciones_comentario OWNER TO postgres;

--
-- TOC entry 193 (class 1259 OID 62531)
-- Name: notificaciones_comentario_id_notificacion_comentario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notificaciones_comentario_id_notificacion_comentario_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.notificaciones_comentario_id_notificacion_comentario_seq OWNER TO postgres;

--
-- TOC entry 2121 (class 0 OID 0)
-- Dependencies: 193
-- Name: notificaciones_comentario_id_notificacion_comentario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notificaciones_comentario_id_notificacion_comentario_seq OWNED BY public.notificaciones_comentario.id_notificacion_comentario;


--
-- TOC entry 192 (class 1259 OID 62522)
-- Name: notificaciones_producto; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public.notificaciones_producto (
    id_notificacion_producto integer NOT NULL,
    notificacion character varying(250) NOT NULL,
    id_usuario integer DEFAULT 0,
    id_producto integer DEFAULT 0,
    vista boolean DEFAULT false
);


ALTER TABLE public.notificaciones_producto OWNER TO postgres;

--
-- TOC entry 191 (class 1259 OID 62520)
-- Name: notificaciones_producto_id_notificacion_producto_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notificaciones_producto_id_notificacion_producto_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.notificaciones_producto_id_notificacion_producto_seq OWNER TO postgres;

--
-- TOC entry 2122 (class 0 OID 0)
-- Dependencies: 191
-- Name: notificaciones_producto_id_notificacion_producto_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notificaciones_producto_id_notificacion_producto_seq OWNED BY public.notificaciones_producto.id_notificacion_producto;


--
-- TOC entry 175 (class 1259 OID 21456)
-- Name: producto_id_producto_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.producto_id_producto_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.producto_id_producto_seq OWNER TO postgres;

--
-- TOC entry 180 (class 1259 OID 21494)
-- Name: producto; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public.producto (
    id_producto integer DEFAULT nextval('public.producto_id_producto_seq'::regclass) NOT NULL,
    nombre_producto character varying(100) NOT NULL,
    id_subcategoria integer DEFAULT 0,
    likes integer DEFAULT 0,
    id_usuario integer DEFAULT 0,
    vigente boolean DEFAULT true,
    bloqueado boolean DEFAULT false,
    descripcion character varying(250),
    url_1 character varying(300),
    url_2 character varying(300),
    url_3 character varying(300),
    url_4 character varying(300),
    bloqueo_cantidad boolean DEFAULT false,
    razon_bloqueo character varying(300),
    cant_reportes integer DEFAULT 0
);


ALTER TABLE public.producto OWNER TO postgres;

--
-- TOC entry 190 (class 1259 OID 54392)
-- Name: reportes_comentario; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public.reportes_comentario (
    id_reportes_comentario integer NOT NULL,
    justificacion character varying(250) NOT NULL,
    id_comentarios_producto integer DEFAULT 0,
    id_usuario integer DEFAULT 0,
    id_producto integer DEFAULT 0,
    vigente boolean DEFAULT true,
    aceptado boolean DEFAULT false,
    rechazado boolean DEFAULT false,
    fecha timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.reportes_comentario OWNER TO postgres;

--
-- TOC entry 189 (class 1259 OID 54390)
-- Name: reportes_comentario_id_reportes_comentario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reportes_comentario_id_reportes_comentario_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reportes_comentario_id_reportes_comentario_seq OWNER TO postgres;

--
-- TOC entry 2123 (class 0 OID 0)
-- Dependencies: 189
-- Name: reportes_comentario_id_reportes_comentario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reportes_comentario_id_reportes_comentario_seq OWNED BY public.reportes_comentario.id_reportes_comentario;


--
-- TOC entry 188 (class 1259 OID 54363)
-- Name: reportes_producto; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public.reportes_producto (
    id_reportes_producto integer NOT NULL,
    justificacion character varying(250) NOT NULL,
    id_producto integer DEFAULT 0,
    id_usuario integer DEFAULT 0,
    vigente boolean DEFAULT true,
    aceptado boolean DEFAULT false,
    rechazado boolean DEFAULT false,
    fecha timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.reportes_producto OWNER TO postgres;

--
-- TOC entry 187 (class 1259 OID 54361)
-- Name: reportes_producto_id_reportes_producto_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reportes_producto_id_reportes_producto_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reportes_producto_id_reportes_producto_seq OWNER TO postgres;

--
-- TOC entry 2124 (class 0 OID 0)
-- Dependencies: 187
-- Name: reportes_producto_id_reportes_producto_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reportes_producto_id_reportes_producto_seq OWNED BY public.reportes_producto.id_reportes_producto;


--
-- TOC entry 172 (class 1259 OID 21440)
-- Name: rol_id_rol_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rol_id_rol_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rol_id_rol_seq OWNER TO postgres;

--
-- TOC entry 177 (class 1259 OID 21460)
-- Name: rol; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public.rol (
    id_rol integer DEFAULT nextval('public.rol_id_rol_seq'::regclass) NOT NULL,
    nombre_rol character varying(50) NOT NULL,
    vigente boolean DEFAULT true
);


ALTER TABLE public.rol OWNER TO postgres;

--
-- TOC entry 174 (class 1259 OID 21454)
-- Name: subcategoria_id_subcategoria_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.subcategoria_id_subcategoria_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.subcategoria_id_subcategoria_seq OWNER TO postgres;

--
-- TOC entry 179 (class 1259 OID 21485)
-- Name: subcategoria; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public.subcategoria (
    id_subcategoria integer DEFAULT nextval('public.subcategoria_id_subcategoria_seq'::regclass) NOT NULL,
    nombre_subcategoria character varying(100) NOT NULL,
    id_categoria integer DEFAULT 0,
    orden integer DEFAULT 0,
    vigente boolean DEFAULT true
);


ALTER TABLE public.subcategoria OWNER TO postgres;

--
-- TOC entry 171 (class 1259 OID 21427)
-- Name: usuario_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuario_id_usuario_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuario_id_usuario_seq OWNER TO postgres;

--
-- TOC entry 181 (class 1259 OID 21515)
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public.usuario (
    id_usuario integer DEFAULT nextval('public.usuario_id_usuario_seq'::regclass) NOT NULL,
    nombre_usuario character varying(50) NOT NULL,
    correo_electronico character varying(50),
    numero_telefono character varying(50),
    facebook character varying(50),
    instagram character varying(50),
    whatsapp character varying(50),
    clave character varying(20),
    id_rol integer DEFAULT 0,
    vigente boolean DEFAULT true,
    es_admin boolean DEFAULT false NOT NULL
);


ALTER TABLE public.usuario OWNER TO postgres;

--
-- TOC entry 1915 (class 2604 OID 54309)
-- Name: id_detalle_likes; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_likes ALTER COLUMN id_detalle_likes SET DEFAULT nextval('public.detalle_likes_id_detalle_likes_seq'::regclass);


--
-- TOC entry 1926 (class 2604 OID 54343)
-- Name: id_detalle_likes_comentario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_likes_comentario ALTER COLUMN id_detalle_likes_comentario SET DEFAULT nextval('public.detalle_likes_comentario_id_detalle_likes_comentario_seq'::regclass);


--
-- TOC entry 1949 (class 2604 OID 62536)
-- Name: id_notificacion_comentario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notificaciones_comentario ALTER COLUMN id_notificacion_comentario SET DEFAULT nextval('public.notificaciones_comentario_id_notificacion_comentario_seq'::regclass);


--
-- TOC entry 1945 (class 2604 OID 62525)
-- Name: id_notificacion_producto; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notificaciones_producto ALTER COLUMN id_notificacion_producto SET DEFAULT nextval('public.notificaciones_producto_id_notificacion_producto_seq'::regclass);


--
-- TOC entry 1937 (class 2604 OID 54395)
-- Name: id_reportes_comentario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reportes_comentario ALTER COLUMN id_reportes_comentario SET DEFAULT nextval('public.reportes_comentario_id_reportes_comentario_seq'::regclass);


--
-- TOC entry 1930 (class 2604 OID 54366)
-- Name: id_reportes_producto; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reportes_producto ALTER COLUMN id_reportes_producto SET DEFAULT nextval('public.reportes_producto_id_reportes_producto_seq'::regclass);


--
-- TOC entry 2093 (class 0 OID 21477)
-- Dependencies: 178
-- Data for Name: categoria; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categoria (id_categoria, nombre_categoria, orden, vigente, url) FROM stdin;
1	VESTUARIO Y CALZADO	1	t	\N
3	ELECTRONICA, AUDIO Y VIDEO	3	t	\N
4	CONSOLAS Y VIDEOJUEGOS	4	t	\N
2	CELULARES Y TELEFONIA	2	t	\N
5	LIBROS, REVISTAS Y COMICS	5	t	\N
6	OTRAS CATEGORIAS	6	t	\N
7	Prueba	0	t	\N
8	Ca 2	0	t	\N
\.


--
-- TOC entry 2125 (class 0 OID 0)
-- Dependencies: 173
-- Name: categoria_id_categoria_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categoria_id_categoria_seq', 8, true);


--
-- TOC entry 2099 (class 0 OID 54316)
-- Dependencies: 184
-- Data for Name: comentarios_producto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comentarios_producto (id_comentarios_producto, comentario, likes, id_producto, id_usuario, bloqueado, vigente, cant_reportes) FROM stdin;
7	comentario de prueba	1	2	2	f	t	0
8	este es un comentario de verdad	0	1	2	f	t	0
5	dsaoudhsakjdbsajkbdjsabdlsahdklasjlkdasdsadasdsadsadiddsaasdsadsadsadasdasdasdasdsadasdsadasdasdasdasdsadasdasdasdsadasdasfdsfdsfdsfdsfsdfsdfdsfdsfdsfsdfdsfdsfsdfsdfdsfsdfsdfsdfsdfsdfsdfsdfsdfsdfdsfds	1	1	2	f	t	0
6	a	0	1	2	f	t	0
3	hola 3	0	1	1	f	f	0
2	hola 2	0	1	1	f	f	0
1	aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa	0	1	1	f	f	0
9	hola	1	4	1	f	t	0
10	este jeans salio muy malo 	1	7	6	f	t	0
4	dsaoudhsakjdbsajkbdjsabdlsahdklasjlkdasdsadasdsadsadiddsaasdsadsadsadasdasdasdasdsadasdsadasdasdasdasdsadasdasdasdsadasdasfdsfdsfdsfdsfsdfsdfdsfdsfdsfsdfdsfdsfsdfsdfdsfsdfsdfsdfsdfsdfsdfsdfsdfsdfdsfds	0	1	2	f	t	1
\.


--
-- TOC entry 2126 (class 0 OID 0)
-- Dependencies: 176
-- Name: comentarios_producto_id_comentarios_producto_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comentarios_producto_id_comentarios_producto_seq', 10, true);


--
-- TOC entry 2098 (class 0 OID 54306)
-- Dependencies: 183
-- Data for Name: detalle_likes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.detalle_likes (id_detalle_likes, id_producto, id_usuario, vigente) FROM stdin;
6	3	1	f
4	4	1	f
7	1	1	t
8	7	6	t
9	6	6	f
5	2	1	t
\.


--
-- TOC entry 2101 (class 0 OID 54340)
-- Dependencies: 186
-- Data for Name: detalle_likes_comentario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.detalle_likes_comentario (id_detalle_likes_comentario, id_comentario, id_usuario, vigente) FROM stdin;
3	1	2	f
6	4	1	f
5	3	1	f
8	7	1	t
9	5	1	t
7	6	1	f
4	2	1	f
10	9	1	t
11	10	6	t
\.


--
-- TOC entry 2127 (class 0 OID 0)
-- Dependencies: 185
-- Name: detalle_likes_comentario_id_detalle_likes_comentario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.detalle_likes_comentario_id_detalle_likes_comentario_seq', 11, true);


--
-- TOC entry 2128 (class 0 OID 0)
-- Dependencies: 182
-- Name: detalle_likes_id_detalle_likes_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.detalle_likes_id_detalle_likes_seq', 9, true);


--
-- TOC entry 2109 (class 0 OID 62533)
-- Dependencies: 194
-- Data for Name: notificaciones_comentario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notificaciones_comentario (id_notificacion_comentario, notificacion, id_usuario, id_comentario, vista) FROM stdin;
\.


--
-- TOC entry 2129 (class 0 OID 0)
-- Dependencies: 193
-- Name: notificaciones_comentario_id_notificacion_comentario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notificaciones_comentario_id_notificacion_comentario_seq', 1, false);


--
-- TOC entry 2107 (class 0 OID 62522)
-- Dependencies: 192
-- Data for Name: notificaciones_producto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notificaciones_producto (id_notificacion_producto, notificacion, id_usuario, id_producto, vista) FROM stdin;
\.


--
-- TOC entry 2130 (class 0 OID 0)
-- Dependencies: 191
-- Name: notificaciones_producto_id_notificacion_producto_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notificaciones_producto_id_notificacion_producto_seq', 1, false);


--
-- TOC entry 2095 (class 0 OID 21494)
-- Dependencies: 180
-- Data for Name: producto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.producto (id_producto, nombre_producto, id_subcategoria, likes, id_usuario, vigente, bloqueado, descripcion, url_1, url_2, url_3, url_4, bloqueo_cantidad, razon_bloqueo, cant_reportes) FROM stdin;
6	aaaaa	1	0	1	f	f	aaaaa	\N	\N	\N	\N	f	\N	0
9	e	1	0	1	t	f	eeeeeeeeeeee	\N	\N	\N	\N	f	\N	0
10	nintendo switch	1	0	1	t	f	aaaaae	\N	\N	\N	\N	f	\N	0
11	asdasdaeeeeeeeeeeeeeee	1	0	1	t	f	asdasdasdeeeeeeeeeeeeeeee	\N	\N	\N	\N	f	\N	0
3	P3	3	0	2	t	f	holaholaholaholaholaholaholaholahola	\N	\N	\N	\N	f	\N	0
4	P4	1	0	2	t	f	holaholaholaholaholaholaholaholahola	\N	\N	\N	\N	f	\N	0
2	P2	2	1	2	t	f	holaholaholaholaholaholaholaholahola	\N	\N	\N	\N	f	\N	0
7	jeans	1	1	6	t	f	Pantalones jeans vintage	\N	\N	\N	\N	f	sipoaaaaaaaa	0
8	a	11	0	1	t	f	aaaa	\N	\N	\N	\N	f	\N	0
1	P1	1	1	2	t	f	holaholahoholaholahoholaholahoholaholahoholaholahoholaholahoholaholahoholaholahoholaholahoholaholahoholaholahoholaholahoholaholahoholaholahoholaholahoholaholahoholaholahoholaholaho	\N	\N	\N	\N	f	\N	1
\.


--
-- TOC entry 2131 (class 0 OID 0)
-- Dependencies: 175
-- Name: producto_id_producto_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.producto_id_producto_seq', 11, true);


--
-- TOC entry 2105 (class 0 OID 54392)
-- Dependencies: 190
-- Data for Name: reportes_comentario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reportes_comentario (id_reportes_comentario, justificacion, id_comentarios_producto, id_usuario, id_producto, vigente, aceptado, rechazado, fecha) FROM stdin;
3	malito	4	1	1	t	f	f	2022-11-09 00:40:31.781
\.


--
-- TOC entry 2132 (class 0 OID 0)
-- Dependencies: 189
-- Name: reportes_comentario_id_reportes_comentario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reportes_comentario_id_reportes_comentario_seq', 3, true);


--
-- TOC entry 2103 (class 0 OID 54363)
-- Dependencies: 188
-- Data for Name: reportes_producto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reportes_producto (id_reportes_producto, justificacion, id_producto, id_usuario, vigente, aceptado, rechazado, fecha) FROM stdin;
4	aaaaaaa	1	1	t	f	f	2022-11-02 21:44:01.691
\.


--
-- TOC entry 2133 (class 0 OID 0)
-- Dependencies: 187
-- Name: reportes_producto_id_reportes_producto_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reportes_producto_id_reportes_producto_seq', 4, true);


--
-- TOC entry 2092 (class 0 OID 21460)
-- Dependencies: 177
-- Data for Name: rol; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rol (id_rol, nombre_rol, vigente) FROM stdin;
1	ADMIN	t
2	USER	t
3	LOGOUT	t
\.


--
-- TOC entry 2134 (class 0 OID 0)
-- Dependencies: 172
-- Name: rol_id_rol_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rol_id_rol_seq', 3, true);


--
-- TOC entry 2094 (class 0 OID 21485)
-- Dependencies: 179
-- Data for Name: subcategoria; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subcategoria (id_subcategoria, nombre_subcategoria, id_categoria, orden, vigente) FROM stdin;
1	PANTALONES	1	1	t
2	POLERAS	1	2	t
3	ZAPATILLAS	1	3	t
4	SAMSUNG	2	0	t
5	AUDIFONOS	3	0	t
6	NINTENDO	4	0	t
7	LIBROS DE FANTASIA	5	0	t
8	DULCES	6	0	t
9	Categoria Prueba	6	0	t
10	a	6	0	t
11	x	7	0	t
\.


--
-- TOC entry 2135 (class 0 OID 0)
-- Dependencies: 174
-- Name: subcategoria_id_subcategoria_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subcategoria_id_subcategoria_seq', 11, true);


--
-- TOC entry 2096 (class 0 OID 21515)
-- Dependencies: 181
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuario (id_usuario, nombre_usuario, correo_electronico, numero_telefono, facebook, instagram, whatsapp, clave, id_rol, vigente, es_admin) FROM stdin;
1	USUARIO 1	ABC@GMAIL.COM	1	1	1	1	1010	1	t	t
3	11111	1	3	3	3	3	11	0	t	f
4	1	carlos.medina@gmail.com	4	4	4	4	1	0	t	f
2	adadad	adadad12	\N	2	2	\N	adadad	0	t	f
5	carlos medina	carlosmedina@gmail.com	+56991222541				1234	0	t	f
6	Cristofer Valdevenito	cristofer.valdevenito@alu.ucm.cl	40071423				987654	0	t	f
\.


--
-- TOC entry 2136 (class 0 OID 0)
-- Dependencies: 171
-- Name: usuario_id_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuario_id_usuario_seq', 6, true);


--
-- TOC entry 1956 (class 2606 OID 21484)
-- Name: pkcategoria; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT pkcategoria PRIMARY KEY (id_categoria);


--
-- TOC entry 1968 (class 2606 OID 54326)
-- Name: pkcomentarios_producto; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.comentarios_producto
    ADD CONSTRAINT pkcomentarios_producto PRIMARY KEY (id_comentarios_producto);


--
-- TOC entry 1966 (class 2606 OID 54314)
-- Name: pkdetalle_likes; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.detalle_likes
    ADD CONSTRAINT pkdetalle_likes PRIMARY KEY (id_detalle_likes);


--
-- TOC entry 1970 (class 2606 OID 54348)
-- Name: pkdetalle_likes_comentario; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.detalle_likes_comentario
    ADD CONSTRAINT pkdetalle_likes_comentario PRIMARY KEY (id_detalle_likes_comentario);


--
-- TOC entry 1978 (class 2606 OID 62541)
-- Name: pknotificaciones_comentario; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.notificaciones_comentario
    ADD CONSTRAINT pknotificaciones_comentario PRIMARY KEY (id_notificacion_comentario);


--
-- TOC entry 1976 (class 2606 OID 62530)
-- Name: pknotificaciones_producto; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.notificaciones_producto
    ADD CONSTRAINT pknotificaciones_producto PRIMARY KEY (id_notificacion_producto);


--
-- TOC entry 1960 (class 2606 OID 21504)
-- Name: pkproducto; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.producto
    ADD CONSTRAINT pkproducto PRIMARY KEY (id_producto);


--
-- TOC entry 1974 (class 2606 OID 54404)
-- Name: pkreportes_comentario; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.reportes_comentario
    ADD CONSTRAINT pkreportes_comentario PRIMARY KEY (id_reportes_comentario);


--
-- TOC entry 1972 (class 2606 OID 54374)
-- Name: pkreportes_producto; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.reportes_producto
    ADD CONSTRAINT pkreportes_producto PRIMARY KEY (id_reportes_producto);


--
-- TOC entry 1954 (class 2606 OID 21466)
-- Name: pkrol; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.rol
    ADD CONSTRAINT pkrol PRIMARY KEY (id_rol);


--
-- TOC entry 1958 (class 2606 OID 21493)
-- Name: pksubcategoria; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.subcategoria
    ADD CONSTRAINT pksubcategoria PRIMARY KEY (id_subcategoria);


--
-- TOC entry 1962 (class 2606 OID 21522)
-- Name: pkusuario; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT pkusuario PRIMARY KEY (id_usuario);


--
-- TOC entry 1964 (class 2606 OID 21524)
-- Name: usuario_correo_key; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_correo_key UNIQUE (correo_electronico);


--
-- TOC entry 2117 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2022-11-09 02:30:26

--
-- PostgreSQL database dump complete
--


-- ============================================================
-- Lens PR — Press impacts 2026
-- Adds metadata columns to `news` and inserts 36 press hits
-- from the 2026 Q1-Q2 tracking sheet.
-- Run once in Supabase SQL editor. Idempotent: safe to re-run
-- (rows are upserted by news_link).
-- ============================================================

-- 1) New metadata columns (no-op if they already exist)
alter table public.news
  add column if not exists client_name text,
  add column if not exists country     text,
  add column if not exists vertical    text,
  add column if not exists relevance   text,
  add column if not exists news_link   text,
  add column if not exists is_story    boolean not null default false,
  add column if not exists published_at date;

-- 2) Unique constraint on news_link → makes inserts idempotent
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'news_news_link_key'
  ) then
    alter table public.news add constraint news_news_link_key unique (news_link);
  end if;
end $$;

-- 3) Insert 36 press impacts.
-- title is filled identically across the 3 language columns since
-- the source headlines are not translated (most outlets are in ES;
-- HR News is EN). The site falls back to ES where a locale isn't
-- explicitly translated. description_* is left null on purpose
-- (NewsCard hides the line when empty). Display order = order_number.
insert into public.news (
  title_spanish, title_english, title_portuguese,
  editorial_spanish,
  client_name, country, vertical, relevance,
  news_link, is_story, published_at, order_number
) values
  ('Colombianos marcan récord de compra de vivienda en España',
   'Colombianos marcan récord de compra de vivienda en España',
   'Colombianos marcan récord de compra de vivienda en España',
   'Portafolio',
   'Dils Lucas Fox', 'Colombia', 'Real Estate', 'Tier 1 negocio Colombia',
   'https://www.portafolio.co/internacional/colombianos-marcan-record-de-compra-de-vivienda-en-espana-y-consolidan-inversion-patrimonial-en-euros-487002',
   false, '2026-01-26', 36),

  ('Colombianos aprovechan oportunidades inmobiliarias en España',
   'Colombianos aprovechan oportunidades inmobiliarias en España',
   'Colombianos aprovechan oportunidades inmobiliarias en España',
   'Noticias RCN',
   'Dils Lucas Fox', 'Colombia', 'Real Estate', 'Masivo nacional',
   'https://www.noticiasrcn.com/economia/el-negociazo-que-los-colombianos-estan-aprovechando-en-espana-compras-de-vivienda-baten-record-historico-987371',
   false, '2026-02-02', 34),

  ('Mexicanos incrementan inversión residencial en España',
   'Mexicanos incrementan inversión residencial en España',
   'Mexicanos incrementan inversión residencial en España',
   'Real Estate Market',
   'Dils Lucas Fox', 'México', 'Real Estate', 'Vertical inmobiliario México',
   'https://realestatemarket.com.mx/noticias/mercado-inmobiliario/49951-mexicanos-incrementan-inversion-inmobiliaria-en-espana-compras-residenciales-suben',
   false, '2026-01-27', 35),

  ('Lock-and-leave como nuevo criterio de compra en España',
   'Lock-and-leave como nuevo criterio de compra en España',
   'Lock-and-leave como nuevo criterio de compra en España',
   'Real Estate Market',
   'Dils Lucas Fox', 'México', 'Real Estate', 'Construcción de tendencia',
   'https://www.realestatemarket.com.mx/noticias/mercado-inmobiliario/50149-lock-and-leave-nuevo-criterio-con-el-que-mexicanos-compran-vivienda-en-espana',
   false, '2026-02-25', 26),

  ('Compradores colombianos cambian estrategia de inversión inmobiliaria en España',
   'Compradores colombianos cambian estrategia de inversión inmobiliaria en España',
   'Compradores colombianos cambian estrategia de inversión inmobiliaria en España',
   'Portafolio',
   'Dils Lucas Fox', 'Colombia', 'Real Estate', 'Tier 1 + análisis patrimonial',
   'https://www.portafolio.co/mis-finanzas/vivienda/compradores-colombianos-en-espana-cambian-su-estrategia-crece-la-demanda-de-las-viviendas-489692',
   false, '2026-03-09', 21),

  ('Colombianos pisan fuerte en el mercado inmobiliario español',
   'Colombianos pisan fuerte en el mercado inmobiliario español',
   'Colombianos pisan fuerte en el mercado inmobiliario español',
   'Infobae Colombia',
   'Dils Lucas Fox', 'Colombia', 'Real Estate', 'Alcance regional',
   'https://www.infobae.com/colombia/2026/03/17/colombianos-pisan-fuerte-en-el-mercado-inmobiliario-espanol-registran-mas-de-1000-transacciones-en-el-ultimo-semestre/',
   false, '2026-03-17', 17),

  ('Residencial prime español como activo refugio para inversionistas LATAM',
   'Residencial prime español como activo refugio para inversionistas LATAM',
   'Residencial prime español como activo refugio para inversionistas LATAM',
   'Funds Society',
   'Dils Lucas Fox', 'España', 'Real Estate', 'Audiencia financiera',
   'https://www.fundssociety.com/es/noticias/alternativos/por-que-el-residencial-prime-espanol-se-consolida-como-activo-refugio-dentro-del-wealth-management-en-2026/',
   false, '2026-03-25', 12),

  ('México lidera inversión latinoamericana en inmobiliario europeo',
   'México lidera inversión latinoamericana en inmobiliario europeo',
   'México lidera inversión latinoamericana en inmobiliario europeo',
   'Real Estate Market',
   'Dils Lucas Fox', 'México', 'Real Estate', 'Credencial fuerte para México',
   'https://www.realestatemarket.com.mx/noticias/mercado-inmobiliario/industriales/151-noticias/mercado-inmobiliario/50438-mexico-lidera-la-inversion-latinoamericana-en-el-inmobiliario-europeo',
   false, '2026-04-07', 6),

  ('Claves de inversión inmobiliaria en Europa desde México',
   'Claves de inversión inmobiliaria en Europa desde México',
   'Claves de inversión inmobiliaria en Europa desde México',
   'Inmobiliare',
   'Dils Lucas Fox', 'México', 'Real Estate', 'Medio líder inmobiliario México',
   'https://inmobiliare.com/inversion-inmobiliaria-europa-mexico/',
   false, '2026-04-01', 7),

  ('México concentra 50% del capital LATAM en inmobiliario europeo',
   'México concentra 50% del capital LATAM en inmobiliario europeo',
   'México concentra 50% del capital LATAM en inmobiliario europeo',
   'Periodismo y Ambiente',
   'Dils Lucas Fox', 'México', 'Real Estate', 'Refuerza dato macro',
   'https://www.periodismoyambiente.com.mx/2026/04/22/mexico-concentra-el-50-del-capital-latinoamericano-en-inmobiliario-europeo-la-brecha-estructural-ya-se-esta-cerrando/',
   false, '2026-04-22', 1),

  ('Capital colombiano amplía interés en mercado inmobiliario europeo',
   'Capital colombiano amplía interés en mercado inmobiliario europeo',
   'Capital colombiano amplía interés en mercado inmobiliario europeo',
   'Portafolio',
   'Dils Lucas Fox', 'Colombia', 'Real Estate', 'Continuidad Tier 1',
   'https://www.portafolio.co/mis-finanzas/vivienda/capital-colombiano-amplia-interes-en-mercado-inmobiliario-europeo-ante-brecha-de-inversion-492608',
   false, '2026-04-01', 8),

  ('Tecnología transforma el cuidado de cachorros en Colombia',
   'Tecnología transforma el cuidado de cachorros en Colombia',
   'Tecnología transforma el cuidado de cachorros en Colombia',
   'Publimetro',
   'MIIA', 'Colombia', 'PetTech', 'Masivo + categoría pet tech',
   'https://www.publimetro.co/publipets/2026/03/18/como-la-tecnologia-esta-transformando-el-cuidado-de-cachorros-en-colombia/',
   true, '2026-03-18', 16),

  ('Cuidado preventivo migra a plataformas digitales desde la primera compra',
   'Cuidado preventivo migra a plataformas digitales desde la primera compra',
   'Cuidado preventivo migra a plataformas digitales desde la primera compra',
   'Portafolio',
   'MIIA', 'Colombia', 'PetTech', 'Tier 1 negocio',
   'https://www.portafolio.co/tecnologia/tiene-mascota-cuidado-preventivo-en-colombia-migra-a-plataformas-digitales-desde-la-primera-compra-490652',
   false, '2026-03-24', 14),

  ('Alianza estratégica para asistencia digital en cuidado preventivo de mascotas',
   'Alianza estratégica para asistencia digital en cuidado preventivo de mascotas',
   'Alianza estratégica para asistencia digital en cuidado preventivo de mascotas',
   'El Tiempo',
   'MIIA', 'Colombia', 'PetTech', 'Tier 1 nacional',
   'https://www.eltiempo.com/vida/mascotas/nuevos-tutores-de-mascotas-contaran-con-asistencia-digital-para-el-cuidado-preventivo-mediante-alianza-estrategica-3544142',
   false, '2026-03-30', 11),

  ('Industria de mascotas abre espacio a modelos basados en tecnología',
   'Industria de mascotas abre espacio a modelos basados en tecnología',
   'Industria de mascotas abre espacio a modelos basados en tecnología',
   'Portafolio',
   'MIIA', 'Colombia', 'PetTech', 'Segunda presencia Tier 1',
   'https://www.portafolio.co/tendencias/sociales/industria-de-mascotas-en-colombia-abre-espacio-a-modelos-basados-en-tecnologia-492426',
   false, '2026-04-01', 9),

  ('Alianza Ontop x BVNK para pagos con stablecoins',
   'Alianza Ontop x BVNK para pagos con stablecoins',
   'Alianza Ontop x BVNK para pagos con stablecoins',
   'Territorio Bitcoin',
   'Ontop', 'España', 'Fintech', 'Fintech/cripto España',
   'https://www.territoriobitcoin.com/ontop-anuncia-una-alianza-estrategica-con-bvnk/',
   false, '2026-03-12', 20),

  ('Mención de Ontop en contexto de infraestructura stablecoin y BVNK',
   'Mención de Ontop en contexto de infraestructura stablecoin y BVNK',
   'Mención de Ontop en contexto de infraestructura stablecoin y BVNK',
   'AInvest',
   'Ontop', 'Global', 'Fintech', 'Alcance financiero global',
   'https://www.ainvest.com/es/news/ecb-warns-stablecoin-risks-firms-expand-blockchain-payment-infrastructure-2603/',
   false, '2026-03-01', 23),

  ('When the Hiring Bottleneck Isn''t the Hire',
   'When the Hiring Bottleneck Isn''t the Hire',
   'When the Hiring Bottleneck Isn''t the Hire',
   'HR News',
   'Ontop', 'Reino Unido', 'HR', 'Vertical HR UK',
   'https://hrnews.co.uk/when-the-hiring-bottleneck-isnt-the-hire/',
   false, '2026-04-01', 10),

  ('Nace la primera Venezuela Tech Week para abrir puerta al capital internacional',
   'Nace la primera Venezuela Tech Week para abrir puerta al capital internacional',
   'Nace la primera Venezuela Tech Week para abrir puerta al capital internacional',
   'Forbes Colombia',
   'Venezuela Tech Week', 'Colombia', 'Tech / Startups', 'Gran ancla Tier 1',
   'https://forbes.co/2026/04/15/emprendedores/nace-en-venezuela-la-primera-tech-week-buscando-abrir-la-puerta-al-capital-internacional/',
   true, '2026-04-15', 4),

  ('401 Accelerator impulsa startups LATAM hacia inversión en EE. UU.',
   '401 Accelerator impulsa startups LATAM hacia inversión en EE. UU.',
   '401 Accelerator impulsa startups LATAM hacia inversión en EE. UU.',
   'Entorno VC',
   '401 Accelerator', 'LATAM', 'VC', 'Tier VC/startups',
   'https://entorno.vc/401-accelerator-impulsa-a-startups-latinoamericanas-hacia-el-ecosistema-de-inversion-en-estados-unidos-con-su-programa-2026/',
   false, '2026-04-16', 2),

  ('Lanzamiento ciclo 2026 para llevar startups latinoamericanas al mercado de EE. UU.',
   'Lanzamiento ciclo 2026 para llevar startups latinoamericanas al mercado de EE. UU.',
   'Lanzamiento ciclo 2026 para llevar startups latinoamericanas al mercado de EE. UU.',
   'Pulso Capital',
   '401 Accelerator', 'LATAM', 'VC', 'Medio sectorial fuerte',
   'https://pulsocapital.com/401-accelerator-lanza-su-ciclo-2026-para-llevar-startups-latinoamericanas-al-mercado-de-ee-uu/',
   false, '2026-04-16', 3),

  ('Solución para conflictos por parqueaderos en conjuntos residenciales',
   'Solución para conflictos por parqueaderos en conjuntos residenciales',
   'Solución para conflictos por parqueaderos en conjuntos residenciales',
   'Valora Analitik',
   'Properix', 'Colombia', 'PropTech', 'Negocios + propiedad horizontal',
   'https://www.valoraanalitik.com/conjuntos-residenciales-tendrian-practica-solucion-para-conflicto-de-parqueaderos/',
   true, '2026-04-15', 5),

  ('Ridery: desafíos y visión hacia el futuro tecnológico en 2026',
   'Ridery: desafíos y visión hacia el futuro tecnológico en 2026',
   'Ridery: desafíos y visión hacia el futuro tecnológico en 2026',
   'Fedecámaras Radio',
   'Ridery', 'Venezuela', 'Tech / Startups', 'Vocería CEO',
   'https://fedecamarasradio.com/tecnologia-e-innovacion/desafios-y-vision-hacia-el-futuro-tecnologico-en-2026/',
   false, '2026-02-10', 32),

  ('Fedecámaras destaca emprendimientos jóvenes; presencia de Gerson Gómez/Ridery',
   'Fedecámaras destaca emprendimientos jóvenes; presencia de Gerson Gómez/Ridery',
   'Fedecámaras destaca emprendimientos jóvenes; presencia de Gerson Gómez/Ridery',
   'Bitácora Económica',
   'Ridery', 'Venezuela', 'Tech / Startups', 'Ecosistema empresarial VE',
   'https://bitacoraeconomica.com/fedecamaras-realza-emprendimientos-de-jovenes-venezolanos/',
   false, '2026-02-10', 33),

  ('Gerson Gómez y Ridery presentes en Foro Económico Internacional CAF Panamá',
   'Gerson Gómez y Ridery presentes en Foro Económico Internacional CAF Panamá',
   'Gerson Gómez y Ridery presentes en Foro Económico Internacional CAF Panamá',
   'IP Media Group',
   'Ridery', 'Panamá', 'Tech / Startups', 'Reputación regional',
   'https://ipmediagroup.net/2026/03/03/gerson-gomez-y-ridery-presentes-en-foro-economico-internacional-de-caf-en-panama/',
   false, '2026-03-03', 22),

  ('Ridery representa a Venezuela en foro CAF y Jóvenes Líderes de Fedecámaras',
   'Ridery representa a Venezuela en foro CAF y Jóvenes Líderes de Fedecámaras',
   'Ridery representa a Venezuela en foro CAF y Jóvenes Líderes de Fedecámaras',
   'Qué Pasa en Venezuela',
   'Ridery', 'Venezuela', 'Tech / Startups', 'Liderazgo emprendedor',
   'https://quepasaenvenezuela.org/gerson-gomez-y-ridery-representan-a-venezuela-en-el-foro-economico-internacional-de-caf-en-panama-y-en-el-ii-foro-jovenes-lideres-de-fedecamaras/',
   false, '2026-03-04', 21),

  ('Eatable Adventures proyecta invertir US$1 millón en startups foodtech de Uruguay',
   'Eatable Adventures proyecta invertir US$1 millón en startups foodtech de Uruguay',
   'Eatable Adventures proyecta invertir US$1 millón en startups foodtech de Uruguay',
   'Descubre VC',
   'Eatable Adventures', 'Uruguay', 'AgriFoodtech', 'VC/agri-foodtech',
   'https://www.descubre.vc/noticia/eatable-adventures-proyecta-invertir-us-1-mill-n-en-startups-foodtech-de-uruguay-2026-02-12',
   false, '2026-02-12', 31),

  ('Agrifoodtech: revolución tecnológica en producción y consumo de alimentos',
   'Agrifoodtech: revolución tecnológica en producción y consumo de alimentos',
   'Agrifoodtech: revolución tecnológica en producción y consumo de alimentos',
   'Infobae Tecno',
   'Eatable Adventures', 'LATAM', 'AgriFoodtech', 'Alcance regional tech',
   'https://www.infobae.com/tecno/2026/02/19/agrifoodtech-la-revolucion-tecnologica-que-transforma-como-producimos-y-consumimos-alimentos/',
   false, '2026-02-18', 29),

  ('Tecnología que revoluciona el agro, con vocería de Sergio Zúñiga',
   'Tecnología que revoluciona el agro, con vocería de Sergio Zúñiga',
   'Tecnología que revoluciona el agro, con vocería de Sergio Zúñiga',
   'Radio 3 Cadena Patagonia',
   'Eatable Adventures', 'Argentina', 'AgriFoodtech', 'Sindicación regional',
   'https://radio3cadenapatagonia.com.ar/agrifoodtech-la-tecnologia-que-revoluciona-el-agro/',
   false, '2026-02-19', 28),

  ('Alianza HSG Synergy x Credifamilia para facilitar acceso a crédito de vivienda',
   'Alianza HSG Synergy x Credifamilia para facilitar acceso a crédito de vivienda',
   'Alianza HSG Synergy x Credifamilia para facilitar acceso a crédito de vivienda',
   'La República',
   'HSG Synergy', 'Colombia', 'Fintech', 'Tier 1 negocio Colombia',
   'https://www.larepublica.co/finanzas/hsg-synergy-y-credifamilia-realizan-alianza-para-facilitar-acceso-a-credito-de-vivienda-4327178',
   false, '2026-02-16', 30),

  ('Ontop y BVNK lanzan cuentas en USD con stablecoins para trabajadores globales',
   'Ontop y BVNK lanzan cuentas en USD con stablecoins para trabajadores globales',
   'Ontop y BVNK lanzan cuentas en USD con stablecoins para trabajadores globales',
   'The Paypers',
   'Ontop', 'Global', 'Fintech', 'Medio fintech/payments global',
   'https://thepaypers.com/crypto-web3-and-cbdc/news/ontop-and-bvnk-launch-usd-stablecoin-accounts-for-global-workers',
   false, '2026-03-17', 18),

  ('Cuotas de administración en Colombia: salario mínimo, renta turística y seguridad redefinen ajustes',
   'Cuotas de administración en Colombia: salario mínimo, renta turística y seguridad redefinen ajustes',
   'Cuotas de administración en Colombia: salario mínimo, renta turística y seguridad redefinen ajustes',
   'Portafolio',
   'Properix', 'Colombia', 'PropTech', 'Tier 1 negocio Colombia',
   'https://www.portafolio.co/mis-finanzas/vivienda/cuotas-de-administracion-en-colombia-salario-minimo-renta-turistica-y-seguridad-redefinen-los-ajustes-en-490674',
   false, '2026-03-24', 15),

  ('Por qué sube tanto la cuota de administración en conjuntos residenciales',
   'Por qué sube tanto la cuota de administración en conjuntos residenciales',
   'Por qué sube tanto la cuota de administración en conjuntos residenciales',
   'Pulzo',
   'Properix', 'Colombia', 'PropTech', 'Medio masivo digital',
   'https://www.pulzo.com/amp/economia/vivienda/por-que-sube-tanto-cuota-administracion-conjuntos-residenciales-PP5090935',
   false, '2026-03-01', 24),

  ('La cartera vencida cae 16%, pero el alivio financiero aún no llega a muchos hogares',
   'La cartera vencida cae 16%, pero el alivio financiero aún no llega a muchos hogares',
   'La cartera vencida cae 16%, pero el alivio financiero aún no llega a muchos hogares',
   'La República',
   'FinUp', 'Colombia', 'Fintech', 'Tier 1 financiero Colombia',
   'https://www.larepublica.co/finanzas/la-cartera-vencida-cae-16-pero-el-alivio-financiero-aun-no-llega-a-muchos-hogares-4354383',
   false, '2026-03-24', 13),

  ('La nueva ola de startups que escalan desde contextos complejos en América Latina',
   'La nueva ola de startups que escalan desde contextos complejos en América Latina',
   'La nueva ola de startups que escalan desde contextos complejos en América Latina',
   'Emprendedores News',
   'Ridery', 'LATAM', 'Tech / Startups', 'Narrativa regional de startups resilientes',
   'https://emprendedoresnews.com/emprendedores/la-nueva-ola-de-startups-que-escalan-desde-contextos-complejos-en-america-latina.html',
   false, '2026-03-01', 25),

  ('Cirujana colombiana fue elegida President-Elect de EAST, asociación clave en cirugía de trauma en EE. UU.',
   'Cirujana colombiana fue elegida President-Elect de EAST, asociación clave en cirugía de trauma en EE. UU.',
   'Cirujana colombiana fue elegida President-Elect de EAST, asociación clave en cirugía de trauma en EE. UU.',
   'Portafolio',
   'Paula Ferrada', 'Colombia', 'Salud', 'Tier 1 negocio Colombia',
   'https://www.portafolio.co/tendencias/entretenimiento/cirujana-colombiana-es-elegida-president-elect-de-east-asociacion-clave-en-cirugia-de-trauma-en-ee-uu-488801',
   true, '2026-02-22', 27)

on conflict (news_link) do nothing;

import { ClientsData } from "@/types/clients";

export const clientsData: ClientsData = {
  categories: [
    {
      id: "hrtech",
      name: "HRTech",
      clients: [
        { id: "deel-hr", name: "Deel", category: "hrtech", website: "https://www.deel.com" },
        { id: "hunty", name: "HUNTY", category: "hrtech", website: "https://hunty.com" },
        { id: "revelo", name: "Revelo", category: "hrtech", website: "https://www.revelo.com" },
        { id: "ontop-hr", name: "Ontop", category: "hrtech", website: "https://www.getontop.com" },
        { id: "bonda", name: "Bonda", category: "hrtech", website: "https://bonda.co" }
      ]
    },
    {
      id: "finance-wealth",
      name: "Finanzas y Gestión Patrimonial",
      clients: [
        {
          id: "blackrock",
          name: "BlackRock",
          category: "finance-wealth",
          description: "BlackRock es la firma de gestión de activos más grande del mundo.",
          website: "https://www.blackrock.com"
        }
      ]
    },
    {
      id: "venture-capital",
      name: "Fondos de Inversión / VC & Aceleradoras",
      clients: [
        { id: "femsa-ventures", name: "FEMSA Ventures (CVC)", category: "venture-capital", website: "https://www.femsaventures.com" },
        { id: "latin-leap", name: "Latin Leap", category: "venture-capital", website: "https://latinleap.vc" },
        { id: "newtopia", name: "Newtopia", category: "venture-capital", website: "https://newtopia.vc" },
        { id: "latitud", name: "Latitud", category: "venture-capital", website: "https://latitud.com" },
        { id: "eatable-adventures", name: "Eatable Adventures", category: "venture-capital", website: "https://www.eatableadventures.com" },
        { id: "suricata-labs", name: "Suricata Labs", category: "venture-capital", website: "https://suricatalabs.com" },
        { id: "socialab", name: "Socialab", category: "venture-capital", website: "https://socialab.com" },
        { id: "pantera-makers", name: "Pantera Makers", category: "venture-capital", website: "https://panteramakers.com" }
      ]
    },
    {
      id: "fintech",
      name: "Fintech (pagos, crédito, inversión, payroll)",
      clients: [
        { id: "supra", name: "Supra", category: "fintech", website: "https://supra.com" },
        { id: "milio", name: "Milio", category: "fintech", website: "https://milio.co" },
        { id: "mono", name: "Mono", category: "fintech", website: "https://cuentamono.com" },
        { id: "cinko", name: "Cinko", category: "fintech", website: "https://cinko.co" },
        { id: "payflow", name: "Payflow", category: "fintech", website: "https://payflow.es" },
        { id: "refacil", name: "Refácil", category: "fintech", website: "https://refacil.com" },
        { id: "creditop", name: "Creditop", category: "fintech", website: "https://creditop.co" },
        { id: "yuno", name: "Yuno", category: "fintech", website: "https://y.uno" },
        { id: "trii", name: "Trii", category: "fintech", website: "https://trii.co" },
        { id: "minka", name: "Minka", category: "fintech", website: "https://minka.inc" },
        { id: "taxflow", name: "Taxflow", category: "fintech", website: "https://taxflow.co" },
        { id: "plenti", name: "Plenti", category: "fintech", website: "https://plenti.app" },
        { id: "zulu", name: "Zulu", category: "fintech", website: "https://zulu.co" },
        { id: "bunker", name: "Bunker", category: "fintech", website: "https://bunker.com" },
        { id: "morado", name: "Morado", category: "fintech", website: "https://moradoapp.com" },
        { id: "finup", name: "FinUp", category: "fintech", website: "https://finup.com.ar" }
      ]
    },
    {
      id: "web3-crypto",
      name: "Web3 / Cripto / Blockchain",
      clients: [
        { id: "kravata", name: "Kravata", category: "web3-crypto", website: "https://kravata.co" },
        { id: "minteo", name: "Minteo", category: "web3-crypto", website: "https://minteo.com" },
        { id: "tropykus", name: "Tropykus", category: "web3-crypto", website: "https://tropykus.com" },
        { id: "arch-finance", name: "Arch Finance", category: "web3-crypto", website: "https://arch.finance" },
        { id: "capa", name: "Capa", category: "web3-crypto" },
        { id: "hallos", name: "Hallos", category: "web3-crypto", website: "https://hallos.io" },
        { id: "wallib", name: "Wallib", category: "web3-crypto", website: "https://wallib.com" }
      ]
    },
    {
      id: "saas",
      name: "SaaS",
      clients: [
        { id: "autoparti", name: "Autoparti", category: "saas", website: "https://autoparti.com" },
        { id: "getceles", name: "Getceles", category: "saas", website: "https://getceles.com" },
        { id: "sytrex", name: "Sytrex", category: "saas", website: "https://sytrex.com" },
        { id: "lizit", name: "Lizit", category: "saas", website: "https://lizit.co" },
        { id: "encuadrado", name: "Encuadrado", category: "saas", website: "https://encuadrado.com" }
      ]
    },
    {
      id: "proptech-contech",
      name: "PropTech & ConTech",
      clients: [
        { id: "properix", name: "Properix", category: "proptech-contech", website: "https://properix.com" },
        { id: "retri", name: "Retri", category: "proptech-contech", website: "https://retri.co" }
      ]
    },
    {
      id: "real-estate",
      name: "Inmobiliarias",
      clients: [
        { id: "dils", name: "Dils / Lucas Fox", category: "real-estate", website: "https://dils.com" }
      ]
    },
    {
      id: "ai-automation",
      name: "Inteligencia Artificial (IA) y Automatización",
      clients: [
        { id: "dapta", name: "Dapta", category: "ai-automation", website: "https://dapta.com" },
        { id: "patagon-ai", name: "Patagon AI", category: "ai-automation", website: "https://patagon.ai" },
        { id: "provectus", name: "Provectus", category: "ai-automation", website: "https://provectus.com" },
        { id: "treble-ai", name: "treble.ai", category: "ai-automation", website: "https://treble.ai" },
        { id: "dondo", name: "DONDO", category: "ai-automation", website: "https://dondo.com" }
      ]
    },
    {
      id: "healthtech-pettech",
      name: "HealthTech & PetTech",
      clients: [
        { id: "samay-health", name: "Samay Health", category: "healthtech-pettech", website: "https://samayhealth.com" },
        { id: "arkangel", name: "Arkangel.ai", category: "healthtech-pettech", website: "https://arkangel.ai" },
        { id: "fastfold", name: "Fastfold", category: "healthtech-pettech", website: "https://fastfold.com" },
        { id: "miia", name: "MIIA", category: "healthtech-pettech", website: "https://miia.ai" }
      ]
    },
    {
      id: "edtech",
      name: "EdTech & Formación",
      clients: [
        { id: "biznation", name: "BizNation", category: "edtech", website: "https://thebiznation.com" },
        { id: "codiversity", name: "Codiversity", category: "edtech", website: "https://codiversity.com" },
        { id: "universidad-ean", name: "Universidad EAN", category: "edtech", website: "https://universidadean.edu.co" },
        { id: "learninc", name: "Learninc", category: "edtech", website: "https://learninc.com" },
        { id: "quix", name: "Quix", category: "edtech", website: "https://quix.ai" },
        { id: "open-english", name: "Open English", category: "edtech", website: "https://www.openenglish.com" }
      ]
    },
    {
      id: "telecom-it",
      name: "Telecom / IT Services & Cibersecurity",
      clients: [
        { id: "huawei", name: "Huawei", category: "telecom-it", website: "https://www.huawei.com" },
        { id: "xaldigital", name: "XALDIGITAL", category: "telecom-it", website: "https://xaldigital.com" },
        { id: "servitel", name: "Servitel", category: "telecom-it", website: "https://servitel.co" },
        { id: "teramind", name: "Teramind", category: "telecom-it", website: "https://www.teramind.co" },
        { id: "davinci-tech", name: "Davinci Tech", category: "telecom-it", website: "https://davincitech.com" }
      ]
    },
    {
      id: "legaltech",
      name: "LegalTech",
      clients: [
        { id: "phylolegal", name: "Phylolegal", category: "legaltech", website: "https://phylolegal.com" },
        { id: "juzto", name: "Juzto", category: "legaltech", website: "https://juzto.co" },
        { id: "arthur-d-little", name: "Arthur D. Little", category: "legaltech", website: "https://www.adlittle.com" }
      ]
    },
    {
      id: "business-intelligence",
      name: "Business Intelligence (BI) & Public Affairs",
      clients: [
        { id: "dapper-bi", name: "Dapper", category: "business-intelligence", website: "https://meetdapper.com" },
        { id: "briter", name: "Briter", category: "business-intelligence", website: "https://briterbridges.com" }
      ]
    },
    {
      id: "agri-foodtech",
      name: "Agri & FoodTech",
      clients: [
        { id: "apparta", name: "Apparta", category: "agri-foodtech", website: "https://apparta.co" },
        { id: "tropifresh", name: "TropiFresh", category: "agri-foodtech", website: "https://tropifresh.com" },
        { id: "bifidice", name: "Bifid·ice", category: "agri-foodtech" },
        { id: "cluvi", name: "Cluvi", category: "agri-foodtech", website: "https://cluvi.co" }
      ]
    },
    {
      id: "marketplaces",
      name: "Marketplaces & Movilidad",
      clients: [
        { id: "snauu", name: "Snauu", category: "marketplaces", website: "https://snauu.com" },
        { id: "ridery", name: "Ridery", category: "marketplaces", website: "https://ridery.app" }
      ]
    },
    {
      id: "institutions",
      name: "Instituciones, Ecosistema y Gobierno",
      clients: [
        { id: "colombia-tech-week", name: "Colombia Tech Week", category: "institutions", website: "https://colombiatechweek.co" },
        { id: "venezuela-tech-week", name: "Venezuela Tech Week", category: "institutions" },
        { id: "ccb", name: "Cámara de Comercio de Bogotá", category: "institutions", website: "https://www.ccb.org.co" },
        { id: "cc-tunja", name: "Cámara de Comercio de Tunja", category: "institutions", website: "https://www.cctunja.org.co" }
      ]
    },
    {
      id: "ux",
      name: "UX",
      clients: [
        { id: "usaria", name: "Usaria", category: "ux", website: "https://usaria.co" }
      ]
    },
    {
      id: "personal-brand",
      name: "Personal Brand & Comunidades",
      clients: [
        { id: "paula-ferrada", name: "Paula Ferrada", category: "personal-brand" },
        { id: "laura-forero", name: "Laura Forero", category: "personal-brand" },
        { id: "puras-duras", name: "Puras Duras", category: "personal-brand" }
      ]
    },
    {
      id: "agencies",
      name: "Agencias, Eventos y Lifestyle",
      clients: [
        { id: "masproducciones", name: "masproducciones.co", category: "agencies", website: "https://masproducciones.co" },
        { id: "aceleradora-401", name: "401 Aceleradora", category: "agencies" },
        { id: "circuito-floral-cartagena", name: "Circuito Floral Cartagena", category: "agencies" },
        { id: "ceramica-y-vino", name: "Cerámica y Vino", category: "agencies" }
      ]
    },
    {
      id: "health-wellness",
      name: "Salud y Bienestar",
      clients: [
        { id: "mitho", name: "Mitho Wellness Club", category: "health-wellness", website: "https://mitho.io" }
      ]
    }
  ]
};

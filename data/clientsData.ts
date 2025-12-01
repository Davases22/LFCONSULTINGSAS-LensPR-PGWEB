import { ClientsData } from "@/types/clients";

export const clientsData: ClientsData = {
  categories: [
    {
      id: "finance-wealth",
      name: "Finance & Wealth Management",
      clients: [
        {
          id: "blackrock",
          name: "BlackRock",
          category: "finance-wealth",
          description: "BlackRock es la firma de gestión de activos más grande del mundo.",
          media_url: "",
          website: "https://www.blackrock.com"
        }
      ]
    },
    {
      id: "venture-capital",
      name: "Fondos de Inversión / VC",
      clients: [
        { id: "femsa-ventures", name: "FEMSA Ventures (CVC)", category: "venture-capital" },
        { id: "latin-leap", name: "Latin Leap", category: "venture-capital" },
        { id: "newtopia", name: "Newtopia", category: "venture-capital" },
        { id: "latitud", name: "Latitud", category: "venture-capital" },
        { id: "eatable-adventures", name: "Eatable Adventures", category: "venture-capital" }
      ]
    },
    {
      id: "fintech",
      name: "Fintech (pagos, crédito, inversión, payroll)",
      clients: [
        { id: "deel", name: "Deel", category: "fintech" },
        { id: "ontop", name: "Ontop", category: "fintech" },
        { id: "supra", name: "Supra", category: "fintech" },
        { id: "milio", name: "Milio", category: "fintech" },
        { id: "mono", name: "Mono", category: "fintech" },
        { id: "cinko", name: "Cinko", category: "fintech" },
        { id: "payflow", name: "Payflow", category: "fintech" },
        { id: "refacil", name: "Refácil", category: "fintech" },
        { id: "creditop", name: "Creditop", category: "fintech" },
        { id: "yuno", name: "Yuno", category: "fintech" },
        { id: "trii", name: "Trii", category: "fintech" },
        { id: "minka", name: "Minka", category: "fintech" },
        { id: "taxflow", name: "Taxflow", category: "fintech" },
        { id: "plenti", name: "Plenti", category: "fintech" },
        { id: "zulu", name: "Zulu", category: "fintech" },
        { id: "bunker", name: "Bunker", category: "fintech" },
        { id: "morado", name: "Morado", category: "fintech" }
      ]
    },
    {
      id: "web3-crypto",
      name: "Web3 / Cripto / Blockchain",
      clients: [
        { id: "kravata", name: "Kravata", category: "web3-crypto" },
        { id: "minteo", name: "Minteo", category: "web3-crypto" },
        { id: "tropykus", name: "Tropykus", category: "web3-crypto" },
        { id: "arch-finance", name: "Arch Finance", category: "web3-crypto" },
        { id: "capa", name: "Capa", category: "web3-crypto" },
        { id: "hallos", name: "Hallos", category: "web3-crypto" },
        { id: "wallib", name: "Wallib", category: "web3-crypto" }
      ]
    },
    {
      id: "saas",
      name: "SaaS",
      clients: [
        { id: "autoparti", name: "Autoparti", category: "saas" },
        { id: "getceles", name: "Getceles.com", category: "saas" },
        { id: "dapper", name: "Dapper", category: "saas" },
        { id: "sytrex", name: "Sytrex", category: "saas" },
        { id: "lizit", name: "Lizit", category: "saas" }
      ]
    },
    {
      id: "proptech-contech",
      name: "PropTech & ConTech",
      clients: [
        { id: "properix", name: "Properix", category: "proptech-contech" },
        { id: "retri", name: "Retri", category: "proptech-contech" }
      ]
    },
    {
      id: "accelerators",
      name: "Aceleradoras / Hubs",
      clients: [
        { id: "suricata-labs", name: "Suricata Labs", category: "accelerators" },
        { id: "socialab", name: "Socialab", category: "accelerators" },
        { id: "pantera-makers", name: "Pantera Makers", category: "accelerators" }
      ]
    },
    {
      id: "marketplaces",
      name: "Marketplaces",
      clients: [
        { id: "snauu", name: "Snauu", category: "marketplaces" }
      ]
    },
    {
      id: "agri-foodtech",
      name: "Agri & FoodTech",
      clients: [
        { id: "apparta", name: "Apparta", category: "agri-foodtech" },
        { id: "tropifresh", name: "TropiFresh", category: "agri-foodtech" },
        { id: "bifidice", name: "Bifid·ice", category: "agri-foodtech" },
        { id: "cluvi", name: "Cluvi", category: "agri-foodtech" }
      ]
    },
    {
      id: "hrtech",
      name: "HRTech",
      clients: [
        { id: "hunty", name: "HUNTY", category: "hrtech" },
        { id: "deel-hr", name: "Deel", category: "hrtech" },
        { id: "revelo", name: "Revelo", category: "hrtech" },
        { id: "ontop-hr", name: "Ontop", category: "hrtech" }
      ]
    },
    {
      id: "healthtech-pettech",
      name: "HealthTech & PetTech",
      clients: [
        { id: "samay-health", name: "Samay Health", category: "healthtech-pettech" },
        { id: "arkangel", name: "Arkangel.ai", category: "healthtech-pettech" },
        { id: "fastfold", name: "Fastfold", category: "healthtech-pettech" },
        { id: "miia", name: "MIIA", category: "healthtech-pettech" }
      ]
    },
    {
      id: "edtech",
      name: "EdTech & Formación",
      clients: [
        { id: "biznation", name: "BizNation", category: "edtech" },
        { id: "codiversity", name: "Codiversity", category: "edtech" },
        { id: "universidad-ean", name: "Universidad EAN", category: "edtech" },
        { id: "learninc", name: "Learninc", category: "edtech" },
        { id: "quix", name: "Quix", category: "edtech" }
      ]
    },
    {
      id: "legaltech",
      name: "LegalTech",
      clients: [
        { id: "phylolegal", name: "Phylolegal", category: "legaltech" },
        { id: "juzto", name: "Juzto", category: "legaltech" },
        { id: "arthur-d-little", name: "Arthur D. Little", category: "legaltech" }
      ]
    },
    {
      id: "ai-automation",
      name: "Inteligencia Artificial (IA) y Automatización",
      clients: [
        { id: "dapta", name: "Dapta", category: "ai-automation" },
        { id: "patagon-ai", name: "Patagon AI", category: "ai-automation" },
        { id: "provectus", name: "Provectus", category: "ai-automation" },
        { id: "treble-ai", name: "treble.ai", category: "ai-automation" }
      ]
    },
    {
      id: "business-intelligence",
      name: "Business Intelligence (BI) & Public Affairs Intelligence",
      clients: [
        { id: "dapper-bi", name: "Dapper", category: "business-intelligence" },
        { id: "briter", name: "Briter", category: "business-intelligence" }
      ]
    },
    {
      id: "telecom-it",
      name: "Telecom / IT Services & Cibersecurity",
      clients: [
        { id: "huawei", name: "Huawei", category: "telecom-it" },
        { id: "xaldigital", name: "XALDIGITAL", category: "telecom-it" },
        { id: "servitel", name: "Servitel", category: "telecom-it" },
        { id: "teramind", name: "Teramind", category: "telecom-it" },
        { id: "davinci-tech", name: "Davinci Tech", category: "telecom-it" }
      ]
    },
    {
      id: "ux",
      name: "UX",
      clients: [
        { id: "usaria", name: "Usaria", category: "ux" }
      ]
    },
    {
      id: "institutions",
      name: "Instituciones, Ecosistema y Gobierno",
      clients: [
        { id: "colombia-tech-week", name: "Colombia Tech Week", category: "institutions" },
        { id: "ccb", name: "Cámara de Comercio de Bogotá", category: "institutions" },
        { id: "cc-tunja", name: "Cámara de Comercio de Tunja", category: "institutions" }
      ]
    },
    {
      id: "personal-brand",
      name: "Personal Brand",
      clients: [
        { id: "paula-ferrada", name: "Paula Ferrada", category: "personal-brand" }
      ]
    },
    {
      id: "agencies",
      name: "Agencias",
      clients: [
        { id: "masproducciones", name: "masproducciones.co", category: "agencies" }
      ]
    }
  ]
};

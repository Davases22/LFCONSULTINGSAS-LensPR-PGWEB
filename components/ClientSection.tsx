"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

const principalesLogos = [
    "blackrock", "latitud", "huawei", "deel", "dapper",
    "yuno", "morado", "femsa-ventures", "universidad-ean", "trii",
    "latin-leap", "pantera-makers", "treble-ai", "minka", "ccb",
    "colombia-tech-week", "cc-tunja", "bunker", "patagon-ai", "mono",
    "newtopia", "ontop", "plenti", "mitho", "apparta",
];

const secundariosDLogos = [
    "hunty", "dapta", "kravata", "biznation", "xaldigital",
    "briter-bridges", "bifidice", "milio", "samay-health", "cinko",
    "suricata-labs", "usaria", "tropifresh", "payflow", "revelo",
    "servitel", "refacil", "retri", "learninc", "wallib",
    "creditop", "encuadrado", "minteo", "socialab",
    "eatable-adventures", "bonda", "dils",
    "finup", "juzto", "snauu",
];

const secundariosILogos = [
    "zulu", "fastfold", "phylolegal", "supra", "tropykus",
    "provectus", "cluvi", "getceles", "lizit", "sytrex",
    "quix", "teramind", "taxflow", "capa",
    "tuulapp", "arkangel", "properix", "codiversity",
    "hallos", "miia", "paula-ferrada", "arthur-d-little", "arch-finance",
    "dondo", "autoparti", "davinci-tech", "masproducciones",
    "ridery", "puras-duras", "aceleradora-401",
];

function Capsule({ label }: { label: string }) {
    return (
        <div className="px-4 py-2 bg-transparent text-black border border-black text-sm rounded-full hover:bg-black hover:text-white transition">
            {label}
        </div>
    );
}

export default function ClientSection() {
    const t = useTranslations("clientSection");
    const router = useRouter();

    // Aquí suponemos que el idioma actual está almacenado en el contexto de traducción
    const [currentLanguage, setCurrentLanguage] = useState("es");

    return (
        <section className=" w-full min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white py-8"
            >
                {t("title")}
            </motion.h2>
            {/* Grid Lines */}
            <div className="inset-0 grid grid-cols-1 md:grid-cols-3 grid-rows-1 mt-1 w-full">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="hidden md:grid grid-cols-5 grid-rows-6 gap-4 justify-items-center items-center"
                >
                    {secundariosDLogos.map((name, index) => (
                        <motion.div
                            key={name}
                            whileHover={{ scale: 1.2 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="w-16 h-16 lg:w-24 lg:h-24 flex items-center justify-center">
                                <Image
                                    src={`/images/clientes/secundarios_d/${name}.png`}
                                    alt={name}
                                    width={59}
                                    height={59}
                                    className="object-contain"
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Sección negra con imágenes en grid */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-black mx-2 px-2 shadow-md shadow-black grid grid-cols-5 grid-rows-5 gap-4 justify-items-center items-center"
                >
                    {principalesLogos.map((name) => (
                        <motion.div
                            key={name}
                            whileHover={{ scale: 1.2 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="w-16 h-16 lg:w-24 lg:h-24 flex items-center justify-center">
                                <Image
                                    src={`/images/clientes/principales/${name}.png`}
                                    alt={name}
                                    width={70}
                                    height={70}
                                    className="object-contain"
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className=" grid mx-6 grid-cols-5 grid-rows-6 gap-4 justify-items-center items-center"
                >
                    {secundariosILogos.map((name) => (
                        <motion.div
                            key={name}
                            whileHover={{ scale: 1.2 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="w-16 h-16 lg:w-24 lg:h-24 flex items-center justify-center">
                                <Image
                                    src={`/images/clientes/secundarios_i/${name}.png`}
                                    alt={name}
                                    width={59}
                                    height={59}
                                    className="object-contain"
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="md:hidden mx-4 grid grid-cols-4 grid-rows-6 gap-4 justify-items-center items-center"
                >
                    {secundariosDLogos.slice(0, 24).map((name) => (
                        <motion.div
                            key={name}
                            whileHover={{ scale: 1.2 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="w-20 h-20 lg:w-24 lg:h-24 flex items-center justify-center">
                                <Image
                                    src={`/images/clientes/secundarios_d/${name}.png`}
                                    alt={name}
                                    width={59}
                                    height={59}
                                    className="object-contain"
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

            </div>

        </section>
    );
}

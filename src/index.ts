import { getEngineBinCheck, type BinCheckInfo } from "./bincheck"
import { getEnginePst, type BinPstInfo } from "./pst"
import countries from "world-countries"

export * from "./bincheck"
export * from "./pst"

export type CardBinInfo = {
    bin: string;
    card_brand: string;
    card_type: string;
    card_level: string;
    bank_name: string;
    country_name: string;
    country_code: string;
    country_iso3: string;
    currency: string;
}

export async function lookupBin(bin: string, engine: "pst" | "bincheck" = "bincheck"): Promise<CardBinInfo | undefined> {
    bin = bin.substring(0, 6)
    let binCheck: Record<string, any> = {};
    if (engine === "pst") {
        binCheck = await getEnginePst();
    } else if (engine === "bincheck") {
        binCheck = await getEngineBinCheck();
    } else {
        throw new Error("Unknown engine: " + engine);
    }
    if (binCheck[bin]) {
        const info = binCheck[bin];
        const country = countries.find(c => (
            c.cca3 === info.country_iso3 || c.cca2 === info.country_code
        ));
        return {
            bin: bin,
            card_brand: info.card_brand,
            card_type: info.card_type,
            card_level: info.card_level,
            bank_name: info.bank_name,
            country_name: info.country_name ?? country?.name?.common ?? "",
            country_code: info.country_code ?? country?.cca2 ?? "",
            country_iso3: info.country_iso3 ?? country?.cca3 ?? "",
            currency: country ? Object.keys(country.currencies)[0] : info.currency || "",
        };
    }
}


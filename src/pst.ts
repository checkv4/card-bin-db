import { getEngine, initializeOnce, loadBins } from "./config";


export interface BinPstInfo {
    bin: string;
    country_iso3: string;
    bank_name: string;
    card_level: string;
    card_brand: string;
    card_type: string;
}

const name = "pst"
const keys = ["bin", "country_iso3", "bank_name", "card_level", "card_brand", "card_type"]

export async function getEnginePst(): Promise<Record<string, BinPstInfo>> {
    return await getEngine(name, keys) as Record<string, BinPstInfo>;
}



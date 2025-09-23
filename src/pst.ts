import { getEngine, initializeOnce, loadBins } from "./config";


export interface BinPstInfo {
    bin: string;
    country_alpha3: string;
    issuer_name: string;
    card_level: string;
    brand: string;
    type: string;
}

const name = "pst"
const keys = ["bin", "country_alpha3", "issuer_name", "card_level", "brand", "type"]

export async function getEnginePst(): Promise<Record<string, BinPstInfo>> {
    return await getEngine(name, keys) as Record<string, BinPstInfo>;
}



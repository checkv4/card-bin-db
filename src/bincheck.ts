import { getEngine, initializeOnce, loadBins } from "./config";


export interface BinCheckInfo {
    bin: string;
    card_brand: string;
    card_type: string;
    card_level: string;
    bank_name: string;
    bank_website: string;
    bank_phone: string;
    country_name: string;
    country_code: string;
    country_iso3: string;
    currency: string;
}

const name = "bincheck"
const keys = ["bin", "card_brand", "card_type", "card_level", "bank_name", "bank_website", "bank_phone", "country_name", "country_code", "country_iso3", "currency"]

export async function getEngineBinCheck(): Promise<Record<string, BinCheckInfo>> {
    return await getEngine(name, keys) as Record<string, BinCheckInfo>;
}


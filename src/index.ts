import { getEngineBinCheck, type BinCheckInfo } from "./bincheck"
import { getEnginePst, type BinPstInfo } from "./pst"

export * from "./bincheck"
export * from "./pst"

export type BinInfo = (BinPstInfo | BinCheckInfo) & { bin: string }
export async function lookupBin(bin: string, engine: "pst" | "bincheck" = "bincheck"): Promise<BinInfo | undefined> {
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
        return { bin, ...binCheck[bin] };
    }
}


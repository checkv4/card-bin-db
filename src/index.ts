import { getEngineBinCheck } from "./bincheck"
import { getEnginePst } from "./pst"

export async function lookupBin(bin: string, engine: "pst" | "bincheck" = "bincheck"): Promise<any> {
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

lookupBin("440393","pst").then(console.log)
lookupBin("440393").then(console.log)
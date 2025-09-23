import { getEngineBinCheck } from "./bincheck"

export async function lookupBin(bin: string): Promise<any> {
    bin = bin.substring(0, 6)
    const binCheck = await getEngineBinCheck();
    if (binCheck[bin]) {
        return { bin, ...binCheck[bin] };
    }
}

lookupBin("440393").then(console.log)
lookupBin("999111").then(console.log)
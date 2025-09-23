import fs from "fs/promises"
import path from "path"
import crypto from "crypto";

export type BinInfo = {
    bin: string[];
    str: string;
}
/**
 * 用于合并csv中的重复bin数据，用于减少体积
 * @param inName 导入csv文件名
 * @param outName 导出csv文件名
 */
export async function mergeCSVFiles(inName: string, outName: string) {
    const inPath = path.join(__dirname, '../data', inName + ".csv");
    const outPath = path.join(__dirname, '../bindb', outName + ".csv");
    const bins: Record<string, BinInfo> = {};
    const rows = (await fs.readFile(inPath, 'utf-8')).split("\n")
    for (const row of rows) {
        const [bin, ...strs] = row.split(',');
        if (bin) {
            const str = strs.join(',');
            //计算md5
            const id = crypto.createHash('md5').update(str).digest('hex');
            if (!bins[id]) {
                bins[id] = { bin: [], str: str };
            }
            bins[id].bin.push(bin);
        }
    }
    console.log("合并前行数:", rows.length, "合并后行数:", Object.keys(bins).length);
    //排序bin
    const oks = [] as string[];
    for (const id in bins) {
        const bin = bins[id] as BinInfo
        bin.bin.sort((a, b) => Number(a) - Number(b));
        //合并连续的bin
        const merged: string[] = [];
        let start = Number(bin.bin[0]);
        let end = start;
        for (let i = 1; i < bin.bin.length; i++) {
            const num = Number(bin.bin[i]);
            if (num === end + 1) {
                end = num;
            } else {
                if (start === end) {
                    merged.push(start.toString());
                } else {
                    merged.push(`${start}-${end}`);
                }
                start = num;
                end = num;
            }
        }
        if (start === end) {
            merged.push(start.toString());
        } else {
            merged.push(`${start}-${end}`);
        }
        oks.push([merged.join("/"), bin.str].join(","))
    }
    await fs.writeFile(outPath, oks.join("\n"), 'utf-8');
    console.log("合并完成，文件路径:", outPath);
}

mergeCSVFiles("pst", "pst_merge")

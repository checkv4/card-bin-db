import path from "path";
import fs from "fs/promises";

async function exists(path: string): Promise<boolean> {
    try {
        await fs.access(path);
        return true;
    } catch {
        return false;
    }
}

export const dataDir = path.resolve(__dirname, '../bindb');

export async function loadBins<T>(name: string, keys: string[]): Promise<Record<string, T>> {
    const filePath = path.join(dataDir, `${name}.csv`);
    if (!await exists(filePath)) {
        throw new Error(`File not found: ${filePath}`);
    }
    const result: Record<string, T> = {};
    (await fs.readFile(filePath, 'utf-8')).split("\n").forEach(line => {
        const parts = line.trim().split(",");
        const obj = {} as T;
        keys.forEach((key, index) => {
            (obj as any)[key] = decodeURIComponent(parts[index] || "");
        });
        //解压bin
        const bin = (obj as any).bin as string;
        if (bin) {
            bin.split("/").forEach((part: string) => {
                if (part.includes("-")) {
                    const arr = part.split("-")
                    let start = Number(arr[0])
                    let end = Number(arr[1])
                    Array.from({ length: end - start + 1 }).map((_, i) => i + start);
                    for (let i = start; i <= end as unknown as number; i++) {
                        const _bin = i.toString()
                        result[_bin] = obj;
                    }
                } else {
                    result[part] = obj;
                }
            })
            //删除原始bin字段
            delete (obj as any).bin;
        }
        result[(obj as any).bin as string] = obj;
    })
    return result;
}

//传入key和方法，只能初始化一次，其他的等待初始化完成后同一返回
const initializing: Record<string, Array<{
    resolve: (value: any) => void;
    reject: (reason?: any) => void;
}>> = {};
export async function initializeOnce<T>(key: string, callback: () => Promise<T>): Promise<T> {
    return new Promise<T>(async (resolve, reject) => {
        if (!initializing[key]) {
            //初始化
            initializing[key] = []
            initializing[key].push({ resolve, reject })
            //执行方法
            await callback().then(value => {
                initializing[key] && initializing[key].forEach(item => item.resolve(value));
            }).catch(reason => {
                initializing[key] && initializing[key].forEach(item => item.reject(reason));
            });
        } else {
            initializing[key].push({ resolve, reject });
        }
    })
}

const stores: Record<string, Record<string, any>> = {};
export async function getEngine<T>(name: string, keys: string[]): Promise<Record<string, T>> {
    if (!stores[name]) {
        await initializeOnce(name, async () => {
            return loadBins<T>(name, keys);
        }).then(value => {
            if (value) {
                stores[name] = value;
            }
        })
    }
    return stores[name] as Record<string, T>;
}


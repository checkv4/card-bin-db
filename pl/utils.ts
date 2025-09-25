import fs from "fs";
import path from "path";
const outdir = path.resolve(process.cwd(), 'data');
async function asyncPool<T = any, R = any>(
    poolLimit: number,
    start: number,
    end: number,
    iteratorFn: (item: T, index: number) => Promise<R>,
) {
    const executing: Promise<void>[] = [];

    for (let i = start; i <= end; i++) {
        const item = i.toString().padStart(6, '0');

        // 创建任务 Promise
        const task = iteratorFn(item as T, i)

        // 包装任务以便从执行队列中移除
        const wrappedTask = task.then(() => {
            const index = executing.indexOf(wrappedTask);
            if (index !== -1) {
                executing.splice(index, 1);
            }
        }).catch(error => {
            const index = executing.indexOf(wrappedTask);
            if (index !== -1) {
                executing.splice(index, 1);
            }
            throw error;
        });

        executing.push(wrappedTask);

        // 当达到并发限制时，等待至少一个任务完成
        if (executing.length >= poolLimit) {
            await Promise.race(executing);
        }
    }

    // 等待所有任务完成
    await Promise.all(executing);
}

export async function AppMain(name: string, limit: number, keys: string[], check: (bin: string) => Promise<any>) {
    const start = 731391;
    const end = 999999;
    //创建导出目录
    fs.mkdirSync(outdir, { recursive: true });
    const outfile = path.resolve(outdir, `${name}.csv`);
    console.log("Creating file:", outfile);
    await asyncPool(limit, start, end, async function (bin: string, index: number) {
        const data = await check(bin);
        if (data) {
            const line = bin + "," + keys.map(key => data[key] ? encodeURIComponent(data[key]) : '').join(',') + '\n';
            fs.appendFileSync(outfile, line);
        }
    });
}


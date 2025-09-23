import { AppMain } from "./utils";
// import { CurlSession } from "curl-cffi"
const test = {
    "data": {
        "bin": "440393",
        "country_alpha3": "USA",
        "issuer_name": "BAY FIRST BANK, N.A.",
        "card_level": "PREPAID",
        "brand": "VISA",
        "type": "DEBIT"
    }
}

// const req = new CurlSession()

async function check(bin: string) {
    try {
        const res = await fetch(`https://pulse.pst.net/api/bins/` + bin, {
            "headers": {
                'accept': '*/*',
                'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
                'priority': 'u=1, i',
                'referer': 'https://pulse.pst.net/zh/bin/' + bin,
                'sec-ch-ua': '"Chromium";v="140", "Not=A?Brand";v="24", "Microsoft Edge";v="140"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0',
            },
            // proxy: "https://tocha688-zone-resi-region--st--city--session-tcJM-sessionTime-0:123456@blurpath.net:15136"
        });
        const text = await res.text();
        console.log(bin, res.status, text);
        if ([200, 201].includes(res.status)) {
            return JSON.parse(text).data;
        }
    } catch (err) {
        console.log("Error parsing JSON for bin:", bin, err);
        return await check(bin)
    }
}
AppMain("pst", 200, ["country_alpha3", "issuer_name", "card_level", "brand", "type"], check);
import { AppMain } from "./utils";
import { CurlSession } from "curl-cffi"
const test = {
    "type": "DEBIT",
    "bank": "SUTTON BANK",
    "country": "UNITED STATES",
    "iso_country_a3": "USA",
    "website": "HTTPS://WWW.SUTTONBANK.COM/",
    "vendor": "VISA",
    "bin": "440393",
    "id": 169950,
    "level": "PREPAID",
    "iso_country_a2": "US",
    "country_iso_code": "840",
    "contact": "+ (1) 800-422-3641"
}

const req = new CurlSession()
// https://binsearch.io/docs#/
async function check(bin: string) {
    const res = await req.get(`https://binsearch.io/api/lookup/single?bin=` + bin, {
        "headers": {
            'accept': '*/*',
            'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
            'priority': 'u=1, i',
            'sec-ch-ua': '"Chromium";v="140", "Not=A?Brand";v="24", "Microsoft Edge";v="140"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0',
        },
        proxy: "http://td-customer-xWUYDbwo9r59:JN78M112txJo@47fnsjrv.pr.thordata.net:9999"
    });
    const text = await res.text;
    console.log(bin, res.status, text);
    try {
        if ([200, 201].includes(res.status)) {
            return res.data;
        }
    } catch (err) {
        console.log("Error parsing JSON for bin:", bin, err);
        return await check(bin)
    }
}

AppMain("binsearch", 200, ["type", "bank", "country", "website", "vendor", "bin", "level", "iso_country_a2", "country_iso_code", "contact"], check);


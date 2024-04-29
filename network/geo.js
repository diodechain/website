let invalid = {
    "type": "ipv4",
    "continent_code": null,
    "continent_name": null,
    "country_code": null,
    "country_name": null,
    "region_code": null,
    "region_name": null,
    "city": null,
    "zip": null,
    "latitude": null,
    "longitude": null
};
let IPCache = {
    "e": invalid,
    "25.110.75.67": {
        // 25.110.0.0 - 25.110.255.255
        "ip": "25.110.75.67",
        "type": "ipv4",
        "continent_code": "EU",
        "continent_name": "Europe",
        "country_code": "GB",
        "country_name": "United Kingdom",
        "region_code": "ENG",
        "region_name": "England",
        // "city": "Orpington",
        // "zip": "BR1",
        "latitude": 51.4964,
        "longitude": -0.1224,
    },
    "172.104.119.67": {
        "ip": "172.104.119.67",
        "type": "ipv4",
        "continent_code": "AS",
        "continent_name": "Asia",
        "country_code": "JP",
        "country_name": "Japan",
        "region_code": "13",
        "region_name": "Tokyo",
        "city": "Tokyo",
        "zip": "162-0843",
        "latitude": 35.69628143310547,
        "longitude": 139.73855590820312,
    },
    "139.162.56.162": {
        "ip": "139.162.56.162",
        "type": "ipv4",
        "continent_code": "AS",
        "continent_name": "Asia",
        "country_code": "SG",
        "country_name": "Singapore",
        "region_code": "01",
        "region_name": null,
        "city": "Singapore",
        "zip": null,
        "latitude": 1.3200000524520874,
        "longitude": 103.8198013305664,
    },
    "45.79.115.246": {
        "ip": "45.79.115.246",
        "type": "ipv4",
        "continent_code": "NA",
        "continent_name": "North America",
        "country_code": "US",
        "country_name": "United States",
        "region_code": "CA",
        "region_name": "California",
        "city": "Freemont",
        "zip": "94536",
        "latitude": 37.548270,
        "longitude": -121.988570,
    },
    "45.79.132.11": {
        "ip": "45.79.132.11",
        "type": "ipv4",
        "continent_code": "NA",
        "continent_name": "North America",
        "country_code": "US",
        "country_name": "United States",
        "region_code": "NJ",
        "region_name": "New Jersey",
        "city": "Newark",
        "zip": "07103",
        "latitude": 40.738731384277344,
        "longitude": -74.19452667236328,
    },
    "45.79.58.5": {
        "ip": "45.79.58.5",
        "type": "ipv4",
        "continent_code": "NA",
        "continent_name": "North America",
        "country_code": "US",
        "country_name": "United States",
        "region_code": "TX",
        "region_name": "Texas",
        "city": "Dallas",
        "zip": "75080",
        "latitude": 32.94818,
        "longitude": -96.72972
    },
    "172.105.85.69": {
        "ip": "172.105.85.69",
        "type": "ipv4",
        "continent_code": "EU",
        "continent_name": "Europe",
        "country_code": "DE",
        "country_name": "Germany",
        "region_code": "DE",
        "region_name": "Germany",
        "city": "Frankfurt",
        "zip": "65931",
        "latitude": 50.115520,
        "longitude": 8.684170,
    },
    "80.85.84.160": {
        "ip": "80.85.84.160",
        "type": "ipv4",
        "continent_code": "EU",
        "continent_name": "Europe",
        "country_code": "GB",
        "country_name": "United Kingdom",
        "region_code": "ENG",
        "region_name": "England",
        "city": "London",
        "zip": "BR1",
        "latitude": 51.383758544921875,
        "longitude": 0.04083999991416931,
    },
    "172.105.105.84": {
        "ip": "172.105.105.84",
        "type": "ipv4",
        "continent_code": "NA",
        "continent_name": "North America",
        "country_code": "CA",
        "country_name": "Canada",
        "region_code": "ON",
        "region_name": "Ontario",
        "city": "Toronto",
        "zip": "",
        "latitude": 43.741667,
        "longitude": -79.373333,
    },
    "172.105.186.136": {
        "ip": "172.105.186.136",
        "type": "ipv4",
        "continent_code": "AU",
        "continent_name": "Australia",
        "country_code": "AU",
        "country_name": "Australia",
        "region_code": "NSW",
        "region_name": "New South Wales",
        "city": "Sydney",
        "zip": "",
        "latitude": -33.865,
        "longitude": 151.209444,
    },
    "45.79.126.86": {
        "ip": "45.79.126.86",
        "type": "ipv4",
        "continent_code": "AS",
        "continent_name": "Asia",
        "country_code": "IN",
        "country_name": "India",
        "region_code": "MA",
        "region_name": "Maharashtra",
        "city": "Mumbai",
        "zip": "400099",
        "latitude": 19.01441,
        "longitude": 72.84794,
    }

};
function resolveIP(ip, callback) {
    if (isLocal(ip)) {
        return invalid;
    }
    if (IPCache[ip]) {
        callback(IPCache[ip])
        return
    }
    let opt = { headers: { 'Content-Type': 'application/json' } }
    axios.get('https://monitor.testnet.diode.io/ip/' + ip, opt).then(response => {
        IPCache[ip] = response.data
        callback(response.data)
    })
};
function isLocal(ip) {
    if (ip.startsWith("127") || ip.startsWith("10.") || ip.startsWith("192.168")) return true;
    if (ip.startsWith("172.")) {
        let [a, b, c, d] = ip.split(".")
        if (b >= 16 && b < 32) {
            return true;
        }
    }
    return false;
}
const Blocklist = [
    "satan-meth",
    "satanicbrotherhood",
    "satanm-eth",
    "satanmeth",
    "satanmeth-blog",
    "satanmeth-brotherhood",
    "satanmeth-methcloud",
    "satanmeth-pervrooms",
    "satanmeth-pervtube",
    "satanmeth-pornvault",
    "satanmethbrotherhood",
    "satanmethchat",
    "satanmethdiode",
    "satanmethdrive",
    "satanmethmessenger",
    "satanpowermeth"
]

function isBlocked(name) {
    return Blocklist.includes(name);
}
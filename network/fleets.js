const Fleetlist = {
    "0x8aFe08d333f785C818199a5bdc7A52ac6Ffc492A": {
        "name": "Developer Fleet",
        "icon": "img/cli.png"
    },
    "0x8aD50255218a4abF89caE847189a4bA6ff8Bb9E2": {
        "name": "Diode Collab Fleet",
        "icon": "img/collab.png"
    },
    "0xa7693a5d069A79Edf6d2f5E8F9C1955BcD94ABD7": {
        "name": "Orenda",
        "icon": "img/orenda.png"
    },
    "0x5bC162CA6f78a07713Ec6038999eA6c9844A24a2": {
        "name": "Chronara",
        "icon": "img/chronara.png"
    },
    "0x0d3b95b38846Fa77997e3A56ff06aBDcd4D5d902": {
        "name": "Diode Collab",
        "icon": "img/collab.png"
    },
    "0x260e9F2aB47Bb0934BF84E5D33ee81F9EBe27D83": {
        "name": "Exosite",
        "icon": "img/exosite.png"
    },
    "0x8c2D2Cf27f39e8dF83ad1a30cBBCC6d9cB410f89": {
        "name": "Ampscale",
        "icon": "img/ampscale.png"
    },
    "0xB2F558d0e0A64e9Cf86CD314FeEaf358302d2e5e": {
        "name": "Insight Software",
        "icon": "img/insight.png"
    },
    "0xBAe412cA6A63cc174A4d9296CDe801a889aa1871": {
        "name": "Mirai Window",
        "icon": "img/mirai.png"
    },
    "0xdBAa6d4f29CcB5543fC2E9821E58c2dfBE4A8c59": {
        "name": "The New Internet",
        "icon": "img/newinternet.png"
    },
    "0x8B02AaF758a4ED3210081d4226a7E6683335E5eb": {
        "name": "Silicon Labs",
        "icon": "img/silabs.png" 
    },
    "0xE1AedbeaCEe8f6Ee075656fabE005021c5697A50": {
        "name": "Renesas",
        "icon": "img/renesas.png" 
    },
    "0xB13A36f5e8fd91Aa4851787507B28C9ED9f879F2": {
        "name": "NXP",
        "icon": "img/nxp.png" 
    },
    "0x4A97503cE7840Eb6c9c6C44f90227B90a629C8e0": {
        "name": "Solertiae",
        "icon": "img/solertiae.png" 
    }

}

function getFleet(address) {
    if (Fleetlist[address]) {
        return Fleetlist[address];
    } else {
        return {
            "name": address,
            "icon": null
        };
    }
}
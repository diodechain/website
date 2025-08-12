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
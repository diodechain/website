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
        "name": "Dera Tech",
        "icon": "img/deratech.png"
    },
    "0x51246d0595Ea5a55673311F3ae32704398017132": {
        "name": "Chronara",
        "icon": "img/chronara.png"
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
const array255 = [1, 2, 4, 8, 16, 32, 64, 128];
var ipOriginal = [0, 0, 220, 148];
const mascaraDefault = [255, 255, 255, 255];

function potenciar() {
    return potencias = [12, 11, 10, 9, 6, 2, 2];
}

function sumarSegunPotencias() {
    resultados = []
    potenciar()
    for (let i = 0; i < potencias.length; i++) {
        let array0 = new Array(4).fill(0);
        let sumaAcumulada = 0;
        let contadorSumas = 0;
        let indiceArray0 = 0;
        let sumasNecesarias = potencias[i];
        for (let j = 0; contadorSumas < sumasNecesarias; j++) {
            sumaAcumulada += array255[j % array255.length];
            contadorSumas++;
            if (sumaAcumulada >= 255) {
                sumaAcumulada = 0;
                if (indiceArray0 < array0.length) {
                    array0[indiceArray0] = 255;
                    indiceArray0++;
                }
            }
        }
        if (indiceArray0 < array0.length) {
            array0[indiceArray0] = sumaAcumulada;
            indiceArray0++;
        }
        sumaAcumulada = 0;
        contadorSumas = 0;
        while (indiceArray0 < array0.length) {
            array0[indiceArray0] = 0;
            indiceArray0++;
        }

        resultados.push(array0);
    }
    return resultados;
}

var ob1 = {
    suma : (ip, ip2) => {
        for (let i = 0; i < ip.length; i++) {
            if (ip[i] === 255) {
                ip[i] = 0
                ip[i + 1] += 1
            }
            ip[i] += ip2[i]
        }
        return ip
    },

    nor : ip => {
        for (let i = 0; i < ip.length; i++) {
            if (ip[i] === 255) {
                ip[i] = 0
                ip[i + 1] += 1
            }
            else if(ip[i] !== 0 ) ip[i]+=1
        }
        return ip
    }
};

function rangIps(ip = [], rangIp = []) {
    arrayAux = [];
    arrayAux2 = [];
    arAux3 = []
    for (let i = 0; i < rangIp.length; i++) {
        arrayAux = (ob1.nor(ip))
        arAux3[0] = arrayAux.slice()
        arrayAux = (ob1.suma(ip, rangIp[i]))
        arAux3[1] = arrayAux.slice()
        arrayAux2[i] = arAux3.slice()
    }
    return arrayAux2
}



function mascara(potencias = []) {
    mascRed = [];
    potenciaAux = [];
    for (let i = 0; i < potencias.length; i++) {
        if (potencias[i] < 8 && potencias[i] >= 0) {
            potenciaAux = bits(potencias[i], 3);
        } else if (potencias[i] >= 8 && potencias[i] < 16) {
            potenciaAux = bits((potencias[i] - 8), 2);
        } else if (potencias[i] >= 16 && potencias[i] < 24) {
            potenciaAux = bits((potencias[i] - 16), 1);
        } else if (potencias[i] >= 24 && potencias[i] < 32) {
            potenciaAux = bits((potencias[i] - 24), 0);
        }
        mascRed[i] = potenciaAux;
    }
    return mascRed;

}

function bits(a, b) {
    base = [0, 0, 0, 0];
    for (let i = 0; i < b; i++) {
        base[i] = 255
    }
    base[b] = 255 - ((Math.pow(2, a)) - 1);
    return base;
}


console.log(sumarSegunPotencias())
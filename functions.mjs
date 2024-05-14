import {
    Subred
} from "./subred.mjs"

const array255 = [1, 2, 4, 8, 16, 32, 64, 128]
var subRedesGiga = [800,320,1500,618,29,54,11540,2311,155,470,211,7500]
var subRedesSerial = [4,4,4,4,4,4,4,4,4,4,4,4]
export var subRedes = subRedesGiga.slice()
export var ipOriginal = [148,220,0,0];
const maskDefault = [255, 255, 255, 255];
export var array = []
export var arrayG = []
export var arrayS = []
export var arra2 = []
var indice = 0
var indice2 = 0

for (let index = 0; index < subRedesSerial.length; index++) {
    subRedes.push(subRedesSerial[index])
}

export class Functions {

    arraySubredesG(ob) {
        arrayG[indice] = ob
        indice++
        return arrayG
    }

    arraySubredesS(ob) {
        arrayS[indice2] = ob
        indice2++
        return arrayS
    }

    createSubred(n, rS, rE, fU, lU, sM, d) {
        const ob = new Subred(n, rS, rE, fU, lU, sM, d);
        return ob
    }

    ordenarSubredes(conexiones = []) {
        let temp = 0;
        let n = conexiones.length;
        let j = 0;
        for (let i = 0; i < n - 1; i++) {
            j = i + 1;
            while (j > 0 && conexiones[j] > conexiones[j - 1]) {
                temp = conexiones[j];
                conexiones[j] = conexiones[j - 1];
                conexiones[j - 1] = temp;
                j--;
            }
        }
        return conexiones
    }

    exponentesSubRedes(subR = []) {
        let exponente = []
        let aux
        for (let i = 0; i < subR.length; i++) {
            aux = Math.log2(subR[i])
            if (this.tieneDecimales(aux)) {
                if (this.decimalesMayoresQueCinco(aux))
                    exponente[i] = parseInt(aux.toFixed(0))
                else exponente[i] = (parseInt(aux.toFixed(0))) + 1
            } else exponente[i] = aux
        }
        return exponente
    }

    tieneDecimales(numero) {
        return parseInt(numero) !== parseFloat(numero);
    }

    decimalesMayoresQueCinco(numero) {
        const parteDecimal = numero % 1
        return parteDecimal > 0.5
    }

    mascara(potencias = []) {
        let mascRed = [];
        let potenciaAux = [];
        for (let i = 0; i < potencias.length; i++) {
            if (potencias[i] < 8 && potencias[i] >= 0) {
                potenciaAux = this.bits(potencias[i], 3);
            } else if (potencias[i] >= 8 && potencias[i] < 16) {
                potenciaAux = this.bits((potencias[i] - 8), 2);
            } else if (potencias[i] >= 16 && potencias[i] < 24) {
                potenciaAux = this.bits((potencias[i] - 16), 1);
            } else if (potencias[i] >= 24 && potencias[i] < 32) {
                potenciaAux = this.bits((potencias[i] - 24), 0);
            }
            mascRed[i] = potenciaAux;
        }
        return mascRed;

    }

    bits(a, b) {
        let base = [0, 0, 0, 0];
        for (let i = 0; i < b; i++) {
            base[i] = 255
        }
        base[b] = 255 - ((Math.pow(2, a)) - 1);
        return base;
    }

    rangoSum(maskSub = []) {
        let rangoSumar = [],
            aux = [],
            aux2 = []
        let j = 0
        while (j < maskSub.length) {
            aux = maskSub[j]
            for (let i = 0; i < 4; i++) {
                aux2[i] = (255 - aux[i])
            }
            rangoSumar[j] = aux2.slice()
            j++
        }
        return rangoSumar
    }

    suma(ip, ip2) {
        for (let i = 0; i < ip.length; i++) {
            if (ip[i] === 255) {
                ip[i] = 0
                ip[i - 1] += 1
            }
            ip[i] += ip2[i]
        }
        return ip
    }

    nor(ip) {
        for (let i = 0; i < ip.length; i++) {
            if (ip[i] === 255) {
                ip[i] = 0
                ip[i - 1] += 1
            } else if (i === 3 && ip[i] !== 0) ip[i] += 1
        }
        return ip
    }

    rangIps(ipO = [], ranSum = []) {
        let ip = ipO.slice(),
            ranS = ranSum,
            arrayAux = [],
            arrayAux2 = [],
            arAux3 = []
        for (let i = 0; i < ranS.length; i++) {
            arrayAux = (this.nor(ip))
            arAux3[0] = arrayAux.slice()
            arrayAux = (this.suma(ip, ranS[i]))
            arAux3[1] = arrayAux.slice()
            arrayAux2[i] = arAux3.slice()
        }
        return arrayAux2
    }

    primeraUsable(rango = []) {
        let rango2 = rango.slice() 
        let fU = [], aux=[], aux1=[]
        for (let i = 0; i < rango2.length; i++) {
            aux = rango2[i]
            aux1 = aux[0].slice()
            aux1[3] += 1
            fU[i] = aux1.slice()
        }
        return fU
    }

    ultimaUsable(rango = []) {
        let rango2 = rango.slice() 
        let fU = [], aux=[], aux1=[]
        for (let i = 0; i < rango2.length; i++) {
            aux = rango2[i]
            aux1 = aux[1].slice()
            aux1[3] -= 1
            fU[i] = aux1.slice()
        }
        return fU
    }

    diagonal(potencias = []) {
        let aux = []
        for (let i = 0; i < potencias.length; i++) {
            aux[i] = (32 - potencias[i]);
        }
        return aux
    }

    autoRellenar() {

        let expo = this.exponentesSubRedes(this.ordenarSubredes(subRedes)),
            mask = this.mascara(expo),
            dia = this.diagonal(expo),
            rans = this.rangoSum(mask),
            rango = (this.rangIps(ipOriginal, rans)).slice(),
            rango2 = rango.slice(),
            id = this.ordenarSubredes(subRedes),
            rS = [],
            rE = [],
            aux = [],
            primeraU = this.primeraUsable(rango2),
            ultimaU = this.ultimaUsable(rango2)

        for (let j = 0; j < rango.length; j++) {
            aux = rango[j]

            rS[j] = aux[0]
            rE[j] = aux[1]
        }



        for (let i = 0; i < subRedesGiga.length; i++) {
            this.arraySubredesG(this.createSubred(id[i], rS[i], rE[i], primeraU[i], ultimaU[i], mask[i], dia[i]))
        }

        for (let i = subRedesGiga.length; i < subRedesSerial.length+subRedesGiga.length; i++) {
            this.arraySubredesS(this.createSubred(id[i], rS[i], rE[i], primeraU[i], ultimaU[i], mask[i], dia[i]))
        }
    }

    

    getSubRed(indice){
        return array[indice]
    }
}
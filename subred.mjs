export class Subred{
    constructor(name, rangoStart=[], rangoEnd=[], firstU=[], lastU=[], subnetMask=[], diagonal){
        this.name = name
        this.rangoStart = rangoStart
        this.rangoEnd = rangoEnd
        this.firstU = firstU
        this.lastU = lastU
        this.subnetMask = subnetMask
        this.diagonal = diagonal
    }

    getName(){
        return `${this.name}`
    }

    getRS(){
        return `${this.rangoStart}`
    }

    getRE(){
        return `${this.rangoEnd}`
    }

    getFU(){
        return `${this.firstU}`
    }

    getLU(){
        return `${this.lastU}`
    }

    getSM(){
        return `${this.subnetMask}`
    }

    getD(){
        return `${this.diagonal}`
    }
}
export class Pollution {
    constructor() {
        this._name = "Your position";
        this._lat = null;
        this._lon = null; 
    }

    getName() {
        return this._name;
    }

    setName(name) {
        return this._name = name;
    }

    getLat() {
        return this._lat;
    }

    setLat(lat) {
        return this._lat = lat;
    }

    getLon(lon) {
        return this._lon;
    }

    setLon(lon) {
        return this._lon = lon;
    }
}
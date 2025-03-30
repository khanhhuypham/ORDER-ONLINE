export class LocationModel {

    geometry:Geometry = new Geometry()
    properties:Property = new Property()
    type:string = ""

    constructor(data?: Partial<Location>) {
        Object.assign(this, data);
    }
}

 class Geometry {
    type: string = ""
    coordinates:number[] = [0,0]
    constructor(data?: Partial<Geometry>) {
        Object.assign(this, data);
    }
}

class Property {
    id: string = ""
    label:string = ""
    country:string = ""

    constructor(data?: Partial<Property>) {
        Object.assign(this, data);
    }
}








// if (res.features) {
//     let resAddresses = res.features.map((obj) => ({
//       value: obj.properties.id,
//       label: obj.properties.label, // Adjust based on Track Asia's response
//       location: obj.geometry.coordinates, // Longitude, Latitude
//     }));
//     return resAddresses;
// }
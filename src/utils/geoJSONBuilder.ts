import { Flight } from "../api/flightsV2"


export function buildGeoJSONPoints(items: any[], type: string, lat_prop: string = 'lat', lon_prop: string = "lon") {
    const featureCollection: any = {
        type: "FeatureCollection",
        features: []
    }

    const features: any[] = []
    for (const item of items) {
        features.push({
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [item[lon_prop], item[lat_prop]],
            },
            id: `${type}-${item.id}`,
            properties: {
                _ftype: type,
                ...item
            },
        })
    }
    featureCollection.features = features
    return featureCollection
}

export function buildFlights(flights: Flight[]) {
    const featureCollection: any = {
        type: "FeatureCollection",
        features: []
    }

    const features: any[] = []
    for (const flight of flights) {
        // if (flight.router && flight.router.length > 0) {
        //     for (let i = 0; i < flight.router.length - 1; i++) {
        //         const point = flight.router[i]
        //         const next_point = flight.router[i + 1]
        //         features.push({
        //             type: "Feature",
        //             geometry: {
        //                 type: "LineString",
        //                 coordinates: [
        //                     [point.lon, point.lat],
        //                     [next_point.lon, next_point.lat],
        //                 ]
        //             },
        //             properties: {
        //                 _ftype: "flight-line",
        //                 ...point
        //             }

        //         })
        //         features.push({
        //             type: "Feature",
        //             geometry: {
        //                 type: "Point",
        //                 coordinates: [point.lon, point.lat]
        //             },
        //             properties: {
        //                 _ftype: "flight-point",
        //                 ...point
        //             },
        //         })
        //     }
        // }
        features.push({
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [flight.lon, flight.lat],
            },
            id: flight.flight_id,
            properties: {
                _ftype: "flight",
                ...flight
            },
        })
    }
    featureCollection.features = features
    return featureCollection
}
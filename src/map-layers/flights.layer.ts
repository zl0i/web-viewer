import { useFlightAPI } from "../api/flightsV2";
import { buildFlights } from "../utils/geoJSONBuilder";

import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import GeoJSON from 'ol/format/GeoJSON';
import { Style, Icon } from "ol/style";
import Map from 'ol/Map';

import { getColorByAlt } from "../utils/flights";


export function useFlightsLayout(map: Map) {
    const flightAPI = useFlightAPI();

    const source = new VectorSource()
    const layer = new VectorLayer();
    layer.setSource(source)
    map.addLayer(layer)

    layer.setStyle(function (feature) {
        const course = Math.PI * feature.get('course') / 180
        const image = feature.get('image') || 'unknown'
        const scale = feature.get('image_scale') || 1
        const alt = feature.get('alt')
        const airground = feature.get('airground')
        return new Style({
            image: new Icon({
                src: `${import.meta.env.BASE_URL}/aircraft_icons/${image}.png`,
                rotation: course,
                scale: 0.5 * scale,
                color: getColorByAlt(alt, airground)
            })
        });
    })

    async function updateFlights() {
        const flights = await flightAPI.flights.update()
        const geojson = buildFlights(flights)
        const features = new GeoJSON().readFeatures(geojson, {
            featureProjection: "EPSG:3857",
        });
        source.clear()
        source.addFeatures(features as Feature<Geometry>[])
    }

    updateFlights()
    let interval = setInterval(updateFlights, 30_000)

    return {
        layer: layer,
        startUpdate: () => {
            interval = setInterval(updateFlights, 30_000)
        },
        stopUpdate: () => {
            clearInterval(interval)
        }
    }
}
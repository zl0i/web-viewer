import { useFlightAPI } from "../api/flightsV2";
import { buildGeoJSONPoints } from "../utils/geoJSONBuilder";

import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import GeoJSON from 'ol/format/GeoJSON';

import airbasePicture from '@/assets/airport-blue.png';

export async function useAirbaseLayout() {
    const flightAPI = useFlightAPI();

    const airbases = await flightAPI.airbases.fetch()
    const geojson = buildGeoJSONPoints(airbases, 'airbase');
    const features = new GeoJSON().readFeatures(geojson, {
        featureProjection: 'EPSG:3857',
    });

    const airbaseLayer = new VectorLayer();
    airbaseLayer.setStyle(function () {
        const style = new Style({
            image: new Icon({
                src: airbasePicture,
                width: 18,
                height: 18,
                anchor: [0.5, 1],
            }),
        });
        return style;
    });

    const airbaseSource = new VectorSource({
        features: features,
    });
    airbaseLayer.setSource(airbaseSource as VectorSource<Feature<Geometry>>);

    return airbaseLayer
}
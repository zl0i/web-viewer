import { useEffect, useState } from 'react';

// openlayers
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { ScaleLine } from 'ol/control';

import OSM from 'ol/source/OSM';

import './Map.css';

import { useAirbaseLayout } from '../map-layers/airbases.layers';
import { useFlightsLayout } from '../map-layers/flights.layer';

const MapPage = () => {
  const [map] = useState<Map>(
    new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        projection: 'EPSG:3857',
        center: [0, 0],
        zoom: 2,
      }),
      controls: [
        new ScaleLine({
          units: 'metric',
        }),
      ],
    })
  );

  const airbasesLayer = useAirbaseLayout();
  airbasesLayer.then((layer) => map.addLayer(layer));

  const flightsLayer = useFlightsLayout(map);

  useEffect(() => {
    map.setTarget('map');
    return () => {
      flightsLayer.stopUpdate();
    };
  }, []);

  return (
    <div>
      <div id="map"></div>
    </div>
  );
};

export { MapPage };

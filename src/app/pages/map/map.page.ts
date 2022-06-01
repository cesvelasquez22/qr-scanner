import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare const mapboxgl: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  private _geo: string = null;
  constructor(private _route: ActivatedRoute) {
    this._geo = this._route.snapshot.paramMap.get('geo');
  }

  get coordinates() {
    const [lat, lng] = this.geo.split(',');
    return { lat: +lat, lng: +lng };
  }

  get geo() {
    return this._geo.substring(4, this._geo.length - 1);
  }

  set geo(value) {
    this._geo = value;
  }

  ngOnInit() {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiY2VzdmVsYXNxdWV6IiwiYSI6ImNsM3V6MXM3aTJiZGEzZnBuYnEwa3ZmY2kifQ.B__eMOqegbKFlhRyYt41Rw';
    // const map = new mapboxgl.Map({
    //   container: 'map', // container ID
    //   style: 'mapbox://styles/mapbox/streets-v11', // style URL
    //   center: [-74.5, 40], // starting position [lng, lat]
    //   zoom: 9 // starting zoom
    // });
    const map = new mapboxgl.Map({
      style: 'mapbox://styles/mapbox/light-v10',
      center: [this.coordinates.lng, this.coordinates.lat],
      zoom: 15.5,
      pitch: 45,
      bearing: -17.6,
      container: 'map',
      antialias: true,
    });

    map.on('load', () => {
      // Resize map
      map.resize();
      // Create a new marker.
      const marker = new mapboxgl.Marker().setLngLat([this.coordinates.lng, this.coordinates.lat]).addTo(map);
      // Insert the layer beneath any symbol layer.
      const layers = map.getStyle().layers;
      const labelLayerId = layers.find(
        (layer) => layer.type === 'symbol' && layer.layout['text-field']
      ).id;

      // The 'building' layer in the Mapbox Streets
      // vector tileset contains building height data
      // from OpenStreetMap.
      map.addLayer(
        {
          id: 'add-3d-buildings',
          source: 'composite',
          'source-layer': 'building',
          filter: ['==', 'extrude', 'true'],
          type: 'fill-extrusion',
          minzoom: 15,
          paint: {
            'fill-extrusion-color': '#aaa',

            // Use an 'interpolate' expression to
            // add a smooth transition effect to
            // the buildings as the user zooms in.
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height'],
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height'],
            ],
            'fill-extrusion-opacity': 0.6,
          },
        },
        labelLayerId
      );
    });
  }
}

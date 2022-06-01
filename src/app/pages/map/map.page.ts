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
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2VzdmVsYXNxdWV6IiwiYSI6ImNsM3V6MXM3aTJiZGEzZnBuYnEwa3ZmY2kifQ.B__eMOqegbKFlhRyYt41Rw';
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9 // starting zoom
    });
  }
}

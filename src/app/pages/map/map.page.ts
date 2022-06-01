import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
    console.log(this.coordinates);
  }
}

import {Page, NavController, NavParams} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {GeolocationService} from '../../providers/geolocation-service/geolocation-service';
// import {DataService} from '../../../services/data';
// import {LoadingModal} from '../../components/loading-modal/loading-modal';

/*
  Generated class for the RestaurantPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/restaurant/restaurant.html',
  // directives: [LoadingModal],
   providers: [GeolocationService]
})
export class RestaurantPage {
  static get parameters() {
    return [[NavController],[NavParams],[GeolocationService]];
  }

  constructor(nav,navParams,geolocationService) {
    this.RestaurantPage = RestaurantPage;
    this.nav = nav;
    this.navParams = navParams;
    this.geolocationService = geolocationService;

    this.details = navParams.get('geoloc');
    console.log(this.details);

    // this.cuisine = 'any';
    // this.placeType = 'restaurant';
    // this.sort = 'PROMINENCE';

    this.params = {};

    this.placeType;

  }

  onPageLoaded(){
    console.log('loaded1');
    var me = this;
    me.params.geoloc = this.details;
    me.params.placeType = 'restaurant';
    me.params.cuisine = 'food';
    me.params.sort = 'PROMINENCE';
    me.geolocationService.setPlaces(me.params).then(function (res) {
      console.log(res);
    });
    console.log('res');


  }
  loading(){

  }
  updatePlaceType(){
    document.getElementById('places').innerHTML = '';
    var me = this;
    console.log(this.placeType);
    me.params.geoloc = this.details;
    me.params.placeType = this.placeType;
    me.params.cuisine = this.cuisine;
    me.params.sort = 'PROMINENCE';
    me.geolocationService.setPlaces(me.params).then(function (res) {console.log(res);

    });
  }

  updateCuisine(){

  }

  updateSort(){

  }


}

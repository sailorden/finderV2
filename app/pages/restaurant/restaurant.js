import {Page, NavController, NavParams} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {GeolocationService} from '../../providers/geolocation-service/geolocation-service';
// import {DataService} from '../../../services/data';
import {LoadingModal} from '../../components/loading-modal/loading-modal';

/*
  Generated class for the RestaurantPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/restaurant/restaurant.html',
  directives: [LoadingModal],
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

    this.params = {};

    this.placeType = 'restaurant';
    this.sort = 'Distance';
    this.cuisine = 'food';

    this.items = null;

  }

  onPageLoaded(){
    var me = this;
    me.params.geoloc = this.details;
    me.params.placeType = 'restaurant';
    me.params.cuisine = 'food';
    me.geolocationService.setPlaces(me.params).then(function (res) {
      setTimeout(function() {
        me.items = res;
        me.setRating();


      }, 8000);
    });
  }

  updatePlaceType(){
    var me = this;
    me.params.geoloc = this.details;
    me.params.placeType = me.placeType;
    if (me.placeType == 'cafe') {
      me.params.cuisine = '';
      document.getElementById('cuisine').getElementsByTagName('button')[0].disabled=true;
    }
    else {
      me.params.cuisine = me.cuisine;
      document.getElementById('cuisine').getElementsByTagName('button')[0].disabled=false;
    }
    me.geolocationService.setPlaces(me.params).then(function (res) {
      me.items = null;
      setTimeout(function() {
        me.items = res;
        me.setRating();
        me.sortItems(me.sort);
      }, 6000);
    });
  }

  updateCuisine(){
    var me = this;
    me.params.geoloc = this.details;
    me.params.placeType = me.placeType;
    me.params.cuisine = me.cuisine;
    me.geolocationService.setPlaces(me.params).then(function (res) {
      me.items = null;
      setTimeout(function() {
        me.items = res;
        console.log(me.items);
        me.setRating();
        me.sortItems(me.sort);
      }, 6000);
    });
  }

  updateSort(){
    var me = this;
    me.sortItems(me.sort);
  }

  sortItems(sortVal){
    var me = this;
    if (sortVal == 'Alphabetically') {
      me.items.sort(function(a,b) {
        if(a.name < b.name) return -1;
        if(a.name > b.name) return 1;
        return 0;
      });
    }
    else if (sortVal== 'Rating') {
      me.items.sort(function(a,b) {
        a = a.rating;
        b = b.rating;
        return a < b ? 1 : (a > b ? -1 : 0);
      });
      console.log(me.items);
    }
    else {
      me.items.sort(function(a,b) {
        a = a.distance;
        b = b.distance;
        return a < b ? -1 : (a > b ? 1 : 0);
      });
      console.log(me.items);
    }
  }

  setRating(){
    var me = this;
    console.log('setRating');
    setTimeout(function() {
      var x = document.getElementsByClassName("star");
      var y = document.getElementsByClassName("operatingHR");
      var rating,half,remaining;

      for (var a = 0; a < me.items.length; a++) {
        //rating number
        rating = Math.floor(me.items[a].rating);
        //get decimal num if there is
        half = (me.items[a].rating % 1).toFixed(1);
        //reamianing stars to append
        remaining = Math.floor(5 - me.items[a].rating);

        //appending store open
        if (me.items[a].opening_hours!==undefined) {
          if (me.items[a].opening_hours.open_now!==undefined) {
            console.log(me.items[a].opening_hours.open_now);
            console.log(y[a]);
            if (me.items[a].opening_hours.open_now === true) {
              y[a].insertAdjacentHTML( 'beforeend', '<ion-label secondary>Open <ion-icon name="clock" role="img" class="ion-ios-clock-outline" aria-label="ios-clock-outline"></ion-icon></ion-label>');
            }
            else {
              y[a].insertAdjacentHTML( 'beforeend', '<ion-label danger>Close <ion-icon name="clock" role="img" class="ion-ios-clock-outline" aria-label="ios-clock-outline"></ion-icon></ion-label>');
              ctr=ctr+1;
            }

          }

        }

        if (me.items[a].rating!=0) {
          var ctr = 0;
          for (var b = 1; b <= rating; b++) {
            x[a].insertAdjacentHTML( 'beforeend', '<ion-icon primary name="star" role="img" class="ion-ios-star" aria-label="ios-star"></ion-icon>');
            ctr=ctr+1;
          }
          //int
          if (me.items[a].rating % 1 === 0) {
            if (remaining !== 0 && ctr<=5) {
              for (var b = 1; b <= (5-ctr); b++) {
                x[a].insertAdjacentHTML( 'beforeend', '<ion-icon primary name="star-outline" role="img" class="ion-ios-star-outline" aria-label="ios-star-outline"></ion-icon>');
              }
              ctr=ctr+1;
            }
          }
          //float
          else if (me.items[a].rating % 1 !== 0) {
            if (half !== 0.0 && (me.items[a].rating %1 !== 0)) {
              x[a].insertAdjacentHTML( 'beforeend', '<ion-icon primary name="star-half" role="img" class="ion-ios-star-half" aria-label="ios-star-half"></ion-icon>');
              ctr=ctr+1;
            }
            if (remaining !== 0 && ctr<=5) {
              for (var b = 1; b <= (5-ctr); b++) {
                x[a].insertAdjacentHTML( 'beforeend', '<ion-icon primary name="star-outline" role="img" class="ion-ios-star-outline" aria-label="ios-star-outline"></ion-icon>');
                ctr=ctr+1;
              }

            }
          }
          console.log(ctr+" ctr");
        }
      }
    }, 400);

  }

}
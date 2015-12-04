var _=require('lodash');
var request = require('request');
var fs = require('fs');
var cheerio = require('cheerio');
var linksObject = require ('./getRestaurants.js').restaurants;
var db = require ('../db/db.js');
var async = require ('async');

db (function (){
      var bigMenu = {
            restaurants: []
      };
      // string = string.replace(/\s\s+/g, ' ');

      function cleanString (string) {
            return string.replace(/\s\s+/g, ' ');
      }
      var counter = 0;
      async.eachSeries (linksObject.links, function (url, cb) {
            request(url, function(error, response, html){
                  if(!error)
                  {
                        var $ = cheerio.load(html);
                        var restaurant = {
                              pageUrl: url,
                              name: '',
                              imgUrl: '',
                              deliveryTime: '',
                              minimumOrder: '',
                              menu: []
                        };

                        // Get Name
                        $('.vendor__title').filter(function () {
                              var data = $(this);     
                                    restaurant.name = cleanString(data.children().children().first().text());
                        });

                        // Get Image URL
                        $('.vendor__image').filter(function () {
                              var data = $(this);     
                                    restaurant.imgUrl = data.children().first().attr('src');
                        });

                        // Get delivery time and minimum order
                        $('.cart__content').filter(function () {
                              var data = $(this);     
                              restaurant.deliveryTime = cleanString(data.find('.cart__empty__element--minimum-delivery-time').text());
                                    restaurant.minimumOrder = cleanString(data.find('.cart__empty__element--minimum-order-amount').text());

                        });
                              
                        
                        // Get Menu
                        $('.menu-item').filter(function () {
                              var menuItem = {
                                    name: '',
                                    description: '',
                                    quantity: '',
                                    price: ''
                              };
                              var data = $(this);
                              menuItem.name = cleanString(data.find('.menu-item__title').text());
                              menuItem.description = cleanString(data.find('.menu-item__description').text());    
                              menuItem.quantity = cleanString(data.find('.menu-item__variation__title').text());  
                              menuItem.price = cleanString(data.find('.menu-item__variation__price').text());

                              restaurant.menu.push(menuItem);
                        });
                        db.addRestaurant (restaurant, cb);
                  }
            });
      }, function done (){});
});







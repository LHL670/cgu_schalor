import {db} from './firebase_config.js';

var cguScholar = (function() {
	"use strict";
	var owm = {
		init: function() {
			this.cacheDom();
			this.bindEvents();
			this.callFirebase();
		},
		cacheDom: function() {
			this.xBx = $("#xBxHack");
			this.user_input = $("#userCity");
			this.forcast = $("#forcast");
			this.city = $("#city");
			this.temp = $("#temperature");
			this.tempHigh = $("#high");
			this.tempLow = $("#low");
			this.set_icon = $("#set-icon").parent();
			this.weat_icon = $("#weather-icon");
			this.weat_icon_class = function(time_of_day) {
				var iconClass = "wi-owm-";

				if (time_of_day === "PM") {
					iconClass += "night-";
				} else {
					iconClass += "day-";
				}
				return iconClass;
			};
		},
		bindEvents: function() {
			this.city.click(this.events.checkBox.bind(this));
			this.city.hover(this.events.hover.bind(this));
			this.set_icon.click(this.events.checkBox.bind(this));
			this.user_input.keypress(this.events.enterKey.bind(this));
			this.user_input.blur(this.events.resetCheckBox.bind(this));
		},
		events: {
			checkBox: function(e) {
				e.preventDefault();
				this.xBx.prop("checked", true);
				this.user_input.focus();
			},
			resetCheckBox: function(e) {
				e.preventDefault();
				if (e.type === "keypress") {
					this.user_input.blur();
				}
				this.user_input.val("");
				this.xBx.prop("checked", false);
			},
			hover: function(e) {
				this.set_icon.toggleClass("hovered");
			},
			enterKey: function(e) {
				if (e.which === 13 || e.keyCode === 13) {
					e.preventDefault();
					this.callFirebase(this.user_input.val());
					this.events.resetCheckBox.apply(this, [e]);
				}
			}
		},
		callFirebase: function(User) {
			var ref = db.collection('cguscholar').doc('faE3_ksAAAAJ');
			//var ref = db.collection('cguscholar').doc(`${User}`);

			ref.get().then(doc => {
				console.log(doc.data());
			  });
		
			$.getJSON(User, this.parseData.bind(this));
		},
		parseData: function(json) {
			this.data = {
				name: json.name,
			
				weather: {
					description: json.weather[0].description,
					id: json.weather[0].id
				},
				temp: {
					current: Math.floor(json.main.temp),
					high: Math.floor(json.main.temp_max),
					low: Math.floor(json.main.temp_min)
				}
			};
			this.renderHTML();
		},
		renderHTML: function() {
			this.city.html(this.data.name);
			this.forcast.html(this.data.weather.description);
			this.temp.html(this.data.temp.current);
			this.tempHigh.html(this.data.temp.high);
			this.tempLow.html(this.data.temp.low);
			//DELETE CLASSES
			this.weat_icon.removeClass();
			//RESET CLASSES
			this.weat_icon.addClass("wi wi-fw weather-icon ");
			//ADD NEW CLASS
			this.weat_icon.addClass(this.weat_icon_class() + this.data.weather.id);
		}
	};
	owm.init();
	return {
		time_of_day: owm.weat_icon_class
	};
})();
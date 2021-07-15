var weatherModule = (function () {
	"use strict";
	var owm = {
		init: function () {
			this.getinfo();
			this.cacheDom();
			this.bindEvents();
			this.callAPI();
		},
  
		//var name, email, citations, h_index, picture, school_icons;

		getinfo: function () {	
			name: document.getElementById('city').value;
			email: document.getElementById('forcast').value;
			citations: document.getElementById('temperature').value;
			h_index: document.getElementById('time').value;
			picture: document.getElementById('set-icon').value;
			school_icon: document.getElementById('').value;
		},

		cacheDom: function () {
			this.xBx = $("#xBxHack");
			this.user_input = $("#userCity");
			this.forcast = $("#forcast");
			this.db.name = $("#city");
			this.db.citations = $("#temperature");
			this.set_icon = $("#set-icon").parent();
			this.db.picture = $("#weather-icon");
		},
  
		bindEvents: function () {
			this.city.click(this.events.checkBox.bind(this));
			this.city.hover(this.events.hover.bind(this));
			this.set_icon.click(this.events.checkBox.bind(this));
			this.user_input.keypress(this.events.enterKey.bind(this));
			this.user_input.blur(this.events.resetCheckBox.bind(this));
		},
		events: {
			checkBox: function (e) {
			e.preventDefault();
			this.xBx.prop("checked", true);
			this.user_input.focus();
			},
			resetCheckBox: function (e) {
			e.preventDefault();
			if (e.type === "keypress") {
				this.user_input.blur();
			}
			this.user_input.val("");
			this.xBx.prop("checked", false);
			},
			hover: function (e) {
			this.set_icon.toggleClass("hovered");
			},
			enterKey: function (e) {
			if (e.which === 13 || e.keyCode === 13) {
				e.preventDefault();
				this.callAPI(this.user_input.val());
				this.events.resetCheckBox.apply(this, [e]);
			}
			}
		},
		callAPI: function (url) {
			var apiUrl =
			"//api.openweathermap.org/data/2.5/weather?APPID=d65a9694ae6425d1e080326aab19db69&units=imperial&q=";
			if (url === undefined || url === "") {
			url =
				"//api.openweathermap.org/data/2.5/weather?APPID=d65a9694ae6425d1e080326aab19db69&units=imperial&q=san%20diego";
			} else {
			while (url.charAt(0) === " ") {
				url = url.substr(1);
			}
			apiUrl += encodeURIComponent(url);
			url = apiUrl.toLowerCase();
			}
			$.getJSON(url, this.parseData.bind(this));
		},
		parseData: function (json) {
			this.data = {
			name: json.name,
			weather: {
				description: json.weather[0].description,
				id: json.weather[0].id
			},
			temp: {
				current: Math.floor(json.main.temp)
			}
			};
			this.renderHTML();
		},
		renderHTML: function () {
			this.city.html(this.data.name);
			this.forcast.html(this.data.weather.description);
			this.temp.html(this.data.temp.current);
	
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
  
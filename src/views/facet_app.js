define([
	"jquery",
	"use!backbone",
	"use!underscore",
	"use!ui",
	"_s",
	"text!./templates/facet_app.html",
		],
function($, Backbone, _, ui, _s, template){

	var FacetAppView = Backbone.View.extend({

		events: {
		},

		initialize: function(){
			this.render();
			$(this.el).addClass('facet-app');

		},

		render: function(){
			app_html = _.template(template, {model: this.model.toJSON()});
			$(this.el).html(app_html);

			return this;
		},
		
	});

	return FacetAppView;
});
		

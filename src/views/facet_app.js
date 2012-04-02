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

			$('.left-panel .tabs', this.el).tabs({select: 0});

			this.resize();

			return this;
		},

		resize: function(){
			this.resizeFacets();
			this.resizeViewPane();
		},

		resizeFacets: function() {
			container = $('.left-panel', this.el);
			var totalHeight = container.height();
			var headerHeight = $(".ui-tabs-nav", container).outerHeight(true);

			var visibleTabPanels = $(".ui-tabs-panel:not(.ui-tabs-hide)", container);
			var paddings = visibleTabPanels.outerHeight(true) - visibleTabPanels.height();

			var allTabPanels = $(".ui-tabs-panel", container);
			allTabPanels.height(totalHeight - headerHeight - paddings - 1);
		},
		
		resizeViewPane: function() {
			container = $('.right-panel', this.el);
			var totalHeight = container.height();
			var headerHeight = $(".top-bar", container).outerHeight(true);
			$('.view-pane', container).css('height', totalHeight - headerHeight);
		}
	});

	return FacetAppView;
});
		

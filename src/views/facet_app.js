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
			this.resizeTabs($('.left-panel', this.el));

			return this;
		},

		resize: function(){
			console.log('resize');
			$(this.el).css('width', $(this.el).parent().width());
		},

		resizeTabs: function(tab_container) {
			var totalHeight = $(tab_container).height();
			var headerHeight = $(".ui-tabs-nav", tab_container).outerHeight(true);

			var visibleTabPanels = $(".ui-tabs-panel:not(.ui-tabs-hide)", tab_container);
			var paddings = visibleTabPanels.outerHeight(true) - visibleTabPanels.height();

			var allTabPanels = $(".ui-tabs-panel", tab_container);
			allTabPanels.height(totalHeight - headerHeight - paddings - 1);
		}

		
	});

	return FacetAppView;
});
		

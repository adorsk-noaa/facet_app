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
			this.resizeRightPanel();
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
		
		resizeRightPanel: function() {
			var right_panel_el = $('.right-panel', this.el);
			var container = right_panel_el.parent();
			var totalWidth = container.width();
			var left_panel_width = $('.left-panel', this.el).width();
			right_panel_el.css('width', totalWidth - left_panel_width);

			this.resizeDataView();
		},

		resizeDataView: function() {
			var container = $('.right-panel', this.el);
			var data_view_el = $('.data-view', container);
			var totalHeight = container.height();
			var totalWidth= container.width();
			var headerHeight = $(".top-bar", container).outerHeight(true);
			data_view_el.css('height', totalHeight - headerHeight);
			data_view_el.css('width', totalWidth);
			data_view_el.trigger('viewResize');
		},

		getFacetsEl: function(){
			return $('.facets', this.el);
		},

		getDataViewEl: function(){
			return $('.data-view', this.el);
		}

	});

	return FacetAppView;
});
		

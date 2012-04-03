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
			this.data_views = {};

			this.render();
			$(this.el).addClass('facet-app');

			this.on('ready', this.onReady, this);

		},

		render: function(){
			app_html = _.template(template, {model: this.model.toJSON()});
			$(this.el).html(app_html);

			$('.left-panel .tabs', this.el).tabs({select: 0});

			this.resize();

			return this;
		},

		resize: function(){
			this.resizeLeftPanel();
			this.resizeRightPanel();
		},

		resizeLeftPanel: function() {
			var container = $('.left-panel', this.el);
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
			var totalHeight = container.height();
			var left_panel_width = $('.left-panel', this.el).width();

			right_panel_el.css('width', totalWidth - left_panel_width);
			right_panel_el.css('height', totalHeight);

			this.resizeDataViews();

		},

		resizeDataViews: function() {
			var container = $('.right-panel > .inner', this.el);
			var totalHeight = container.height();
			var headerHeight = $(".top-bar", container).outerHeight(true);

			var data_views_el = $('.data-views', container);
			var paddings = data_views_el.outerHeight(true) - data_views_el.height();

			data_views_el.height(totalHeight - headerHeight - paddings -1);

			_.each(this.data_views, function(data_view){
				data_view.trigger('resizeView');
			});
		},

		getFacetsEl: function(){
			return $('.facets', this.el);
		},

		getDataViewEl: function(){
			return $('.data-view', this.el);
		},

		addDataView: function(data_view){
			this.data_views[data_view.model.cid] = data_view;
			$(data_view.el).addClass('data-view');
			var data_view_container = $('<div class="data-view-container"></div>');
			data_view_container.append(data_view.el);
			$('.data-views', this.el).append(data_view_container);
		},

		onReady: function(){
			_.each(this.data_views, function(data_view){
				data_view.trigger('ready');
			});
		}

	});

	return FacetAppView;
});
		

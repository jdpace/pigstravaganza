/* DO NOT MODIFY. This file was compiled Sun, 22 May 2011 21:23:36 GMT from
 * /Users/jared/Dev/projects/pigstravaganza.com/app/coffeescripts/application.coffee
 */

(function() {
  var Pigstravaganza;
  Pigstravaganza = {
    setup: function() {
      Pigstravaganza.activateNavigation();
      Pigstravaganza.activatePages();
      return Pigstravaganza.activateViewport();
    },
    activateNavigation: function() {
      $('nav a').click(function(e) {
        var page;
        e.preventDefault();
        page = $($(this).attr('href'));
        return Pigstravaganza.pages.trigger('switch', [page]);
      });
      return $('nav').hoverIntent({
        over: Pigstravaganza.showNav,
        out: Pigstravaganza.hideNav,
        timeout: 1500
      });
    },
    activatePages: function() {
      Pigstravaganza.pages = $('#pages');
      Pigstravaganza.pages.bind('switch', this.switchPage);
      return Pigstravaganza.pages.trigger('switch', [$('.page').first()]);
    },
    switchPage: function(e, page) {
      Pigstravaganza.scrollToPage(page);
      Pigstravaganza.loadPage(page);
      return Pigstravaganza.resizeContentForPage(page);
    },
    scrollToPage: function(page) {
      var offset, precedingPages;
      precedingPages = page.prevAll('.page');
      offset = Pigstravaganza.sumPageHeights(precedingPages);
      Pigstravaganza.pages.animate({
        top: -1 * offset + 'px'
      });
      if (page.attr('id') === 'poster') {
        return Pigstravaganza.showNav();
      }
    },
    loadPage: function(page) {
      var dataSrc;
      if (!(page.find('.page-content[data-src]').length > 0)) {
        return;
      }
      Pigstravaganza.showLoadingIcon(page);
      dataSrc = page.find('.page-content[data-src]').attr('data-src');
      return page.find('.page-content').load(dataSrc, function() {
        Pigstravaganza.resizeContentForPage(page);
        return page.find("a[rel='lightbox']").fancybox();
      }).removeAttr('data-src');
    },
    sumPageHeights: function(pages) {
      return _.reduce(_.map(pages, function(page) {
        return $(page).outerHeight();
      }), (function(sum, height) {
        return sum + height;
      }), 0);
    },
    resizeContentForPage: function(page) {
      var targetHeight;
      targetHeight = Math.max($(window).height(), page.outerHeight());
      return $('#content').height(targetHeight);
    },
    activateViewport: function() {
      return $(window).resize(function() {
        $('.page').css({
          'min-height': $(window).height() + 'px'
        });
        return Pigstravaganza.positionNav();
      }).resize();
    },
    positionNav: function() {
      var margin, offset;
      margin = 30;
      offset = Pigstravaganza.pages.offset().left;
      return $('nav').css({
        left: margin + offset + 'px'
      });
    },
    showNav: function() {
      return $('nav').animate({
        top: '0px'
      });
    },
    hideNav: function() {
      return $('nav').animate({
        top: '-230px'
      });
    },
    showLoadingIcon: function(page) {
      var loadingIcon;
      loadingIcon = $('<span/>').addClass('loading').text('loading');
      return page.find('.page-content').append(loadingIcon);
    }
  };
  $(Pigstravaganza.setup);
}).call(this);

var Pigstravaganza = {

  setup: function() {
    Pigstravaganza.activateNavigation();
    Pigstravaganza.activatePages();
    Pigstravaganza.activateViewport();
  },

  activateNavigation: function() {
    $('nav a').click(function(event) {
      event.preventDefault();
      var page = $( $(this).attr('href') );
      Pigstravaganza.pages.trigger('switch', [page]);
    });
  },

  activatePages: function() {
    Pigstravaganza.pages = $('#pages');
    Pigstravaganza.pages.bind('switch', this.switchPage);
    Pigstravaganza.pages.trigger('switch', [$('.page').first()]);
  },

  switchPage: function(event, page) {
    Pigstravaganza.scrollToPage(page);
    Pigstravaganza.resizeContentForPage(page);
  },

  scrollToPage: function(page) {
    var precedingPages = page.prevAll('.page');
    var offset = Pigstravaganza.sumPageHeights(precedingPages);

    console.log(offset);
    Pigstravaganza.pages.animate({
      top: (-1 * offset + "px")
    });
  },

  sumPageHeights: function(pages) {
    var sum = 0;

    pages.each(function(index, page) {
      sum += $(page).outerHeight();
    });

    return sum;
  },

  resizeContentForPage: function(page) {
    var targetHeight = Math.max(
      $(window).height(),
      page.outerHeight()
    );

    $('#content').height(targetHeight);
  },

  activateViewport: function() {
    $(window).resize(function() {
      $('.page').css({'min-height': $(window).height() + 'px'});
    }).resize();
  },

};


$(Pigstravaganza.setup);

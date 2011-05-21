Pigstravaganza =

  setup: () ->
    Pigstravaganza.activateNavigation()
    Pigstravaganza.activatePages()
    Pigstravaganza.activateViewport()

  activateNavigation: () ->
    $('nav a').click (e) ->
      e.preventDefault()
      page = $($(this).attr('href'))
      Pigstravaganza.pages.trigger('switch', [page])

    $('nav').hoverIntent({
      over: Pigstravaganza.showNav,
      out:  Pigstravaganza.hideNav,
      timeout: 1500})

  activatePages: () ->
    Pigstravaganza.pages = $('#pages')
    Pigstravaganza.pages.bind('switch', this.switchPage)
    Pigstravaganza.pages.trigger('switch', [$('.page').first()])

  switchPage: (e, page) ->
    Pigstravaganza.scrollToPage(page)
    Pigstravaganza.loadPage(page)
    Pigstravaganza.resizeContentForPage(page)

  scrollToPage: (page) ->
    precedingPages = page.prevAll('.page')
    offset = Pigstravaganza.sumPageHeights(precedingPages)
    Pigstravaganza.pages.animate {top: (-1 * offset + 'px')}
    Pigstravaganza.showNav() if page.attr('id') == 'poster'

  loadPage: (page) ->
    return unless page.find('.page-content[data-src]').length > 0

    Pigstravaganza.showLoadingIcon(page)

    dataSrc = page.find('.page-content[data-src]')
      .attr 'data-src'

    page.find('.page-content')
      .load(dataSrc, () ->
        Pigstravaganza.resizeContentForPage(page)
        page.find("a[rel='lightbox']")
          .fancybox()
      )
      .removeAttr('data-src')

  sumPageHeights: (pages) ->
    _.reduce(_.map(pages, (page) -> $(page).outerHeight()), ((sum,height) -> sum+height), 0)

  resizeContentForPage: (page) ->
    targetHeight = Math.max($(window).height(), page.outerHeight())
    $('#content').height(targetHeight)

  activateViewport: () ->
    $(window).resize () ->
      $('.page').css {'min-height': $(window).height() + 'px'}
      Pigstravaganza.positionNav()
    .resize()

  positionNav: () ->
    margin = 30
    offset = Pigstravaganza.pages.offset().left
    $('nav').css {left: (margin + offset + 'px')}

  showNav: () ->
    $('nav').animate {top: '0px'}

  hideNav: () ->
    $('nav').animate {top: '-230px'}

  showLoadingIcon: (page) ->
    loadingIcon = $('<span/>').addClass('loading').text('loading')
    page.find('.page-content').append(loadingIcon)


$(Pigstravaganza.setup)

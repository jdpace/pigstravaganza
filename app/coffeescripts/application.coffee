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
    Pigstravaganza.resizeContentForPage(page)

  scrollToPage: (page) ->
    precedingPages = page.prevAll('.page')
    offset = Pigstravaganza.sumPageHeights(precedingPages)
    Pigstravaganza.pages.animate {top: (-1 * offset + 'px')}
    Pigstravaganza.showNav() if page.attr('id') == 'poster'

  sumPageHeights: (pages) ->
    _.reduce(_.map(pages, (page) -> $(page).outerHeight()), (sum,height) ->
      sum = (sum || 0) + height)

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

$(Pigstravaganza.setup)
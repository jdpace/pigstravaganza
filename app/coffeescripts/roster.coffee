Roster =

  attendees:
    [['Alan Dipert', 'alan@thinkrelevance.com', 1]
     ['Jared Pace', 'jared@thinkrelevance.com', 0]
     ['Jason Rudolph', 'jason@thinkrelevance.com', 1]]

  baseUrl: 'http://www.gravatar.com/avatar/'

  gravatarUrl: (email) ->
    Roster.baseUrl + MD5(email) + '.jpg'

  attendeeElement: (attendee) ->
    name = attendee[0]
    email = attendee[1]
    guests = attendee[2]
    "<p class='attendee'><span class='name'>" + name + "</span><img src='" + Roster.gravatarUrl(email) + "' /></p>"

  showGravatars: () ->
    _.each(Roster.attendees, (attendee) ->
      $('#roster').append(Roster.attendeeElement(attendee)))

  setup: () ->
    Roster.showGravatars()

$(Roster.setup)
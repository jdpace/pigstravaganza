Roster =

  attendees:
    [['Alan Dipert', 'alan@thinkrelevance.com', 1]
     ['Jared Pace', 'jared@thinkrelevance.com', 0]
     ['Jason Rudolph', 'jason@thinkrelevance.com', 1]]

  poopieheads:
    [['Rob Sanheim', 'rob@thinkrelevance.com', 0]
     ['Sam Umbach', 'sam@thinkrelevance.com', 0]]

  baseUrl: 'http://www.gravatar.com/avatar/'

  gravatarUrl: (email) ->
    Roster.baseUrl + MD5(email) + '.jpg'

  personElement: (attendee) ->
    name = attendee[0]
    email = attendee[1]
    guests = attendee[2]
    "<img class='attendee' src='" + Roster.gravatarUrl(email) + "' />"

  appendPeople: (elem, people) ->
    _.each(people, (person) ->
      $(elem).append(Roster.personElement(person)))

  setup: () ->
    Roster.appendPeople('#rsvps', Roster.attendees)
    Roster.appendPeople('#poopie-heads', Roster.poopieheads)

$(Roster.setup)
/* DO NOT MODIFY. This file was compiled Sun, 22 May 2011 21:23:36 GMT from
 * /Users/jared/Dev/projects/pigstravaganza.com/app/coffeescripts/roster.coffee
 */

(function() {
  var Roster;
  Roster = {
    attendees: [['Alan Dipert', 'alan@thinkrelevance.com', 1], ['Jared Pace', 'jared@thinkrelevance.com', 0], ['Jason Rudolph', 'jason@thinkrelevance.com', 1]],
    poopieheads: [['Rob Sanheim', 'rob@thinkrelevance.com', 0], ['Sam Umbach', 'sam@thinkrelevance.com', 0]],
    baseUrl: 'http://www.gravatar.com/avatar/',
    gravatarUrl: function(email) {
      return Roster.baseUrl + MD5(email) + '.jpg';
    },
    personElement: function(attendee) {
      var email, guests, headshot, name, tagline;
      name = attendee[0];
      email = attendee[1];
      guests = attendee[2];
      headshot = $('<img/>').attr('src', Roster.gravatarUrl(email)).addClass('attendee');
      name = $('<strong/>').text(name);
      if (guests > 0) {
        tagline = $('<span/>').text("plus " + guests);
      }
      return $('<li/>').append(headshot).append(name).append(tagline);
    },
    appendPeople: function(elem, people) {
      return _.each(people, function(person) {
        return $(elem).append(Roster.personElement(person));
      });
    },
    setup: function() {
      Roster.appendPeople('#rsvps', Roster.attendees);
      return Roster.appendPeople('#poopie-heads', Roster.poopieheads);
    }
  };
  $(Roster.setup);
}).call(this);

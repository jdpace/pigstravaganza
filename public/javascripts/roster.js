/* DO NOT MODIFY. This file was compiled Tue, 24 May 2011 17:10:19 GMT from
 * /Users/jared/Dev/projects/pigstravaganza.com/app/coffeescripts/roster.coffee
 */

(function() {
  var Roster;
  Roster = {
    attendees: [['Aaron Bedra', 'aaron@thinkrelevance.com', 0], ['Alan Dipert', 'alan@thinkrelevance.com', 1], ['Alex Warr', 'alex@thinkrelevance.com', 4], ['Andrew Collins', 'andrew@thinkrelevance.com', 1], ['Ben Vandgrift', 'ben@thinkrelevance.com', 1], ['Bernard', 'bernard@example.com', 1], ['Chris Redinger', 'chris@thinkrelevance.com', 3], ['Don Mullen', 'don@thinkrelevance.com', 2], ['Jared Pace', 'jared@thinkrelevance.com', 0], ['Jason Rudolph', 'jason@thinkrelevance.com', 1], ['Jess Martin', 'jess@thinkrelevance.com', 1], ['Jon Distad', 'jon@thinkrelevance.com', 0], ['Jon Hildebrand', 'jon@example.com', 3], ['Larry Karnowski', 'larry@thinkrelevance.com', 4], ['Lynn Grogan', 'lynn@thinkrelevance.com', 4], ['Maggie Litton', 'maggie@thinkrelevance.com', 0], ['Marc Phillips', 'marc@thinkrelevance.com', 3], ['Michael Parenteau', 'michael@thinkrelevance.com', 2], ['Muness Castle', 'muness@thinkrelevance.com', 1], ['Shay Frendt', 'shay@thinkrelevance.com', 1]],
    poopieheads: [['Alex Redington', 'lovemachine@thinkrelevance.com', 0], ['Bobby Calderwood', 'bobby@thinkrelevance.com', 0], ['Craig Andera', 'craig@thinkrelevance.com', 0], ['Chad Humphries', 'chad@thinkrelevance.com', 0], ['David Liebke', 'david@thinkrelevance.com', 0], ['Jamie Kite', 'jamie@thinkrelevance.com', 0], ['Justin Gehtland', 'justin@thinkrelevance.com', 0], ['Luke Vanderhart', 'luke@thinkrelevance.com', 0], ['Michael Fogus', 'fogus@thinkrelevance.com', 0], ['Rob Sanheim', 'rob@thinkrelevance.com', 0], ['Sam Umbach', 'sam@thinkrelevance.com', 0], ['Stu Halloway', 'stu@thinkrelevance.com', 0], ['Stuart Sierra', 'stuart.sierra@thinkrelevance.com', 0], ['Tim Ewald', 'tim@thinkrelevance.com', 0]],
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
        tagline = $('<span/>').text("+ " + guests);
      } else {
        tagline = $('<span/>').text('forever alone');
      }
      return $('<li/>').append(headshot).append(name).append(tagline);
    },
    appendPeople: function(elem, people) {
      return _.each(people, function(person) {
        return $(elem).append(Roster.personElement(person));
      });
    },
    appendAudioTags: function() {
      var audio, num, src, _results;
      for (num = 1; num <= 12; num++) {
        src = "/sounds/farts/fart-" + num;
        audio = $('<audio/>').addClass('fart');
        audio.append($('<source/>').attr('src', src + '.mp3').attr('type', 'audio/mpeg'));
        audio.append($('<source/>').attr('src', src + '.wav').attr('type', 'audio/wav'));
        $('body').append(audio);
      }
      _results = [];
      for (num = 1; num <= 2; num++) {
        src = "/sounds/oinks/oink-" + num;
        audio = $('<audio/>').addClass('oink');
        audio.append($('<source/>').attr('src', src + '.mp3').attr('type', 'audio/mpeg'));
        audio.append($('<source/>').attr('src', src + '.wav').attr('type', 'audio/wav'));
        _results.push($('body').append(audio));
      }
      return _results;
    },
    enableSounds: function() {
      $('#poopie-heads img').click(function() {
        var farts, randomFart;
        farts = $('audio.fart');
        randomFart = farts.eq(Math.floor(Math.random() * farts.length));
        return randomFart[0].play();
      });
      return $('#rsvps img').click(function() {
        var oinks, randomOink;
        oinks = $('audio.oink');
        randomOink = oinks.eq(Math.floor(Math.random() * oinks.length));
        return randomOink[0].play();
      });
    },
    setup: function() {
      Roster.appendPeople('#rsvps', Roster.attendees);
      Roster.appendPeople('#poopie-heads', Roster.poopieheads);
      Roster.appendAudioTags();
      return Roster.enableSounds();
    }
  };
  $(Roster.setup);
}).call(this);

let groupInput = $('#gridGroup');
let elementArr = [];
let fee;
let duration;

let urlNames = ['Charlotte-Area-Cycling', 'CarolinaTrail', 'Team-Left-Hand', 'Charlotte-Urban-Bicycling', 'Carolinas-Recumbent-Trike-Meetup', 'Exercise-and-Excursion-with-Blue-Blaze-Brewing', 'Adventure-Explorers', 'Daytime-Fun-Seeker'];

urlNames.forEach(element => {
  let groupOption = $("<option>");
  groupOption.text(element);
  $("#gridGroup").append(groupOption);
});

$('#submit').on("click", function (event) {
  event.preventDefault();

  cleanArea();

  $('#noEventsDiv').empty();

  let group = groupInput.val();

  requestGroup(group);

  requestEvents(group);
});


function requestGroup(group) {
  let teamURL = "https://cors-anywhere.herokuapp.com/https://api.meetup.com/" + group;

  $.ajax({
    url: teamURL,
    method: "GET"
  }).then(function (teamResponse) {
    let groupName = teamResponse.name;
    let groupDesc = teamResponse.description.split('<p>', 4);
    let members = teamResponse.members;
    let photo = teamResponse.key_photo.photo_link;

    let groupDescContainer = $('<div>');
    let container = $('<div>');
    let h2 = $('<h2>');
    let users = $('<span>');
    let img = $('<im>');
    let icon = $('<i>');

    groupDesc.forEach(elem => {
      elem = elem.slice(0, elem.length - 5);
      let pElem = $('<p>');
      $(pElem).text(elem);
      $(pElem).addClass('text-left');
      $(groupDescContainer).append(pElem);
    });

    h2.text(groupName);
    users.text(members);
    img.attr('src', photo);

    container.addClass('bg-white shadow-lg rounded w-full mt-24 p-6');
    h2.addClass('text-4xl text-teal-500 my-3 d-inline');
    icon.addClass('fas fa-users text-teal-500 text-2xl m-3');

    $('#groupDescription').append(container);
    $(container).append(h2);
    $(container).append(icon);
    $(container).append(users);
    $(container).append(groupDescContainer);
    $(container).append(img);
  });
}

function requestEvents(group) {
  let eventsURL = "https://cors-anywhere.herokuapp.com/https://api.meetup.com/" + group + "/events?&sign=true&photo-host=public&page=20";

  $.ajax({
    url: eventsURL,
    method: "GET"
  }).then(function (response) {

    if ( response.length === 0 ){
      let divElem = $('<div>');
      let pElem = $('<p>');

      pElem.text('No current events');
      divElem.addClass('flex justify-center text-center');
      pElem.addClass('text-4xl text-white p-32');

      $('#noEventsDiv').append(divElem);
      $(divElem).append(pElem);
    }

    response.forEach(element => {
      elementArr.push(element);

      elementArr.forEach(event => {
        let eventDesc = event.description.split('<p>', 2);
        let date = event.local_date;
        let time = event.local_time;
        let howToFindUs = event.how_to_find_us;
        let durationMls = event.duration;
        let payment = event.member_pay_fee;
        let link = event.link;

        if (payment === false) {
          fee = 'Free';
        }

        msToHrs(durationMls);

        let eventDescContainer = $('<div>');
        let cardDiv = $('<div>');
        let ul = $('<ul>');
        let durationCont = $('<div>');
        let stopWatchIcon = $('<i>');
        let durationLi = $('<li>');
        let calendarCont = $('<div>');
        let calendarIcon = $('<i>');
        let dateLi = $('<li>');
        let timeCont = $('<div>');
        let timeIcon = $('<i>');
        let timeLi = $('<li>');
        let mapCont = $('<div>');
        let mapIcon = $('<i>');
        let addressLi = $('<li>');
        let paymentCont = $('<div>');
        let paymentIcon = $('<i>');
        let feeLi = $('<li>');
        let div = $('<div>');
        let p = $('<p>');
        let a = $('<a>');

        eventDesc.forEach(elem => {
          elem = elem.slice(0, elem.length - 5);
          let pElem = $('<p>');
          $(pElem).text(elem);
          pElem.addClass('font-bold mb-2 text-justify');
          $(eventDescContainer).append(pElem);
        });

        cardDiv.addClass('w-full max-w-sm rounded overflow-hidden shadow-lg px-6 py-4 bg-white');
        ul.addClass('event-container text-gray-700 text-base');
        addressLi.addClass('text-left');
        div.addClass('text-right');
        p.addClass('inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2');
        stopWatchIcon.addClass(' text-teal-500  fas fa-stopwatch mr-3');
        calendarIcon.addClass(' text-teal-500  far fa-calendar-alt mr-3');
        timeIcon.addClass(' text-teal-500  far fa-clock mr-3');
        mapIcon.addClass(' text-teal-500  fas fa-map-marked-alt mr-3');
        paymentIcon.addClass(' text-teal-500  fas fa-money-bill-wave mr-3');
        durationCont.addClass('flex m-3');
        timeCont.addClass('flex m-3');
        mapCont.addClass('flex m-3');
        paymentCont.addClass('flex m-3');
        calendarCont.addClass('flex m-3');

        dateLi.text(date);
        timeLi.text(time);
        addressLi.text(howToFindUs);
        durationLi.text(duration);
        feeLi.text(fee);
        a.text('More info');
        a.attr('href', link);

        $('#cardsContainer').append(cardDiv);
        $(cardDiv).append(eventDescContainer);
        $(cardDiv).append(ul);
        $(ul).append(durationCont);
        $(durationCont).append(stopWatchIcon);
        $(durationCont).append(durationLi);
        $(ul).append(calendarCont);
        $(calendarCont).append(calendarIcon);
        $(calendarCont).append(dateLi);
        $(ul).append(timeCont);
        $(timeCont).append(timeIcon);
        $(timeCont).append(timeLi);
        $(ul).append(paymentCont);
        $(paymentCont).append(paymentIcon);
        $(paymentCont).append(feeLi);
        $(ul).append(mapCont);
        $(mapCont).append(mapIcon);
        $(mapCont).append(addressLi);
        $(cardDiv).append(div);
        $(div).append(p);
        $(p).append(a);
      });
    });
  });
}

function msToHrs(durationMls) {
  let tempTime = moment.duration(durationMls);
  duration = tempTime.hours() + 'hrs' + ' ' + tempTime.minutes() + 'min';
}

// Clean the areas for the next views
function cleanArea() {
  //Clear group description div
  while (groupDescription.firstChild) {
    groupDescription.removeChild(groupDescription.firstChild);
  }

  //Clear cards container
  while (cardsContainer.firstChild) {
    cardsContainer.removeChild(cardsContainer.firstChild);
  }
}

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
/// find the time sice the post
const timeSince = function (date) {
  let seconds = Math.floor((new Date() - date) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return `${Math.floor(interval)} years`;
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return `${Math.floor(interval)} months`;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return `${Math.floor(interval)} days`;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return `${Math.floor(interval)} hours`;
  }
  interval = seconds / 60;
  if (interval > 1) {
    return `${Math.floor(interval)} minutes`;
  }
  return `${Math.floor(seconds)} seconds`;
};

const aDay = 24 * 60 * 60 * 1000;


const data = [
  {
    user: {
      name: 'Newton',
      avatars: 'https://i.imgur.com/73hZDYK.png',
      handle: '@SirIsaac',
    },
    content: {
      text:
        'If I have seen further it is by standing on the shoulders of giants',
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: 'Descartes',
      avatars: 'https://i.imgur.com/nlhLi3I.png',
      handle: '@rd',
    },
    content: {
      text: 'Je pense , donc je suis',
    },
    created_at: 1461113959088,
  }
];
// function for creatin a new element
const createTweetElement = (obj) => {
  // const date = moment (obj.created_at, 'YYYYMMDD').fromNow();
  const objUsr = obj.user;
  const $tweet = `<article class='new-tweet'>
                    <header>
                      <img src='${objUsr.avatars}'/>
                      <span>${objUsr.name}</span>
                      <h2>${objUsr.handle}</h2>
                    </header>
                    <p class="tweet-text">${obj.content.text}</p>
                    <footer>
                      <p>${'2date'}</p>
                    </footer>
                  </article>`;

  return $tweet;
};

// fucntion for appending each element of an array
const renderTweets = function (array) {
  // eslint-disable-next-line no-restricted-syntax
  for (const element of array) {
    const $tweet = createTweetElement(element);
    $('#tweet-container').append($tweet);
  }
};



$(document).ready(function () {
///  serialize method form
  $('#submit-tweet').submit(function (event) {
    const variable = $('#submit-tweet').serialize();
    event.preventDefault()

    $.post('/tweets', variable).then((res) => {
      console.log(res);
    });
  })
  /// fetching tweets
  const loadTweets = function () {
    $.ajax({ url: 'http://localhost:8080/tweets', method: 'GET' }).then(
      (response) => {
        renderTweets(response);
      },
    );
  };
  loadTweets();
});

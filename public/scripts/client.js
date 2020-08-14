/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
/// find the time sice the post

/// Func for preventign SXX 
const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
// function for creatin a new element
const createTweetElement = (obj) => {
  const date = moment (obj.created_at).fromNow();
  const objUsr = obj.user;
  const $tweet = `<article class='new-tweet'>
                    <header>
                      <div>
                       <img src='${escape(objUsr.avatars)}'/>
                       <span>${escape(objUsr.name)}</span>
                      </div>
                       <span id='handle'>${escape(objUsr.handle)}</san>
                    </header>
                    <p class="tweet-text">${escape(obj.content.text)}</p>
                    <footer>
                      <p>${escape(date)}</p>
                      <div>
                      <img src='${'./images/like.png'}'/>
                      <img src='${'./images/map-location.png'}'/>
                      <img src='${'./images/retweet.png'}'/>
                      
                      </div>
                    </footer>
                  </article>`;

  return $tweet;
};

// fucntion for appending each element of an array
const renderTweets = function (array) {
 
  for (const element of array) {
    const $tweet = createTweetElement(element);
    $('#tweet-container').prepend($tweet);
  }
};

$(document).ready(function () {
  // add animation hide/show to compose button
  $('.compose-button').on('click', function () {
    $('.compose-tweet').slideToggle('slow');
    $('#tweet-text').focus();
    $('#tweet-text').mousemove();

  });

  // default Error message 
  $('#error-mssg1').hide();
  $('#error-mssg2').hide();
  
  

  ///  serialize method form
  $('.compose-tweet').submit(function (event) {
    const $tweetText = $('.compose-tweet').serialize();
    event.preventDefault();
    /// Form Validation error when empty text or >140
    if ($tweetText.length >= 145) {
      $('#error-mssg1').show();
      return false;
    } 
      $('#error-mssg1').hide();
    ;
    if ($tweetText === '' || $tweetText === null || $tweetText.length <= 5) {
      $('#error-mssg2').show();
      return false;
    } else {
      $('#error-mssg2').hide();
    };
    /// postin tweets
    $.ajax({ url: '/tweets', type: 'POST', data: $tweetText }).then(
      (response) => {
        $('#tweet-container').empty();
        $('#tweet-text').val('');
        loadTweets();
    })

  });
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

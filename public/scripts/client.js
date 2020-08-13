/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
/// find the time sice the post

/// Func for preventign SXX 
const escape =  function(str) {
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
                      <img src='${escape(objUsr.avatars)}'/>
                      <span>${escape(objUsr.name)}</span>
                      <h2>${escape(objUsr.handle)}</h2>
                    </header>
                    <p class="tweet-text">${escape(obj.content.text)}</p>
                    <footer>
                      <p>${escape(date)}</p>
                    </footer>
                  </article>`;

  return $tweet;
};

// fucntion for appending each element of an array
const renderTweets = function (array) {
  // eslint-disable-next-line no-restricted-syntax
  for (const element of array) {
    const $tweet = createTweetElement(element);
    $('#tweet-container').prepend($tweet);
  }
};

$(document).ready(function () {
///  serialize method form
  $('#submit-tweet').submit(function (event) {
    const $tweetText = $('#submit-tweet').serialize();
    event.preventDefault();
    /// Form Validation
    if ($tweetText.length > 140) {
      alert('The tweet content is too long');
    } else if (
      $tweetText === '' ||
      $tweetText === null ||
      $tweetText.length <= 5
    ) {
      alert('Please tweet something before submitig');
    }
    /// Submition tweets
    // $.post('/tweets', $tweetText).then((response) => {
    //   console.log(response);

    //  renderTweets(response);
    // });;
    console.log("print this");
    $.ajax({url:'/tweets', type: 'POST',data: $tweetText}).then((response) => {
      console.log("completed");
      $('#tweet-container').empty();
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

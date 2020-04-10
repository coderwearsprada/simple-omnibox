// This inner function is triggered each time the text in the omnibox is updated with every keystroke
chrome.omnibox.onInputChanged.addListener(
  function(text, suggest) {
    console.log('inputChanged: ' + text);
    suggest([
      {content: text + " one", description: "the first"},
      {content: text + " two", description: "the second"}
    ]);
  });


// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(
  function(text) {
    newurl = 'http://localhost:8080/load?text=' + text;
    // This example assumes you do a backend cross domain API access. 
    // This is not necessarily true for you. Choose the mode that is appropriate.
    fetch(newurl, {mode: 'cors'})
        .then(function(response) {
          if (!response.ok) {
                console.log('there is a problem. Status Code: ' + response.status);
                return;
          };
          // this example assumes json response. You dont have to.
          response.json().then(function(data) {
            console.log('link: ' + data);
            // do what you want with the response body
          });
        })
        .catch(function(error) {
          console.log('Looks like there was a problem: \n', error);
        });
  });

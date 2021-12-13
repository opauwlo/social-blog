// auth2 is initialized with gapi.auth2.init() and a user is signed in.
function SignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/login');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    console.log('Signed in as: ' + xhr.responseText);
    if (xhr.responseText ==  'success'){
      location.assign('/auth/create');
          
    }
  };
  xhr.send(JSON.stringify({token: id_token}));
  
}
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();

  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

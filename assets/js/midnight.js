function madmimiDigestCallback(result) {
	if(result["success"]) {
		alert("Subscription successful! Thank you!")
	}
}

(function() {

	$(document).ready(wire);

	function wire() {
		$("form.madmimi.digest").submit(MadMimi.subscribeDigest);
	}

	var MadMimi = {
		subscribeDigest: function (event) {
			event.preventDefault();

			var form = $(event.target);
			var id = form.data('madmimi-id');
			var lang = form.data('lang');
			var email = form.find('input.email').first().val();

			var script = document.createElement('script'); script.type = 'text/javascript'; script.async = true;
			script.src = 'https://madmimi.com/signups/subscribe/' + id + '.json?callback=madmimiDigestCallback&signup[email]=' + email;
			document.body.appendChild(script);
		}
	}

})();
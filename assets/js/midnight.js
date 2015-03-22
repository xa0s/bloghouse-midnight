function madmimiDigestCallback(result) {
	if(result["success"]) {
		alert("Subscription successful! Thank you!")
	}
}

(function() {

	$(document).ready(wire);

	function wire() {
		$('form.madmimi.digest').submit(MadMimi.subscribeDigest);
		$('.subscribe-up').click(SubscribePanel.show);
		$('.subscribe-down').click(SubscribePanel.hide);
	}

	var MadMimi = {
		subscribeDigest: function (event) {
			event.preventDefault();

			SubscribePanel.hide();

			var form = $(event.target);
			var id = form.data('madmimi-id');
			var lang = form.data('lang');
			var email = form.find('input.email').first().val();

			var script = document.createElement('script'); script.type = 'text/javascript'; script.async = true;
			script.src = 'https://madmimi.com/signups/subscribe/' + id + '.json?callback=madmimiDigestCallback&signup[email]=' + email;
			document.body.appendChild(script);
		}
	}

	var SubscribePanel = {
		show: function () {
			var panel = $('#subscribe');
			panel.show();
			panel.animate(
				{ 
					'height': '60%' 
				}, 
				{ 
					'duration': 500,
					'done': function(){
						$('#subscribe input').focus();
					}
				}
			);
		},
		hide: function () {
			var panel = $('#subscribe');
			panel.animate(
				{ 
					'height': 0 
				}, 
				{ 
					'duration': 500,
					'done': function(){
						panel.hide()
					}
				}
			);
		}
	}

})();
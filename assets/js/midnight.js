var midnight = (function() {

	$(document).ready(wire);

	function wire() {
		$('form.madmimi.digest').submit(MadMimi.subscribeDigest);
		$('.subscribe-show').click(SubscribePanel.show);
		$('.subscribe-hide').click(SubscribePanel.hide);
		$('.thankyou-hide').click(ThankYouPanel.hide);

	}

	var MadMimi = {
		subscribeDigest: function (event) {
			event.preventDefault();

			SubscribePanel.hide();

			var form = $(event.target);
			var id = form.data('madmimi-id');
			var lang = form.data('lang');
			var email = form.find('input.email').first().val();
			var type = "news";

			var script = document.createElement('script'); script.type = 'text/javascript'; script.async = true;
			script.src = 'https://madmimi.com/signups/subscribe/' + id + '.json?callback=midnight.madmimi.callback.digest' 
				+ '&signup[email]=' + email
				+ '&signup[lang]=' + lang
				+ '&signup[type]=' + type
				;
			document.body.appendChild(script);
		},
		callback: {
			digest: function(result) {
				if(result["success"]) {
					midnight.thankyou.show();
				}
			}
		}
	}

	function midnight_popup(panel, on_show) {

		return {
			show: function () {
				panel.show();
				panel.animate(
					{ 
						'height': '70%' 
					}, 
					{ 
						'duration': 500,
						'done': on_show
					}
				);
			},
			hide: function () {
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
	}

	var SubscribePanel = midnight_popup(
		$('#subscribe'),
		function() {
			$('#subscribe input').focus();
		} 
	);

	var ThankYouPanel = midnight_popup(
		$('#thankyou')
	);

	return {
		subscribe: SubscribePanel,
		thankyou: ThankYouPanel,
		madmimi: MadMimi
	}

})();

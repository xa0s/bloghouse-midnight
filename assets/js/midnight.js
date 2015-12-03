var midnight = (function() {

	$(document).ready(wire);

	function wire() {
		$('form.madmimi.digest').submit(MadMimi.subscribeDigest);
		
		$('.subscribe-show').click(SubscribePanel.show);
		$('.subscribe-hide').click(SubscribePanel.hide);
		$('.subscribe-hide').click(AutoPopup.doNotDisturbShort);
		
		$('.thankyou-hide').click(ThankYouPanel.hide);

		$('#followme-big').waypoint({
			handler: AutoPopup.showPerhaps,
			offset: '95%',
		});
		$('#followme-big').waypoint({
			handler: AutoPopup.showPerhaps,
			offset: '95%',
			context: '#main'
		});

		if(window.location.search.search("utm_source=MadMimi") > 0 && window.location.search.search("utm_medium=email") > 0) {
			AutoPopup.doNotDisturbLong();
		}
	}

	var MadMimi = {
		subscribeDigest: function (event) {
			event.preventDefault();

			SubscribePanel.hide();

			var form = $(event.target);
			var id = form.data('madmimi-id');
			var lang = form.data('lang');
			var type = form.data('type');
			var source = form.data('source');
			var email = form.find('input.email').first().val();
			var name = form.find('input.name').first().val() || '';

			var script = document.createElement('script'); script.type = 'text/javascript'; script.async = true;
			script.src = 'https://madmimi.com/signups/subscribe/' + id + '.json?callback=midnight.madmimi.callback.digest' 
				+ '&signup[email]=' + email
				+ '&signup[lang]=' + lang
				+ '&signup[type]=' + type
				+ '&signup[source]=' + source
				+ '&signup[name]=' + name
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
						'height': '80%' 
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

	var AutoPopup = {
		doNotDisturbShort: function() {
			if(Cookies.get('DND') != 'DND') {
				Cookies.set('DND', 'DND', { expires: 1/24/4 });
			}
		},
		doNotDisturbLong: function() {
			Cookies.set('DND', 'DND', { expires: 365/2 });
		},
		showPerhaps: function(direction) {
			if(direction == 'down') {
				if(Cookies.get('DND') != 'DND') {
					setTimeout(SubscribePanel.show, 500);
				}
			}
		}  
	}

	return {
		autopopup: AutoPopup,
		subscribe: SubscribePanel,
		thankyou: ThankYouPanel,
		madmimi: MadMimi
	}

})();

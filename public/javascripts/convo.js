var botui = new BotUI('api-bot');

var socket = io.connect('http://localhost:8010');
// read the BotUI docs : https://docs.botui.org/


$('.myform').on('submit',function(e){

	var val = $('#valuechat').val();

	botui.message.add({
			human:true,
			content: val,
			delay: 500,
		});
	socket.emit('fromClient', { client : val });

	$(this)[0].reset();
	return false;
});



$('.botui-actions-container').on('click','.btnbotui',function(e){

	var val = $(this).data('value');
	console.log(val);

	botui.message.add({
			human:true,
			content: val,
			delay: 500,
		});
	$('.botui-actions-container').html("");
	socket.emit('fromClient', { client : val });

	return false;
});


socket.on('fromServer', function (data) { // recieveing a reply from server.

		botui.message.add({
			content: data.server.result.fulfillment.speech,
			delay: 500,
		});
		
		var payloadHandler = data.server.result.fulfillment.messages;
		
		$.each(payloadHandler, function(index,value){
			if ('payload' in payloadHandler[index]){

				var html = '<div class="botui-actions-buttons">';

				for(var i=0; i<= 5; i++){



					if( 'type'+i in payloadHandler[index].payload && payloadHandler[index].payload['type'+i] == "button" ) {

						html += '<button type="button" autofocus="autofocus" class="botui-actions-buttons-button btnbotui" data-value="'+payloadHandler[index].payload['value'+i]+'">'+payloadHandler[index].payload['label'+i]+'</button>';

						
					}

				}

				html += '</div>';

				$('.botui-actions-container').html(html);


			}

		});





		
	});





botui.message.add({
	content: 'Lets Start Talking...',
	delay: 1000,
}).then(function () {


	/*return botui.action.text({
		autoHide: false,
		action: {
			placeholder: 'Say Hello', }
		}).then(function (res) {
			console.log('Entered');
		socket.emit('fromClient', { client : res.value }); // sends the message typed to server
			console.log(res.value); // will print whatever was typed in the field.

		}).then(function () {

			socket.on('fromServer', function (data) { // recieveing a reply from server.
				console.log(data.server);
				botui.message.add({
					content: data.server,
					delay: 500,
				});
			});

		})*/

		
	});

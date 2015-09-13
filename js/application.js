$(function(){
	var uuid = function() {
	    var buf = new Uint32Array(4);
	    window.crypto.getRandomValues(buf);
	    var idx = -1;
	    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	        idx++;
	        var r = (buf[idx>>3] >> ((idx%8)*4))&15;
	        var v = c == 'x' ? r : (r&0x3|0x8);
	        return v.toString(16);
	    });
	};

	$('form').submit(function(e) {
		e.preventDefault();

		var data = {
			'U': uuid(),
			'N': $('#name').val(),
			'P': $('#phone').val(),
			'E': $('#email').val(),
			'A': $('#age').val(),
			'L': $('#lat').val(),
			'G': $('#lon').val(),
			'S': $('#message').val(),

			'H': $('#assist').val(),
			'I': $('#needHelp').val(),
			'T': [],
			'W': $('#walk').val(),
			'R': [],
			'M': $('#medic').val(),
			'B': [],
			'O': $('#offroad').val(),
			'D': $('#dispatch').val(),
			
			'X': $('#gender').val(),
		}

		var resources = ['water', 'food', 'medicine', 'shelter', 'comms'];
		for(var i = 0; i < resources.length; ++i) {
			if( $('#' + resources[i]).val() == '1' ) {
				data['R'].push(i + 1);
			}
		}

		var mobility = ['bicycle', 'bike', 'car', 'van', 'struck', 'truck'];
		for(var i = 0; i < resources.length; ++i) {
			if( $('#' + resources[i]).val() == '1' ) {
				data['B'].push(i + 1);
			}
		}

		$.ajax({
			'type': 'POST',
			'url': 'http://drhq.hacktag.uk/report',
			'contentType': 'application/json',
			'data': JSON.stringify(data),
			'dataType': 'json',
			'success': function(data, status, jqxhr) {
				if ( status == 201 ) {
					alert('Report sent successfully!');
				}
			}
		});
	});
	
	// Set initial state.
    $('#needHelpGroup').hide()
	$('#assistGroup').hide()
	$('#header').hide()

    $('#needHelp').change(function() {
        if($(this).is(":checked")) {
        	$('#needHelpGroup').show()
        	$('#header').show()

        }else{
        	$('#needHelpGroup').hide()
            $('#header').hide()
        }
    });

    $('#assist').change(function() {
        if($(this).is(":checked")) {
           	$('#assistGroup').show()
        	$('#header').show()
        }else{
        	$('#assistGroup').hide()
            $('#header').hide()
        }
    });
});

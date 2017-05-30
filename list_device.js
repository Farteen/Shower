var button = document.getElementById('clicktolistdevices');
button.addEventListener('click', listAllConnectedDevices);

function listAllConnectedDevices() {
	const spawn = require('child_process').spawn;
	const instruments = spawn('instruments', ['-s', 'devices']);

	var total_text = "";
	instruments.stdout.on('data', (data) => {
	  total_text += data;
	});

	instruments.on('close', (code) => {
		var connected_device_count = 0;
		for(let device_name of total_text.split("\n")) {
			if (deviceIsNotiPhoneSimulator(device_name)) {
				var device_id = unwrapiPhoneDeviceID(device_name);
				alert(device_id);
				connected_device_count++;
			}
		}
		if (connected_device_count == 0) {
			alert("No device is connected right now");
		}
	});
}

function deviceIsNotiPhoneSimulator(device_name) {
	if (device_name.trim().length == 0) {
		return false
	}
	if (device_name.indexOf("Known Devices") >= 0) {
		return false;
	}
	if (device_name.indexOf("MacBook") >= 0) {
		return false;
	}
	if (device_name.indexOf("Simulator") >= 0) {
		return false;
	}
	return true;
}

function unwrapiPhoneDeviceID(device_name) {
	var pattern = /[\w,\d]{40}/
	var reg_result = pattern.exec(device_name)
	return reg_result[0]
}


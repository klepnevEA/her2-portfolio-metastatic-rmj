/**
 * [RUS] Взаимодействие с приложением
 * [ENG] Interaction with iPad app
 */
var xclmApp = function()
{
	var that = this;
	
	this.bufferSize = null;
	this.internet = null;
	
	/* Приложение свернуто */
	this.collapse = function()
	{
		xclm.events.onAppCollapse();
	}
	
	/* Приложение развернуто */
	this.expand = function()
	{
		xclm.events.onAppExpand();		
	}

	this.open = function(file, x, y)
	{
		data = {}; //
		data['file'] = file;
		data['x'] = x;
		data['y'] = y;
		calliOSFunction('open_file', data);
	}

	
	this.send = function(data)
	{
		data['user'] = xclm.userId;
		data['presentation'] = xclm.config.presentationName;
//		var res = JSON.stringify(data);
		calliOSFunction('data_send', data);
//		console.log(JSON.stringify().length);
	}
	
	this.getUserId = function()
	{
		calliOSFunction('get_user_id', [], function(ret) 
		{
			var res = jQuery.parseJSON(ret.result);
			xclm.userId = res[0];
		});
	}
	
	this.getUserFIO = function()
	{
		calliOSFunction('get_user_fio', [], function(ret) 
		{
			var res = jQuery.parseJSON(ret.result);
			xclm.userFio = res[0];
		});
	}	
	
	this.getBufferSize = function()
	{
		calliOSFunction('get_buffer_size', [], function(ret) 
		{
			res = jQuery.parseJSON(ret.result);
			xclm.app.bufferSize = res;
		});
	}
	
	this.isInternetAvailable = function()
	{
		calliOSFunction('test_internet_connection', [], function(ret) 
		{
			res = jQuery.parseJSON(ret.result);
			xclm.app.internet = res;
		});
	}

	this.sendMail = function(formname, to, data)
	{
/*		data['event'] = 'email';
		data['to'] = to;
		data['formname'] = formname;
		calliOSFunction('data_send', data);*/
	}
	
	this.exit = function()
	{
		calliOSFunction('exit', []);
	}
	
}

import io from 'socket.io';
import moment from 'moment';

export function conf(io: io.Server) {
	const home = io.of('/home');
	
	home.on('connection', (socket: io.Socket) => {
		let now = moment();
		
		socket.on('notify', (data) => {
			let t = moment().subtract(5, 'seconds');
			
			if (t < now) {
				return socket.emit('err', {
					message: `wait ${now.diff(t, 'seconds')} more seconds <3`,
					error: 'too fast!',
				});
			}
			
			now = moment();
			
			const name = data?.name?.trim();
			const message = data?.message?.trim();
			
			if (!name || name.length == 0) {
				return socket.emit('err', {
					message: 'no name given! ;w;',
					error: 'global notif error',
				});
			} else if (!message || message.length == 0 ) {
				return socket.emit('err', {
					message: 'nyo message given ;-;',
					error: 'global notif error',
				});
			}
			
			home.emit('notify', { name, message });
		});
	});
}
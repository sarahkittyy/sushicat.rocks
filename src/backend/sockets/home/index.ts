import io from 'socket.io';
import moment from 'moment';

import verifyRecaptcha from '../../util/verifyRecaptcha';

export function conf(io: io.Server) {
	const home = io.of('/home');
	
	let onlineCT = 0;
	
	home.on('connection', (socket: io.Socket) => {
		let now = moment();

		onlineCT++;
		home.emit('peopleCount', { people: onlineCT });
		socket.on('disconnect', () => {
			onlineCT--;
			
			home.emit('peopleCount', { people: onlineCT });
		});
		
		socket.on('notify', async (data) => {
			let t = moment().subtract(5, 'seconds');
			
			if (t < now) {
				return socket.emit('err', {
					message: `wait ${now.diff(t, 'seconds')} more seconds <3`,
					error: 'too fast!',
				});
			}
			
			now = moment();

      // captcha check
      if (!data?.response) {
        return socket.emit('err', {
          message: 'you must solve the captcha',
          error: 'captcha error',
        });
      } else {
        const resp = await verifyRecaptcha(data.response);
        if (!resp.success) {
          return socket.emit('err', {
            message: 'captcha check failed',
            error: 'captcha error',
          });
        }
      }
			
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
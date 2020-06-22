import io from 'socket.io';

export function conf(io: io.Server) {
	const nyoom = io.of('/nyoom');
	
	nyoom.on('connection', (socket) => {
		console.log(`new nyoom connection: ${socket.id}`);
		
		socket.on('disconnect', (reason) => {
			console.log(`${socket.id} disconnect for reason ${reason}`);
		});
	});
}
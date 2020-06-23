import io from 'socket.io';

import { World } from './sim';

export function conf(io: io.Server) {
	const nyoom = io.of('/nyoom');
	
	new World(nyoom);
}
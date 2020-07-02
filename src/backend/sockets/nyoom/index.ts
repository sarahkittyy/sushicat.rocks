import io from 'socket.io';
import { performance } from 'perf_hooks';

import { World } from './sim';

export function conf(io: io.Server) {
	const nyoom = io.of('/nyoom');
	
	let world = new World(nyoom);
	
	let t = performance.now();
	
	setInterval(() => {
		let dt = (performance.now() - t) / 1000;
		t = performance.now();
		
		world.update(dt);
	}, 16.6666);
}
import io from 'socket.io';

import { conf as nyoomConf } from './nyoom';

export function ioConfig(io: io.Server) {
	nyoomConf(io);
}
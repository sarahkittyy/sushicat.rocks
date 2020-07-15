import io from 'socket.io';

import { conf as nyoomConf } from './nyoom';
import { conf as homeConf } from './home';

export function ioConfig(io: io.Server) {
	nyoomConf(io);
	homeConf(io);
}
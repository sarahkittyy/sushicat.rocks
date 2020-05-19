import { Arf } from '../db/models/Arf';

async function incArf() {
	return await Arf.inc();
}

async function getArfs() {
	return await Arf.get();
}

export { incArf, getArfs };
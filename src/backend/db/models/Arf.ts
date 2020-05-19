import mongoose from 'mongoose';

interface IArfSchema extends mongoose.Document {
	arfs: number;
}

interface IArf extends IArfSchema {
}

interface IArfModel extends mongoose.Model<IArf> {
	inc(): Promise<number>;
	get(): Promise<number>;
}

const ArfSchema = new mongoose.Schema({
	arfs: {
		type: Number,
		required: true,
	},
});

ArfSchema.static('inc', async function(): Promise<number> {
	let arf = await Arf.findOne();
	if (!arf) {
		arf = new Arf({
			arfs: 1,
		});
	} else {
		arf.arfs++;
	}

	arf.save();
	return arf.arfs;
});

ArfSchema.static('get', async function(): Promise<number> {
	let arf = await Arf.findOne();
	if (!arf) {
		arf = new Arf({
			arfs: 0,
		});
		arf.save();
	}
	return arf.arfs;
});

const Arf = mongoose.model<IArf, IArfModel>('Arf', ArfSchema);

export { ArfSchema, Arf };
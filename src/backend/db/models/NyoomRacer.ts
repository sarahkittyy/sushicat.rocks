import mongoose from 'mongoose';

interface INyoomRacerSchema extends mongoose.Document {
	name: string;
	laps: number;
	created_at: Date;
	updated_at: Date;
}

interface INyoomRacer extends INyoomRacerSchema {
}

interface INyoomRacerModel extends mongoose.Model<INyoomRacer> {
	lap(name: string): Promise<number>;
}

const NyoomRacerSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	laps: {
		type: Number,
		default: 0,
	},
}, { timestamps: true });

NyoomRacerSchema.static('lap', async function (name: string) {
  // @ts-ignore
	let res = await this.findOneAndUpdate({ name }, { $inc: { laps: 1 }}, { upsert: true, new: true }).select('laps').lean();
	return res.laps;
});

const NyoomRacer = mongoose.model<INyoomRacer, INyoomRacerModel>('NyoomRacer', NyoomRacerSchema);

export { NyoomRacerSchema, NyoomRacer };


import mongoose from 'mongoose';

interface IIsaacBonkSchema extends mongoose.Document {
	bonks: number;
}

interface IIsaacBonk extends IIsaacBonkSchema {

}

interface IIsaacBonkModel extends mongoose.Model<IIsaacBonk> {
	do(x: number): Promise<number>;
}

const IsaacBonkSchema = new mongoose.Schema({
	bonks: {
		type: Number,
		default: 0,
	},
});

IsaacBonkSchema.static('do', async function(x: number): Promise<number> {
	let bc = await IsaacBonk.findOne();
	if (!bc) {
		bc = new IsaacBonk({
			bonks: x,
		});
	} else {
		bc.bonks += x;
	}
	bc.save();
	return bc.bonks;
});

const IsaacBonk = mongoose.model<IIsaacBonk, IIsaacBonkModel>('IsaacBonk', IsaacBonkSchema);

export { IsaacBonk, IsaacBonkSchema };

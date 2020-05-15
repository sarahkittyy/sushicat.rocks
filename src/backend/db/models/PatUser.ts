import mongoose from 'mongoose';

interface IPatUserSchema extends mongoose.Document {
	name: string;
	pats: number;
	created_at: Date;
	updated_at: Date;
}

interface IPatUser extends IPatUserSchema {
}

interface IPatUserModel extends mongoose.Model<IPatUser> {
	patOnce(name: string): Promise<{name: string, pats: number}>;
	getPats(name: string): Promise<number | undefined>;
	allUsers(): Promise<{name: string, pats: number}[]>;
}

const PatUserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	pats: {
		type: Number,
		default: 0,
	},
}, { timestamps: true });


PatUserSchema.static('patOnce', async function(name: string) {
	return await this.findOneAndUpdate({ name }, { $inc: { pats: 1 }}, { upsert: true, new: true, lean: true, }).select('name pats');
});

PatUserSchema.static('getPats', async function(name: string) {
	let res = await this.findOne({ name }, 'pats');
	return res?.pats;
});

PatUserSchema.static('allUsers', async function() {
	return await this.find().select('name pats').lean();
});

const PatUser = mongoose.model<IPatUser, IPatUserModel>('PatUser', PatUserSchema);

export { PatUserSchema, PatUser };
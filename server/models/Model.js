var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = mongoose.Schema({
	firstName		:String,
	lastName		:String,
	email			:String,
	password		:String,
	bday			:String,
	empire_id		:{ type: Schema.Types.ObjectId, ref: "Empire" }
})
mongoose.model('User', UserSchema);

var EmpireSchema = mongoose.Schema({
	power			:Number,
	name 			:String,
	worker			:Number,
	infantry		:Number,
	archer			:Number,
	knight			:Number,
	warrior			:Number,
	calvary			:Number,
	hero			:Number,
	gold			:Number,
	user_name		:String,
	date			:String,
	click			:Number
})
mongoose.model('Empire', EmpireSchema);
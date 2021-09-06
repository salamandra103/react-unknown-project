const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const { Schema } = mongoose;

const userSchema = new Schema({
	email: {
		type: String,
		required: [true, "Пожалуйста введите почту"],
		unique: true,
		index: true,
		lowercase: true,
		validate: [isEmail, "Введите валидное значение почты"],
	},
	password: {
		type: String,
		required: [true, "Пожалуйста введите пароль"],
		minlength: [4, "Минимальная длинна пароля 4 символа"],
	},
	refreshToken: {
		type: String,
	},
});

userSchema.pre("save", async function(next) {
	try {
		const salt = await bcrypt.genSalt();
		this.password = await bcrypt.hash(this.password, salt);
		next();
	} catch (err) {
		console.error(err);
	}
});

userSchema.statics.login = async function(email, password) {
	try {
		const user = await this.findOne({ email });
		if (user) {
			const auth = await bcrypt.compare(password, user.password);
			if (auth) {
				return user;
			}
			throw Error("invalide password");
		}
		throw Error("invalide email");
	} catch (err) {
		console.error(err);
	}
};

module.exports = mongoose.model("user", userSchema);

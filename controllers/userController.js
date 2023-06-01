import User from "../models/userModels.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: "email not found" });

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(404).json({ message: "Incorrect Password" });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.SECRET_KEY
    );
    const { password, isAdmin, ...otherDetails } = user._doc;
    res.cookie("access_token", token, {
      httpOnly: true,
    });
    res.status(200).json({ ...otherDetails, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const del = await User.findByIdAndDelete(req.params.id);
    if (!del) {
      res.status(404).json({ message: "User Not Found" });
    }
    res.status(200).json("User has been deleted.");
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getAllUser = async (req,res,next)=>{
  try {
    const users = await User.find({role:"user"});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
}

export const getUserById = async (req,res,next)=>{
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
}

export const updateUser = async (req, res, next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ message: "User Updated Successfully" }, updateUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export function logout(req, res, next) {
  try {
    res.clearCookie("access_token");
    return res.status(200).send("logged out");
  } catch (err) {
    res.send(err.message);
  }
}

export const getBookedSections = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate("bookedSections");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ bookedSections: user.bookedSections });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching booked sections", error });
  }
};

// check if the user has a token and is logged in
export function isLoggedIn(req, res, next) {
	let token = req.headers['access_token'] || req.cookies["access_token"];
	// let token = req.cookies["auth_token"];
	if (!token) {
		return res.status(403).json({ success: false, message: 'no no no ' });
	} else {
		try {
			const decoded = jwt.verify(token, process.env.SECRET_KEY);
			res.status(200).json({ success: true, message: decoded });
		} catch (err) {
			return res.status(401).send('Invalid Token');
		}
	}
}


// add a new admin
export async function addAdmin(req, res, next) {
	try {
		let { username, phone, email, password } = req.body;
		if (!((email && password) || (phone && password))) {
			return res.status(400).json({
				success: false,
				message: 'Either phone or email is required for registration',
			});
		}
		req.body.role = 'admin';
		let doc = new User(req.body);
		if (!(username && password)) {
			return res
				.status(400)
				.json({ success: false, message: 'All inputs are required' });
		}
		if (req.file) {
			doc.image = req.file.path;
		}
		await User.create(doc)
			.then((response) => {
				if (response) {
					const token = jwt.sign(
						{
							user_id: response._id,
							username,
							phone,
							email,
							role: doc.role,
						},
						process.env.SECRET_KEY,
						{ expiresIn: '5h' },
					);
					response.password = undefined;
					// res.cookie("auth_token", token, { maxAge: 5 * 60 * 60 * 1000 });
					res.status(200).json({ success: true, response, token });
				}
			})
			.catch((err) => {
				console.log(err);

				return err.code === 11000
					? res.status(404).json({
							sucess: false,
							err: 'Email or Phone already in use',
					  })
					: res.status(404).json({ sucess: false, err });
			});
	} catch (err) {
		return next(err);
	}
}

export const getAllAdmin = async (req,res,next)=>{
  try {
    const users = await User.find({role:"admin"});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({message: "shu fa "});
  }
}
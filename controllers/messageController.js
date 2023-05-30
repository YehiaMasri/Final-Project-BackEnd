import Model from '../models/messageModel.js';

export const getAllMessages = async (req, res) => {
	try {
		await Model.find({}).then((response) => {
			if (!response) {
				return res.json({
					success: false,
					message: 'No messages Found !',
				});
			}
			return res.json({ success: true, message: response });
		});
	} catch (error) {
		res.status(404).json({ error: error.message });
		console.log(error);
	}
};
export const addNewMessage = (req, res) => {
	try {
		Model.create(req.body).then((response) => {
			if (response) {
				res.json({ success: true, message: response });
			} else {
				res.json({ success: true, message: response });
			}
		});
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({ success: true, message: error.message });
	}
};

export const deleteMessage = async (req, res) => {
	try {
		const id = req.params.id;
		const message = await Model.findByIdAndDelete({ _id: id }).then(
			(res) => {
				if (res) {
					return res.json({ success: true, message: res });
				} else {
					return res
						.status(404)
						.json({ success: true, message: res });
				}
			},
		);
	} catch (error) {
		console.log(error);
		res.json({ error: error });
	}
};
// export { getAllMessages, deleteMessage, addNewMessage };

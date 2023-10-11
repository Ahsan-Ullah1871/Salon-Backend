import bcrypt from "bcrypt";
import config from "../config";

const encrypt_password = async (password: string): Promise<string> => {
	return await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));
};

const match_password = async (
	given_password: string,
	saved_password: string
): Promise<boolean> => {
	return await bcrypt.compare(given_password, saved_password);
};

export const hashingHelper = {
	encrypt_password,
	match_password,
};


import bcrypt from 'bcryptjs';

const saltRounds = 10;

const hashPassword = async (password) => {
    return await bcrypt.hash(password, saltRounds);
};

export default hashPassword;
import { Response } from '../../helpers';

const register = async (req, res) => {
    const data = 'fd';
    console.log(data);
    res.status(200).json(new Response('it works', data));
};

const login = async (req, res) => {
    res.status(200).json('login successful');
};

export { register, login };
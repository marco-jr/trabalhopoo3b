/* eslint-disable import/no-extraneous-dependencies */
import { Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import User from '../entity/User';

class UserController {
  async index(_req: any, res: Response) {
    const userRepository = getRepository(User);
    const existUser = await userRepository.find();
    return res.json(existUser);
  }

  async view(_req: any, _res: Response) {
    // to do
  }

  async store(req: any, res: Response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required('Password is required'),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const { email, password } = req.body;

    const userRepository = getRepository(User);

    const userExist = await userRepository.findOne({ where: { email } });

    if (userExist) {
      return res.status(401).json({ error: 'Email already exist' });
    }

    const createUser = await userRepository.create({
      email,
      password,
    });

    await userRepository.save(createUser);
    return res.json({ data: createUser });
  }
}

export default new UserController();

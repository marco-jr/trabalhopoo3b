import { Response } from 'express';
import { getRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import User from '../entity/User';

class AuthController {
  async store(req: any, res: Response) {
    const userRepository = getRepository(User);
    const { email, password } = req.body;
    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: 'Email is not found' });
    }

    const validPass = await bcrypt.compare(password, user.password);
    // return res.json(validPass);
    if (!validPass) {
      return res.status(401).json({ error: 'Invalid Password' });
    }

    // Create and assign a token
    try {
      const token = jwt.sign({}, process.env.TOKEN_SECRET, {
        expiresIn: '7d',
      });
      // console.log(token);

      delete user.password;
      delete user.created_at;
      delete user.updated_at;
      delete user.deleted_at;

      return res.json({ user, token });
    } catch (error) {
      return res.status(401).send('Login inválido!');
    }
  }
}

export default new AuthController();

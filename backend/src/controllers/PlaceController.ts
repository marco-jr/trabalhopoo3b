import { Response } from 'express';
import { getRepository } from 'typeorm';

// import * as Yup from 'yup';
import Events from '../entity/Events';

class PlaceController {
  async upload(req: any, res: Response) {
    try {
      return res.json(req.file);
    } catch (error) {
      console.log(error);
    }
  }

  async store(req: any, res: Response) {
    const { name, description, location, userId } = req.body;
    const { picture } = req.body;
    const teste = picture.replace('public', '');

    const placeRepostory = getRepository(Events);

    try {
      const createUser = await placeRepostory.create({
        name,
        description,
        location,
        userId,
        picture: teste,
      });

      await placeRepostory.save(createUser);
      return res.json({ data: createUser });
    } catch (error) {
      return res.status(401).json({ error: 'Error Interno' });
    }
  }

  async index(req: any, res: Response) {
    const placeRepostory = getRepository(Events);
    const existEvents = await placeRepostory.find({
      order: { created_at: 'ASC' },
    });
    return res.json(existEvents);
  }

  async delete(req: any, res: Response) {
    const { id } = req.params;

    const placeRepostory = getRepository(Events);
    const existEvents = await placeRepostory.findOne({ where: { id } });

    if (existEvents) {
      await placeRepostory.remove(existEvents);
    }

    return res.json();
  }
}

export default new PlaceController();

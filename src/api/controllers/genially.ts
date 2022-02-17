import { Response, Request } from "express";
import { GeniallyPresenter } from "../../contexts/core/genially/adapters/GeniallyPresenter";
import CreateGeniallyService from "../../contexts/core/genially/application/CreateGeniallyService";
import DeleteGeniallyService from "../../contexts/core/genially/application/DeleteGeniallyService";
import GeniallyNotCreate from "../../contexts/core/genially/domain/GeniallyNotCreate";
import GeniallyNotExist from "../../contexts/core/genially/domain/GeniallyNotExist";
import InMemoryGeniallyRepository from "../../contexts/core/genially/infrastructure/InMemoryGeniallyRepository";

// In memory repository
export const repository = new InMemoryGeniallyRepository();

export const create = async (req: Request, res: Response) => {
  const service = new CreateGeniallyService(repository);

  try {
    const genially = await service.execute(req.body);

    res.status(201).send(new GeniallyPresenter(genially).toJSON());
  } catch (e) {
    if (e instanceof GeniallyNotCreate) {
      return res.status(400).send({
        message: e.message,
      });
    }

    return res.status(500).send();
  }
};

export const remove = async (req: Request, res: Response) => {
  const service = new DeleteGeniallyService(repository);

  try {
    await service.execute(req.params.geniallyId);

    return res.status(204).send();
  } catch (e) {
    if (e instanceof GeniallyNotExist) {
      return res.status(404).send({
        message: e.message,
      });
    }
  }
};

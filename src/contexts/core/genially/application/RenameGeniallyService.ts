import Genially from "../domain/Genially";
import GeniallyNotExist from "../domain/GeniallyNotExist";
import GeniallyRepository from "../domain/GeniallyRepository";

type RenameGeniallyServiceRequest = {
  id: Genially["id"];
  name: Genially["name"];
};

export default class RenameGeniallyService {
  public constructor(private repository: GeniallyRepository) {}

  public async execute(
    request: RenameGeniallyServiceRequest
  ): Promise<Genially> {
    const genially = await this.repository.find(request.id);

    if (!genially) {
      throw new GeniallyNotExist(request.id);
    }

    genially.name = request.name;
    await this.repository.save(genially);

    return genially;
  }
}

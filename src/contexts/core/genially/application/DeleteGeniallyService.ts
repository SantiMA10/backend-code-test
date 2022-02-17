import Genially from "../domain/Genially";
import GeniallyNotExist from "../domain/GeniallyNotExist";
import GeniallyRepository from "../domain/GeniallyRepository";

export default class DeleteGeniallyService {
  public constructor(private geniallyRepository: GeniallyRepository) {}

  public async execute(id: Genially["id"]): Promise<void> {
    const genially = this.geniallyRepository.find(id);

    if (!genially) {
      throw new GeniallyNotExist(id);
    }

    await this.geniallyRepository.delete(id);

    return undefined;
  }
}

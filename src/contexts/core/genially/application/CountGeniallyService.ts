import GeniallyRepository from "../domain/GeniallyRepository";

export default class CountGeniallyService {
  constructor(private repository: GeniallyRepository) {}

  public async execute(): Promise<number> {
    const count = await this.repository.count();

    return count;
  }
}

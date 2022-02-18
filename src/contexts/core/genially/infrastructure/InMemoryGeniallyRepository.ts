import Genially from "../domain/Genially";
import GeniallyRepository from "../domain/GeniallyRepository";

type Repository = GeniallyRepository;
export default class InMemoryGeniallyRepository implements Repository {
  private geniallys: Genially[];

  public constructor() {
    this.geniallys = [];
  }

  public save: Repository["save"] = async (genially: Genially) => {
    await this.delete(genially.id);

    this.geniallys.push(genially);
  };

  public find: Repository["find"] = async (id, options) => {
    if (options?.includeSoftDeletes) {
      return this.geniallys.find((genially) => genially.id === id);
    }

    return this.geniallys.find(
      (genially) => genially.id === id && !genially.isDeleted()
    );
  };

  public delete: Repository["delete"] = async (id: string) => {
    const genially = this.geniallys.find(
      (genially) => genially.id === id && !genially.isDeleted()
    );

    genially?.delete();
  };

  public clear() {
    this.geniallys = [];
  }
}

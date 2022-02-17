import Genially from "./Genially";

interface GeniallyRepository {
  save(genially: Genially): Promise<void>;

  find(
    id: string,
    options?: { includeSoftDeletes: boolean }
  ): Promise<Genially>;

  delete(id: string): Promise<void>;
}

export default GeniallyRepository;

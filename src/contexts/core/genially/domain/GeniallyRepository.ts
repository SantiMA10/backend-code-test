import Genially from "./Genially";

interface GeniallyRepository {
  save(genially: Genially): Promise<void>;

  find(
    id: string,
    options?: { includeSoftDeletes: boolean }
  ): Promise<Genially | undefined>;

  delete(id: string): Promise<void>;

  count(): Promise<number>;
}

export default GeniallyRepository;

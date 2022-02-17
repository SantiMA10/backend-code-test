import Genially from "../../../../../../src/contexts/core/genially/domain/Genially";
import InMemoryGeniallyRepository from "../../../../../../src/contexts/core/genially/infrastructure/InMemoryGeniallyRepository";

describe("InMemoryGeniallyRepository", () => {
  describe("#save", () => {
    it("saves the genially in memory", async () => {
      const subject = new InMemoryGeniallyRepository();
      const genially = new Genially("id", "name", "description");

      await subject.save(genially);

      expect(await subject.find(genially.id)).not.toBeUndefined();
    });

    it("overrides other genially with the same id", async () => {
      const subject = new InMemoryGeniallyRepository();
      const initialGenially = new Genially("id", "initial", "description");
      const finalGenially = new Genially("id", "final", "description");

      await subject.save(initialGenially);
      await subject.save(finalGenially);

      expect(await subject.find(finalGenially.id)).toMatchObject({
        name: "final",
      });
    });
  });

  describe("#delete", () => {
    it("deletes the genially", async () => {
      const subject = new InMemoryGeniallyRepository();
      const genially = new Genially("id", "name", "description");
      await subject.save(genially);

      await subject.delete(genially.id);

      expect(
        await subject.find(genially.id, { includeSoftDeletes: true })
      ).not.toBeUndefined();
      expect(await subject.find(genially.id)).toBeUndefined();
    });
  });
});

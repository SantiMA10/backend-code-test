import Genially from "../../../../../../src/contexts/core/genially/domain/Genially";
import GeniallyNotCreate from "../../../../../../src/contexts/core/genially/domain/GeniallyNotCreate";
import GeniallyNotUpdate from "../../../../../../src/contexts/core/genially/domain/GeniallyNotUpdate";

describe("Genially", () => {
  describe("#constructor", () => {
    it("throws an error if the genially has a name with less than 3 characters", async () => {
      const shortName = new Array(2).fill("a").join("");

      expect(() => new Genially("id", shortName)).toThrow(
        new GeniallyNotCreate(
          `Genially cannot be created with name: ${shortName} (less than 3 characters)`
        )
      );
    });

    it("throws an error if the genially has a name with more than 20 characters", async () => {
      const longName = new Array(21).fill("a").join("");

      expect(() => new Genially("id", longName)).toThrow(
        new GeniallyNotCreate(
          `Genially cannot be created with name: ${longName} (more than 20 characters)`
        )
      );
    });

    it("throws an error if the genially has a description with more than 125 characters", async () => {
      const longDescription = new Array(126).fill("a").join("");

      expect(() => new Genially("id", "name", longDescription)).toThrow(
        new GeniallyNotCreate(
          `Genially cannot be created with description: ${longDescription} (more than 125 characters)`
        )
      );
    });
  });

  describe("#delete", () => {
    it("sets the current date in the 'deletedAt'", async () => {
      const subject = new Genially("id", "name", "description");

      subject.delete();

      expect(subject.deletedAt).toBeInstanceOf(Date);
    });
  });

  describe("#isDeleted", () => {
    it("returns false if there is no 'deletedAt' date", async () => {
      const subject = new Genially("id", "name", "description");

      expect(subject.isDeleted()).toBe(false);
    });

    it("returns true if there is a 'deletedAt' date", async () => {
      const subject = new Genially("id", "name", "description");

      subject.delete();

      expect(subject.isDeleted()).toBe(true);
    });
  });

  describe("rename", () => {
    it("throws an error if the name has less than 3 characters", async () => {
      const subject = new Genially("id", "name", "description");
      const shortName = new Array(2).fill("a").join("");

      expect(() => {
        subject.name = shortName;
      }).toThrow(
        new GeniallyNotUpdate(
          `Genially cannot be updated with name: ${shortName} (less than 3 characters)`
        )
      );
    });

    it("throws an error if the name has more than 125 characters", async () => {
      const subject = new Genially("id", "name", "description");
      const longName = new Array(126).fill("a").join("");

      expect(() => {
        subject.name = longName;
      }).toThrow(
        new GeniallyNotUpdate(
          `Genially cannot be updated with name: ${longName} (more than 125 characters)`
        )
      );
    });

    it("updates the name and the modifiedAt date", async () => {
      const subject = new Genially("id", "name", "description");

      subject.name = "new name";

      expect(subject.name).toBe("new name");
      expect(subject.modifiedAt).toBeInstanceOf(Date);
    });
  });
});

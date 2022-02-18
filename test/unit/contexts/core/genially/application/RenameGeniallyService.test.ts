import { anything, instance, mock, verify, when } from "ts-mockito";
import RenameGeniallyService from "../../../../../../src/contexts/core/genially/application/RenameGeniallyService";
import Genially from "../../../../../../src/contexts/core/genially/domain/Genially";
import GeniallyNotExist from "../../../../../../src/contexts/core/genially/domain/GeniallyNotExist";
import GeniallyNotUpdate from "../../../../../../src/contexts/core/genially/domain/GeniallyNotUpdate";
import GeniallyRepository from "../../../../../../src/contexts/core/genially/domain/GeniallyRepository";

describe("RenameGeniallyService", () => {
  let mockedRepository: GeniallyRepository;
  let subject: RenameGeniallyService;

  beforeEach(() => {
    mockedRepository = mock<GeniallyRepository>();
    subject = new RenameGeniallyService(instance(mockedRepository));
  });

  it("throws a 'GeniallyNotExist' error if the genially does not exist in the db", async () => {
    when(mockedRepository.find("id")).thenReturn(Promise.resolve(undefined));

    await expect(subject.execute({ id: "id", name: "name" })).rejects.toThrow(
      GeniallyNotExist
    );
  });

  it("uses the save method in the 'GeniallyRepository'", async () => {
    when(mockedRepository.find("id")).thenReturn(
      Promise.resolve(new Genially("id", "name"))
    );

    await subject.execute({ id: "id", name: "newName" });

    verify(mockedRepository.save(anything())).called();
  });

  it("returns the genially with the new name", async () => {
    when(mockedRepository.find("id")).thenReturn(
      Promise.resolve(new Genially("id", "name"))
    );

    const genially = await subject.execute({ id: "id", name: "newName" });

    expect(genially.name).toBe("newName");
  });

  it("throws a 'GeniallyNotUpdate' error if the new name does not follow the validation rules", async () => {
    when(mockedRepository.find("id")).thenReturn(
      Promise.resolve(new Genially("id", "name"))
    );

    await expect(subject.execute({ id: "id", name: "na" })).rejects.toThrow(
      GeniallyNotUpdate
    );
  });
});

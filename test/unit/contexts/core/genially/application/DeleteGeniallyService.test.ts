import { instance, mock, verify, when } from "ts-mockito";
import DeleteGeniallyService from "../../../../../../src/contexts/core/genially/application/DeleteGeniallyService";
import Genially from "../../../../../../src/contexts/core/genially/domain/Genially";
import GeniallyNotExist from "../../../../../../src/contexts/core/genially/domain/GeniallyNotExist";
import GeniallyRepository from "../../../../../../src/contexts/core/genially/domain/GeniallyRepository";

describe("DeleteGenially", () => {
  let mockedRepository: GeniallyRepository;
  let subject: DeleteGeniallyService;

  beforeEach(() => {
    mockedRepository = mock<GeniallyRepository>();
    subject = new DeleteGeniallyService(instance(mockedRepository));
  });

  it("throws a 'GeniallyNotExist' error if the genially does not exist in the db", async () => {
    when(mockedRepository.find("id")).thenReturn(Promise.resolve(undefined));

    await expect(subject.execute("id")).rejects.toThrow(GeniallyNotExist);
  });

  it("uses the delete method in the 'GeniallyRepository'", async () => {
    when(mockedRepository.find("id")).thenReturn(
      Promise.resolve(new Genially("id", "name"))
    );

    await subject.execute("id");

    verify(mockedRepository.delete("id")).called();
  });
});

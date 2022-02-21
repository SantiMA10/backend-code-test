import { instance, mock, when } from "ts-mockito";
import CountGeniallyService from "../../../../../../src/contexts/core/genially/application/CountGeniallyService";
import GeniallyRepository from "../../../../../../src/contexts/core/genially/domain/GeniallyRepository";

describe("CountGeniallyService", () => {
  let subject: CountGeniallyService;
  let mockedGeniallyRepository: GeniallyRepository;

  beforeEach(() => {
    mockedGeniallyRepository = mock<GeniallyRepository>();
    subject = new CountGeniallyService(instance(mockedGeniallyRepository));
  });

  it("returns the number of genially", async () => {
    when(mockedGeniallyRepository.count()).thenResolve(1);

    const count = await subject.execute();

    expect(count).toBe(1);
  });
});

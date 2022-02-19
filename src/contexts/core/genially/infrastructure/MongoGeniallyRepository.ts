import { PrismaClient, Prisma } from "@prisma/client";
import Genially from "../domain/Genially";
import GeniallyRepository from "../domain/GeniallyRepository";

type Repository = GeniallyRepository;

export class MongoGeniallyRepository implements GeniallyRepository {
  private prisma: Prisma.GeniallyDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;

  public constructor() {
    this.prisma = new PrismaClient().genially;
  }

  public save: Repository["save"] = async (genially: Genially) => {
    await this.prisma.upsert({
      where: {
        id: genially.id,
      },
      update: {
        name: genially.name,
        description: genially.description,
        createdAt: genially.createdAt,
        deletedAt: genially.deletedAt,
        modifiedAt: genially.modifiedAt,
      },
      create: {
        id: genially.id,
        name: genially.name,
        description: genially.description,
        createdAt: genially.createdAt,
        deletedAt: genially.deletedAt,
        modifiedAt: genially.modifiedAt,
      },
    });
  };

  public find: Repository["find"] = async (id, options) => {
    const geniallyDb = await this.prisma.findFirst({ where: { id } });

    if (!geniallyDb) {
      return;
    }

    const genially = new Genially(
      geniallyDb.id,
      geniallyDb.name,
      geniallyDb.description || undefined,
      geniallyDb.createdAt,
      geniallyDb.modifiedAt || undefined,
      geniallyDb.deletedAt || undefined
    );

    if (!options?.includeSoftDeletes && genially.isDeleted()) {
      return undefined;
    }

    return genially;
  };

  public delete: Repository["delete"] = async (id) => {
    const genially = await this.find(id);

    if (!genially) {
      return;
    }

    genially.delete();
    await this.save(genially);
  };
}

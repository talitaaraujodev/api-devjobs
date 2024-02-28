import { Profile } from '../../../application/domain/models/Profile';
import { ProfilePersistenceOutputPort } from '../../../application/ports/output/ProfileOutputPort';
import { prisma } from '../../../config/database/prisma';

export class ProfilePersistenceAdapter implements ProfilePersistenceOutputPort {
  async save(profile: Profile): Promise<Profile> {
    const profileSaved = await prisma.profile.create({
      data: {
        id: profile.id,
        birthDate: profile.birthDate,
        phone: profile.phone,
        cep: profile.cep,
        logradouro: profile.logradouro,
        number: profile.number,
        bairro: profile.bairro,
        statusCivil: profile.statusCivil,
        curriculumOriginalname: profile.curriculumOriginalname,
        curriculumFilename: profile.curriculumFilename,
        userId: profile.userId,
      },
    });
    return new Profile(
      profileSaved.id,
      profileSaved.birthDate,
      profileSaved.phone,
      profileSaved.cep,
      profileSaved.logradouro,
      profileSaved.number,
      profileSaved.bairro,
      profileSaved.statusCivil,
      profileSaved.curriculumOriginalname,
      profileSaved.curriculumFilename,
      profileSaved.userId,
    );
  }

  async findById(id: string): Promise<Profile | null> {
    const profile = (await prisma.profile.findUnique({
      where: { id },
    })) as Profile | null;

    return profile;
  }
  async findByUserid(userId: string): Promise<Profile | null> {
    const profile = (await prisma.profile.findUnique({
      where: { userId },
    })) as Profile | null;

    return profile;
  }
}

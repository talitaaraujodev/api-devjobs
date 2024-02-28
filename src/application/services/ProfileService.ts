import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';
import { Profile } from '../domain/models/Profile';
import { ProfilePersistenceOutputPort } from '../ports/output/ProfileOutputPort';
import { ProfileServiceInputPort } from '../ports/input/ProfileServiceInputPort';
import { NotFoundError } from '../../utils/errors/NotFoundError';
import { InjectionTokens } from '../../utils/types/InjectionTokens';
import { ProfileYupValidator } from '../../utils/validators/ProfileValidator';
import { BadRequestError } from '../../utils/errors/BadRequestError';

@injectable()
export class ProfileService implements ProfileServiceInputPort {
  constructor(
    @inject(InjectionTokens.PROFILE_PERSISTENCE_OUTPUT_PORT)
    private readonly profilePersistence: ProfilePersistenceOutputPort,
  ) {}

  async create(profile: Profile): Promise<Profile> {
    const profileValidate = ProfileYupValidator.validate(profile);
    if (profileValidate?.errors) {
      throw new BadRequestError('BadRequestError', profileValidate.errors);
    }

    const profileCreated = new Profile(
      uuid(),
      new Date(profile.birthDate),
      profile.phone,
      profile.cep,
      profile.logradouro,
      profile.number,
      profile.bairro,
      profile.statusCivil,
      profile.curriculumOriginalname,
      profile.curriculumFilename,
      profile.userId,
    );
    return await this.profilePersistence.save(profileCreated);
  }
  async findOne(id: string): Promise<Profile> {
    const profile = await this.profilePersistence.findById(id);
    if (!profile) {
      throw new NotFoundError('Profile não encontrada por id');
    }
    return profile;
  }
  async findByUserid(userId: string): Promise<Profile> {
    const profile = await this.profilePersistence.findByUserid(userId);
    if (!profile) {
      throw new NotFoundError('Profile não encontrada por userId');
    }
    return profile;
  }
}

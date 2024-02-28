import { NotFoundError } from '../../../utils/errors/NotFoundError';
import { Profile } from '../../domain/models/Profile';

export interface ProfileServiceInputPort {
  create(profile: Profile): Promise<Profile>;
  findOne(id: string): Promise<Profile>;
  findByUserid(id: string): Promise<Profile>;
}

import { Profile } from '../../domain/models/Profile';

export interface ProfilePersistenceOutputPort {
  save(profile: Profile): Promise<Profile>;
  findById(id: string): Promise<Profile | null>;
  findByUserid(userId: string): Promise<Profile | null>;
}

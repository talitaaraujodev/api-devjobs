export interface AuthServiceInputPort {
  auth(email: string, password: string): Promise<string>;
}

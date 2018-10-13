export class UserModel {
  name: string;
  email: string;
  role: string;
  token: string;

  constructor(name: string, email: string, role: string, token: string) {
    this.name = name;
    this.email = email;
    this.role = role;
    this.token = token;
  }
}

import User from 'App/Models/User'

export default class UsersController {
  constructor() {}

  public async create(username:string, name:string, email: string, password: string) {
   
    
    const user = await User.create({
      username,
      name,
      password,
      email,
    })
    
   
    return user
  }

  
}

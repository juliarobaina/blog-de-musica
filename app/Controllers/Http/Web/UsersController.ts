import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserService from 'App/Services/UserService'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import Hash from '@ioc:Adonis/Core/Hash'

export default class UsersController {
  public async create({ view }: HttpContextContract) {
   
    //return view.render('users/create')
  }

  /*public async login({view}: HttpContextContract){
    return view.render('users/login')

  }*/

  public async store({view, request, response }: HttpContextContract) {
   
    //const name = request.input('name', undefined)
    //const email = request.input('email', undefined)
    //const password = request.input('password', undefined)
    
    const payload = await request.validate(CreateUserValidator)
  
   /* if (!email || !password || !name) {
      response.status(400)
      return response
    }*/
    
    const userService = new UserService()
    const user = await userService.create(payload.username, payload.name, payload.email, payload.password)
    
    //pra pessoa logar automaticamente, logo depois de se cadastrar-> await auth.use('web').login(user)

    return response.redirect().toRoute('sessions.create')
    
    
    
   /* if (await Hash.verify(user.password, 'payload.password')) {
      console.log('são senhas iguais')
    }else{
      console.log('são senhas diferentes')
    }*/

  }

  public async show({ params, view }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    
    return view.render('users/show', { user: user })
  }

  public async update({params, view }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    

    return view.render('users/update', { user: user })
  }
  

  public async patch({ params, request, response }: HttpContextContract) {

    
   /* const payload = await request.validate(CreateUserValidator)
    
    
   
    user.email = payload.email ? payload.email : user.email
    user.name = payload.name ? payload.name : user.name
    user.username = payload.username ? payload.username : user.username*/
   
  
    //ver o validator
    const user = await User.findOrFail(params.id)
    const email = request.input('email', undefined)
    const name = request.input('name', undefined)
    const username = request.input('username', undefined)
    const password = request.input('password', undefined)

    if(password == undefined){
      user.email = email ? email : user.email
      user.name = name ? name : user.name
      user.username = username ? username : user.username
    }else{
      user.email = email ? email : user.email
      user.name = name ? name : user.name
      user.username = username ? username : user.username
      user.password = password
    }
    

    await user.save()

    return response.redirect().toRoute('users.update', { id: user.id })
  }

  public async index({ view }: HttpContextContract) {
    const users = await User.all()
    //const post = await Post.query().where('user_id',)
    return view.render('users/index', { users: users })
  }

 
}

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import PostService from 'App/Services/PostService'

export default class HomeController {

    public async index({ view }: HttpContextContract) {
        
        //const post = await Post.all()
       // Pega os 3 post mais recentes criados no BD para exibir na página inicial
        const post = await Post.query().orderBy('created_at', 'desc').limit(100)
        return view.render('home/show', {post:post})
    }

    public async create({ view }: HttpContextContract) {
   
        return view.render('users/create')
      }

   
    
}

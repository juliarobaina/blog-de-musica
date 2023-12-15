import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Post from 'App/Models/Post'
import PostService from 'App/Services/PostService'
import CreatePostValidator from 'App/Validators/CreatePostValidator'
import Database from '@ioc:Adonis/Lucid/Database'

export default class PostsController {
  public async create({ view }: HttpContextContract) {
   
    return view.render('posts/create')
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreatePostValidator)
    
    //TODO: Pegar o usuario logado
    const user = await User.findOrFail(payload.id)
    
    const postService = new PostService()
    const post = await postService.create(user, payload)
    
    return response.redirect().toRoute('posts.index', { id: post.id })
  }

  public async show({ params, view }: HttpContextContract) {//listar os posts de um usuário
    
    const post = await Post.query().where('user_id', params.id)
    //const post = await Post.findByOrFail('id_user', params.id)
   // console.log(post)

    //await post.load('user')
    
    
    return view.render('posts/show', { post: post })
  }

  public async update({}: HttpContextContract) {}

  public async patch({}: HttpContextContract) {}

  public async delete({params, response}: HttpContextContract) {//usuário só vai poder deletar posts na página suas músicas
    const post = await Post.findOrFail(params.id)
    
    await post.delete()

    return response.redirect().toRoute('posts.show', { id: post.userId })

  
  }

  public async index({auth,view, params}: HttpContextContract) {
   
    //await post.load('user')
    //console.log(auth.user)
    const post = await Post.findOrFail(params.id)
    await post.load('user')
    //console.log(post.createdAt)
    //const post = await Post.query().('user_id', params.id)

    return view.render('posts/index',{ post: post })
  }

  //like
  public async like({ params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    //console.log(params)
    const user = await User.findOrFail(params.user)
    
    //console.log(user) //já tá pegando o usuário que gostou do post x
    const service = new PostService()
    const liked = await service.like(user, post)
    
    
    return { id: post.id, liked: liked }
  }

  //favourites
  public async favourite({ params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    //console.log(params)
    const user = await User.findOrFail(params.user)
    
    //console.log(user) //já tá pegando o usuário que gostou do post x
    const service = new PostService()
    const liked = await service.favourite(user, post)
    
    
    return { id: post.id, liked: liked }
  }

  public async showFavourites({ params, view }: HttpContextContract) {//listar os posts que um usuário favoritou
    //console.log('Entrei no favoritos')
        
    //pega os posts que o usuário curtiu
    const user_posts_favourites = await Database.from('user_post_favourite as a').where('a.user_id', params.id).innerJoin('posts as b','b.id','a.post_id')
    //console.log(user_posts_favourites)
    
    return view.render('posts/favourites', { post: user_posts_favourites })
  }

  
}

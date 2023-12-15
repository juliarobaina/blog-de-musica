import User from 'App/Models/User'
import Post from 'App/Models/Post'

export default class UsersController {
  constructor() {}

  public async create(user: User, data: {
    title: string,
    content: string
  }) {
    const post = new Post()
    post.title = data.title
    post.content = data.content
    post.userId = user.id

    await post.save()

    return post
  }

  //like
  public async like(user: User, post: Post) {
    const liked = await post.liked(user)
    
    //console.log(user)
    if (liked) {
      await user.related('likedPosts').detach([post.id])
      
      return false
    } else {
      await user.related('likedPosts').attach([post.id])

      return true
    }
  }

  //favourite
  public async favourite(user: User, post: Post) {
    const favourite = await post.favouriteSymbol(user)
    
    //console.log(user)
    if (favourite) {
      await user.related('favouritesPosts').detach([post.id])
      
      return false
    } else {
      await user.related('favouritesPosts').attach([post.id])

      return true
    }
  }
}

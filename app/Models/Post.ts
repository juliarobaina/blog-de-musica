import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, ManyToMany,belongsTo, column,  manyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public content: string

  @column()
  public title: string

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
  //like
  @manyToMany(() => User, {
    pivotTable: 'user_post_like',
  })
  public likedUsers: ManyToMany<typeof User>

  //favourites
  //like
  @manyToMany(() => User, {
    pivotTable: 'user_post_favourite',
  })
  public favouritesUsers: ManyToMany<typeof User>

  public async liked(user: User) {
    //console.log("aqui começa")
    
    const post: Post = this
    await post.load('likedUsers')

    for await (const likedUser of post.likedUsers) {
    
      if (user.id === likedUser.id) {
        return true
      }
    }

    return false
  }

  public async favouriteSymbol(user: User) {
    //console.log("aqui começa")
    
    const post: Post = this
    await post.load('favouritesUsers')

    for await (const favouritesUser of post.favouritesUsers) {
    
      if (user.id === favouritesUser.id) {
        return true
      }
    }

    return false
  }


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateSessionValidator from 'App/Validators/CreateSessionValidator'

export default class SessionsController {
    public async create({ view }: HttpContextContract) {
        return view.render('sessions/create')//login
    }

    public async store({ auth, request, response }: HttpContextContract) {
        
        const payload = await request.validate(CreateSessionValidator)

        //const email = request.input('email', undefined)
        //const password = request.input('password', undefined)
    
       
        try {
            await auth.use('web').attempt(payload.email,payload.password)
            response.redirect().toRoute('home.index')
            
        } catch (error) {
            return response.redirect().toRoute('sessions.create')
            
            //return response.badRequest('Invalid')
        }
        
        
    }

    public async delete({ auth, view, request, response }: HttpContextContract) {
        await auth.use('web').logout()
        
        return response.redirect().toRoute('home.index')

        
        
    }
}

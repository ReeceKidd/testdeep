import { MiddlewareFn } from 'type-graphql'
import { MyContext } from '../types/MyContext'
import jwt from 'jsonwebtoken'

const APP_SECRET = process.env.SESSION_SECRET || 'aslkdfjio'

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const authorization = context.request.headers['authorization']
  try {
    const token = authorization?.replace('Bearer ', '')
    const user = jwt.verify(token!, APP_SECRET) as any
    context.response.locals.userId = user.id
    return next()
  } catch (err) {
    throw new Error(err.message)
  }
}
import { db } from './db'

import { Request, Response, NextFunction } from 'express'

const jwt = require('jsonwebtoken')

const getUserAllowedImages = async (user: any): Promise<string[]> => {
	const result = await db.raw(`SELECT * FROM permissions WHERE user_id = ${user } AND allowed = 'true'`)
	return result.map((e: any) => e.image_id as string)
}

const authenticateTheUser = (token: any): Promise<string> => {
  const parsed = jwt.decode(token)
  if (!parsed)
    throw new Error('Unauthorized')

  return parsed.sub
}

const authorize = async (req: Request, res: Response, next: NextFunction) => {
  var authHeader = req.headers["authentication"]
  if(!authHeader) {
    return res.status(404)
  }

  var token = authenticateTheUser(authHeader as string)
  if (!token) { return res.status(404) }

  var allowedIds = await getUserAllowedImages(req.params.user)
  for (var i = 0; i < allowedIds.length; i++) {
    if (allowedIds[i] == req.params.catName)
      return next()
  }

  return res.status(404)
}

export { authorize }

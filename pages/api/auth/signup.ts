import { NextApiResponse, NextApiRequest } from 'next'
import validator from 'validator'
import bcrypt from 'bcrypt'
import * as jose from 'jose'
import { setCookie } from 'cookies-next'
import { prisma } from '@/shared/constants'

interface requestBody {
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  password: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { firstName, lastName, email, phone, password, city }: requestBody =
      req.body
    const errors: string[] = []
    const validatorSchema = [
      {
        valid: validator.isLength(firstName, {
          min: 1,
          max: 20,
        }),
        errorMessage: 'First name is Invalid',
      },
      {
        valid: validator.isLength(lastName, {
          min: 1,
          max: 20,
        }),
        errorMessage: 'Last name is Invalid',
      },
      {
        valid: validator.isEmail(email),
        errorMessage: 'Email is Invalid',
      },
      {
        valid: validator.isMobilePhone(phone),
        errorMessage: 'Phone number is invalid is Invalid',
      },
      {
        valid: validator.isLength(city, {
          min: 1,
          max: 20,
        }),
        errorMessage: 'City is Invalid',
      },
      {
        valid: validator.isStrongPassword(password),
        errorMessage: 'Password is not strong enough',
      },
    ]

    validatorSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage)
      }
    })
    if (errors.length) {
      return res.status(400).json({ errorMessage: errors[0] })
    }
    const userWithEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })
    if (userWithEmail) {
      return res
        .status(400)
        .json({ errorMessage: 'Email is associated with another account' })
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        city: city,
        password: hashPassword,
      },
    })

    const algo = 'HS256'
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const token = await new jose.SignJWT({ email: user.email })
      .setProtectedHeader({
        alg: algo,
      })
      .setExpirationTime('24h')
      .sign(secret)
    setCookie('jwt', token, { req, res, maxAge: 60 * 6 * 24 })

    return res.status(200).json({
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      phone: user.phone,
      city: user.city,
    })
  }

  return res.status(404).json('Undefined endpoint')
}

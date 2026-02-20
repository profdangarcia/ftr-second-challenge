import { GraphQLError } from 'graphql'
import { prismaClient } from '../../prisma/prisma'
import { hashPassword, comparePassword } from '../utils/hash'
import { signJwt } from '../utils/jwt'
import type { RegisterInput, LoginInput, UpdateProfileInput } from '../dtos/input/auth.input'
import type { AuthOutput } from '../dtos/output/auth.output'
import type { UserModel } from '../models/user.model'

function toUserModel(user: {
  id: string
  name: string
  email: string
  createdAt: Date
  updatedAt: Date
}): UserModel {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  }
}

export async function register(data: RegisterInput): Promise<AuthOutput> {
  const existing = await prismaClient.user.findUnique({
    where: { email: data.email },
  })
  if (existing) {
    throw new GraphQLError('E-mail já cadastrado.', {
      extensions: { code: 'BAD_USER_INPUT' },
    })
  }
  const hashedPassword = await hashPassword(data.password)
  const user = await prismaClient.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
  })
  const token = signJwt({ id: user.id, email: user.email }, '7d')
  return {
    token,
    refreshToken: token,
    user: toUserModel(user),
  }
}

export async function login(data: LoginInput): Promise<AuthOutput> {
  const user = await prismaClient.user.findUnique({
    where: { email: data.email },
  })
  const passwordMatch = user ? await comparePassword(data.password, user.password) : false
  if (!user || !passwordMatch) {
    throw new GraphQLError('Credenciais inválidas.', {
      extensions: { code: 'UNAUTHENTICATED' },
    })
  }
  const token = signJwt({ id: user.id, email: user.email }, '7d')
  return {
    token,
    refreshToken: token,
    user: toUserModel(user),
  }
}

export async function updateProfile(userId: string, data: UpdateProfileInput): Promise<UserModel> {
  const user = await prismaClient.user.update({
    where: { id: userId },
    data: { name: data.name },
  })
  return toUserModel(user)
}

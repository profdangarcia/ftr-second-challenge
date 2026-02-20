import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../src/utils/hash'

const prisma = new PrismaClient()

const DEFAULT_USER = {
  email: 'usuario@financy.com',
  name: 'Usuário Padrão',
  passwordPlain: 'senha123',
}

const DEFAULT_CATEGORIES = [
  { title: 'Alimentação', description: 'Supermercado, restaurantes, delivery', icon: 'utensils', color: '#22c55e' },
  { title: 'Transporte', description: 'Combustível, Uber, ônibus', icon: 'car', color: '#3b82f6' },
  { title: 'Lazer', description: 'Cinema, streaming, passeios', icon: 'ticket', color: '#a855f7' },
  { title: 'Saúde', description: 'Farmácia, consultas, plano de saúde', icon: 'heart', color: '#ec4899' },
  { title: 'Casa', description: 'Contas, manutenção, decoração', icon: 'home', color: '#f97316' },
  { title: 'Educação', description: 'Cursos, livros, materiais', icon: 'book-open', color: '#eab308' },
]

async function main() {
  const hashedPassword = await hashPassword(DEFAULT_USER.passwordPlain)

  const user = await prisma.user.upsert({
    where: { email: DEFAULT_USER.email },
    update: { name: DEFAULT_USER.name, password: hashedPassword },
    create: {
      name: DEFAULT_USER.name,
      email: DEFAULT_USER.email,
      password: hashedPassword,
    },
  })

  for (const cat of DEFAULT_CATEGORIES) {
    const existing = await prisma.category.findFirst({
      where: { userId: user.id, title: cat.title },
    })
    if (!existing) {
      await prisma.category.create({
        data: {
          userId: user.id,
          title: cat.title,
          description: cat.description ?? null,
          icon: cat.icon,
          color: cat.color,
        },
      })
    }
  }

  console.log('Seed concluído: usuário', DEFAULT_USER.email, 'e categorias padrão.')
}

main()
  .catch((e) => {
    console.error('Erro ao executar seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

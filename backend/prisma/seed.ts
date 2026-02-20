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

/** Transações de exemplo: { categoryTitle, type, description, dateISO, valueCentavos } */
const DEFAULT_TRANSACTIONS = [
  { categoryTitle: 'Alimentação', type: 'EXPENSE' as const, description: 'Almoço no restaurante', dateISO: '2025-02-15T12:00:00.000Z', valueCentavos: 4500 },
  { categoryTitle: 'Transporte', type: 'EXPENSE' as const, description: 'Uber para o trabalho', dateISO: '2025-02-14T08:30:00.000Z', valueCentavos: 2850 },
  { categoryTitle: 'Casa', type: 'EXPENSE' as const, description: 'Conta de luz', dateISO: '2025-02-10T00:00:00.000Z', valueCentavos: 32000 },
  { categoryTitle: 'Lazer', type: 'EXPENSE' as const, description: 'Assinatura streaming', dateISO: '2025-02-01T00:00:00.000Z', valueCentavos: 5590 },
  { categoryTitle: 'Saúde', type: 'EXPENSE' as const, description: 'Farmácia', dateISO: '2025-02-12T18:00:00.000Z', valueCentavos: 8900 },
  { categoryTitle: 'Educação', type: 'EXPENSE' as const, description: 'Curso online', dateISO: '2025-01-28T00:00:00.000Z', valueCentavos: 19900 },
  { categoryTitle: 'Alimentação', type: 'EXPENSE' as const, description: 'Supermercado semanal', dateISO: '2025-02-08T10:00:00.000Z', valueCentavos: 18500 },
  { categoryTitle: 'Transporte', type: 'EXPENSE' as const, description: 'Combustível', dateISO: '2025-02-05T07:00:00.000Z', valueCentavos: 25000 },
  { categoryTitle: 'Alimentação', type: 'INCOME' as const, description: 'Vale-refeição', dateISO: '2025-02-01T00:00:00.000Z', valueCentavos: 80000 },
  { categoryTitle: 'Casa', type: 'INCOME' as const, description: 'Salário', dateISO: '2025-02-01T00:00:00.000Z', valueCentavos: 550000 },
  { categoryTitle: 'Lazer', type: 'INCOME' as const, description: 'Freela', dateISO: '2025-02-18T00:00:00.000Z', valueCentavos: 150000 },
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

  const categories = await prisma.category.findMany({ where: { userId: user.id } })
  const categoryByTitle = new Map(categories.map((c) => [c.title, c]))

  const existingCount = await prisma.transaction.count({ where: { userId: user.id } })
  if (existingCount === 0) {
    for (const tx of DEFAULT_TRANSACTIONS) {
      const category = categoryByTitle.get(tx.categoryTitle)
      if (!category) continue
      await prisma.transaction.create({
        data: {
          userId: user.id,
          categoryId: category.id,
          type: tx.type,
          description: tx.description,
          date: new Date(tx.dateISO),
          value: tx.valueCentavos,
        },
      })
    }
    console.log('Seed concluído: usuário', DEFAULT_USER.email, ', categorias padrão e', DEFAULT_TRANSACTIONS.length, 'transações.')
  } else {
    console.log('Seed concluído: usuário', DEFAULT_USER.email, 'e categorias padrão (transações já existem).')
  }
}

main()
  .catch((e) => {
    console.error('Erro ao executar seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

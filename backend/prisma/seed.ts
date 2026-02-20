import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Adicionar seeds do novo projeto aqui
}

main()
  .catch((e) => {
    console.error('Erro ao executar seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

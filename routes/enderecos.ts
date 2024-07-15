import { PrismaClient } from "@prisma/client"
import { Router } from "express"

import { verificaToken } from "../middewares/verificaToken"

const prisma = new PrismaClient()

async function main() {
  /***********************************/
  /* SOFT DELETE MIDDLEWARE */
  /***********************************/
  prisma.$use(async (params, next) => {
    // Check incoming query type
    if (params.model == 'Endereco') {
      if (params.action == 'delete') {
        // Delete queries
        // Change action to an update
        params.action = 'update'
        params.args['data'] = { deleted: true }
      }
    }
    return next(params)
  })
}
main()

const router = Router()

router.get("/", async (req, res) => {
  try {
    const enderecos = await prisma.endereco.findMany({
      where: { deleted: false }
    })
    res.status(200).json(enderecos)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post("/", verificaToken, async (req: any, res) => {
  // dados que são fornecidos no corpo da requisição
  const { rua, cidade, estado, cep } = req.body

  // dado que é acrescentado pelo Token (verificaToken) no req
  const { userLogadoId } = req

  if (!rua || !cidade || !estado || !cep) {
    res.status(400).json({ erro: "Informe rua, cidade, estado e cep" })
    return
  }

  try {
    const endereco = await prisma.endereco.create({
      data: { rua, cidade, estado, cep, usuarioId: userLogadoId }
    })
    res.status(201).json(endereco)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.delete("/:id", verificaToken, async (req, res) => {
  const { id } = req.params

  try {
    const endereco = await prisma.endereco.delete({
      where: { id: Number(id) }
    })
    res.status(200).json(endereco)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.put("/:id", verificaToken, async (req, res) => {
  const { id } = req.params
  const { rua, cidade, estado, cep } = req.body

  if (!rua || !cidade || !estado || !cep) {
    res.status(400).json({ erro: "Informe rua, cidade, estado e cep" })
    return
  }

  try {
    const endereco = await prisma.endereco.update({
      where: { id: Number(id) },
      data: { rua, cidade, estado, cep }
    })
    res.status(200).json(endereco)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router
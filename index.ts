import express from 'express'
const app = express()
const port = 3000
import cors from 'cors'

import enderecosRoutes from './routes/enderecos'
import usuariosRoutes from './routes/usuarios'
import loginRoutes from './routes/login'

app.use(express.json())
app.use(cors())
app.use("/enderecos", enderecosRoutes)
app.use("/usuarios", usuariosRoutes)
app.use("/login", loginRoutes)

app.get('/', (req, res) => {
  res.send('API de Login: Controle de Usuarios')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})
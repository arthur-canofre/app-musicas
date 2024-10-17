import { createServer } from 'node:http'

const servidor = createServer((req, res) => {
    console.log('receba')
    res.write('amostradinhe')
    
    return res.end()
})

servidor.listen(8000)
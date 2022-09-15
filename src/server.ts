import express, { Request, Response } from 'express'

const app = express();

//tipos de parâmetros
// query --> vem através do ponto de interrogação ?page=2 --> usado para persistir estado
// route --> são intrinsecamente conhecidos --> 
// body


app.get('/games', (req:Request, res:Response) => {
    return res.json([]);
})
app.post('/ads', (req:Request, res:Response) => {
    return res.status(201).json([]);
})
app.get('/games/:id/ads', (req:Request, res:Response) => {
    return res.json([]);
})
app.get('/ads/:id/discord', (req:Request, res:Response) => {
    return res.json([]);
})

app.get('/ads', (req:Request, res: Response) => {
    return res.json([
        {id: 1, name: 'Anúncio 1'},
        {id: 1, name: 'Anúncio 1'},
        {id: 1, name: 'Anúncio 1'},
        {id: 1, name: 'Anúncio 1'},
    ])
})

app.listen(3333, () => {
    console.log('Server is running')
});
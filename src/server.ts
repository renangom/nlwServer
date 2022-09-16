import express, { json, Request, Response } from 'express'
import {PrismaClient} from '@prisma/client'
import convertHourStringToMinutes from './utils/convertHourToMin';
import convertMinutesToHour from './utils/convertMinutesToHour';
import cors from 'cors'


const app = express();
app.use(cors())
const prisma = new PrismaClient()
app.use(express.json())

//tipos de parâmetros
// query --> vem através do ponto de interrogação ?page=2 --> usado para persistir estado
// route --> são intrinsecamente conhecidos --> 
// body


app.get('/games', async (req:Request, res:Response) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }
        }
    })
    return res.json(games);
})
app.post('/games/:id/ads', async (req:Request, res:Response) => {

    const gameId = req.params.id;
    const {name, yearsPlaying, discord, weekDays, hourStart, hourEnd, useVoiceChannel} = req.body

    const ad = await prisma.ad.create({
        data:{
            name,
            yearsOfPlaying: yearsPlaying,
            discord,
            weekDays: weekDays.join(','),
            hourStart: convertHourStringToMinutes(hourStart),
            hourEnd: convertHourStringToMinutes(hourEnd),
            useVoiceChannel,
            gameId
        }
    })

    return res.status(201).json(ad);
})
app.get('/games/:id/ads', async (req:Request, res:Response) => {
    const gameId = req.params.id;

    const ads = await prisma.ad.findMany({
        where:{
            gameId: gameId
        }
    })
    if(!ads){
        return res.status(404).json('Ad not found')
    }
    return res.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutesToHour(ad.hourStart),
            hourEnd: convertMinutesToHour(ad.hourEnd)
        }
    }));
})
app.get('/ads/:id/discord', async (req:Request, res:Response) => {
    const adId = req.params.id;

    const ad = await prisma.ad.findUniqueOrThrow({
        select:{
            discord: true
        },
        where: {
            id: adId
        }
    })
    return res.json({
        discord: ad.discord
    });
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
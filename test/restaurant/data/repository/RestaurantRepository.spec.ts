import mongoose from "mongoose"
import RestaurantRepository from "../../../../src/restaurant/data/repository/RestaurantRepository"
import dotenv from 'dotenv'
import { cleanDb, prepareDb } from "../helpers/helpers"
import { expect } from "chai"
import Restaurant,{Location} from '../../../../src/restaurant/domain/Restaurant'
dotenv.config()

describe('Restaurant',()=>{
    let client: mongoose.Mongoose
    let sut: RestaurantRepository

    beforeEach(() => {
        client = new mongoose.Mongoose
        const connectionStr = encodeURI(process.env.TEST_DB as string)
        const option = {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
        client.connect(connectionStr,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
        )
        sut = new RestaurantRepository(client)
      })

    afterEach(() => {
        client.disconnect()
    })

    describe('findAll', ()=>{
        beforeEach(async()=> {
            await prepareDb(client)
        })

        afterEach(async () => {
            await cleanDb(client)
        })

        it('it should returns all restaurants', async() =>{
            const results = await sut.findAll(1,2)

            expect(results).not.to.be.empty
            expect(results.data.length).eq(2)
        })
    })

    describe('findOne', ()=>{
        var insertedId = ''
        beforeEach(async()=> {
            var docs = await prepareDb(client)
            insertedId = docs[0].id
        })

        afterEach(async () => {
            await cleanDb(client)
        })

        it('return promise reject when restaurant not found', async ()=> {
            await sut.findOne('no_id').catch((err)=>{
                expect(err).not.to.be.empty
            })
        })

        it('it should return found restaurant', async() =>{
            const result = await sut.findOne(insertedId)

            expect(result.id).eq(insertedId)
        })
    })
    describe('findByLocation', ()=>{
        beforeEach(async()=> {
            await prepareDb(client)
        })

        afterEach(async () => {
            await cleanDb(client)
        })

        it('return promise reject when restaurant not found', async ()=> {
            const location = new Location(32.6,73.9)
            await sut.findByLocation(1,2,location).catch((err)=>{
                expect(err).not.to.be.empty
            })
        })

        it('should return a found restaurant', async () => {
            const location = new Location(40.33, 73.23)
            const results = await sut.findByLocation( 1, 2, location)
      
            expect(results.data.length).eq(2)
          })
    })

})
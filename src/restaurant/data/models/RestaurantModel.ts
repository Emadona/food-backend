import * as mongoose from 'mongoose'
import { Address, Location } from '../../domain/Restaurant';
import pagination from 'mongoose-paginate-v2'

export interface RestaurantDoc extends mongoose.Document{
    name: string,
    type: string,
    rating: number,
    display_img_url: string,
    location: {coordinates: Location},
    address: Address
}

export interface RestaurantModel extends mongoose.PaginateModel<RestaurantDoc>{}

const pointScema = new mongoose.Schema({
    type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: {
            longitude: {type: Number},
            latitude: {type: Number}
        },
        required: true
    }
})

const RestaurantScema = new mongoose.Schema({
    name: {type: String, required: true, index: 'text'},
    type: {type: String, required: true},
    rating: {type: Number, required: true, min: 0 , max: 5},
    display_img_url: {type: String, required: true},
    location: {type: pointScema, index: '2dsphare'},
    address: {
        street: {type: String, required: true},
        city: {type: String, required: true},
        parish: {type: String, required: true},
        zone: {type: String},
    }
})

RestaurantScema.plugin(pagination)
export default RestaurantScema
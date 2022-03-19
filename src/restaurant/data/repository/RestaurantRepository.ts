import { Mongoose, PaginateResult } from "mongoose";
import IRestaurantRepository from "../../domain/IRestaurantRepository";
import { Menu } from "../../domain/Menu";
import Pageable from "../../domain/Pageable";
import Restaurant,{Location} from "../../domain/Restaurant";
import RestaurantScema, { RestaurantDoc, RestaurantModel } from "../models/RestaurantModel";

export default class RestaurantRepository implements IRestaurantRepository {
    constructor(private readonly client: Mongoose){}
    public async findAll(page: number, pageSize: number): Promise<Pageable<Restaurant>> {
        const model = this.client.model<RestaurantDoc>(
            'Restaurant',
            RestaurantScema
        ) as RestaurantModel

        const pageOptions = {page: page, limit: pageSize}
        const pageResults = await model.paginate({}, pageOptions).catch((_)=> null)

        return this.restaurantsFromPageResults(pageResults)
    }
    public async findOne(id: string): Promise<Restaurant> {
        const model = this.client.model<RestaurantDoc>(
            'Restaurant',
            RestaurantScema
        ) as RestaurantModel
        const result = await model.findById(id)

        if(result === null) return Promise.reject('Restaurant not found')
        
        return new Restaurant(
                result.id,
                result.name,
                result.type,
                result.rating,
                result.display_img_url,
                result.location.coordinates,
                result.address
        )
    }
    findMenu(restaurantId: string): Promise<Menu> {
        throw new Error("Method not implemented.");
    }
    public async findByLocation(page: number, pageSize: number, location: Location): Promise<Pageable<Restaurant>> {
        const model = this.client.model<RestaurantDoc>(
            'Restaurant',
            RestaurantScema
        ) as RestaurantModel
        const pageOptions = {page: page, limit: pageSize, forceCountFn : true}

        const geoQuery = {
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [location.longitude, location.latitude]
                    },
                    $maxDistance: 2
                },
            },
        }

        const pageResults = await model.paginate(geoQuery, pageOptions).catch((_)=> null)

        return this.restaurantsFromPageResults(pageResults)


        
    }
    search(page: number, pageSize: number, query: string): Promise<Pageable<Restaurant>> {
        throw new Error("Method not implemented.");
    }
    private restaurantsFromPageResults(
        pageResults: PaginateResult<RestaurantDoc> | null
    )
    {
    if(pageResults === null || pageResults.docs.length === 0){
        console.log(pageResults?.docs.length)
        return Promise.reject('restaurants not found')}

        const results = pageResults.docs.map<Restaurant>(
            (model) => new Restaurant(
                model.id,
                model.name,
                model.type,
                model.rating,
                model.display_img_url,
                model.location.coordinates,
                model.address
            )
        )
        return new Pageable<Restaurant>(
            pageResults.page ?? 0,
            pageResults.limit,
            pageResults.totalPages,
            results
        )
    }
}
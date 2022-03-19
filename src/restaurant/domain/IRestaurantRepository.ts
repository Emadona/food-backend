import { Menu } from "./Menu";
import Pageable from "./Pageable";
import Restaurant,{Location} from "./Restaurant";


export default interface IRestaurantRepository {
    findAll(page: number, pageSize: number): Promise<Pageable<Restaurant>>
    findOne(id: string): Promise<Restaurant>
    findMenu(restaurantId: string): Promise<Menu>
    findByLocation(page: number, pageSize: number, location: Location): Promise<Pageable<Restaurant>>
    search(page: number, pageSize: number, query: string): Promise<Pageable<Restaurant>>
}
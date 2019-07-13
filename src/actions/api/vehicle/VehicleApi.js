import MyService from "../../service";
import { reactLocalStorage } from "reactjs-localstorage";

const VehicleApi = {
    getFeaturedVehicles: async () =>{
        let result = await MyService.getRequestData("/vehicle-partner/get-featured-vehicles");
        return result
    },
    getVehicles: async () => {
        var vhc_bran_id = reactLocalStorage.get("booking.brand", 0)
        var vhc_seat_id = reactLocalStorage.get("booking.seat_filter", 0)
        var vhc_tms_id = reactLocalStorage.get("booking.tms_filter", 0)
        var vhc_type_id = reactLocalStorage.get("booking.type", 1)

        var request = {
            vhc_type_id: reactLocalStorage.get("booking.type", 1),
            rental_date: reactLocalStorage.get("booking.rental_date"),
            return_date: reactLocalStorage.get("booking.return_date"),
            city_id: reactLocalStorage.get("booking.location"),
            price_from: reactLocalStorage.get("vehicles.price_from", 0),
            price_to: reactLocalStorage.get("vehicles.price_to", 1500000),
            vhc_part_hide: 0
        };
        if (vhc_type_id == 1) {
            if (vhc_seat_id)
                request["vhc_seat_id"] = vhc_seat_id

        }
        if (vhc_bran_id)
            request["vhc_bran_id"] = vhc_bran_id
            
        if (vhc_tms_id)
            request["vhc_tms_id"] = vhc_tms_id


        let value = await MyService.getRequestData("/vehicle-partner", request);
        return value
        // return db_vehicles;
    },
    getVehicleById: async (vhc_part_id) => {
        let result = await MyService.getRequestData("/vehicle-partner/get-detail-vehicle-partner", { "vhc_part_id": vhc_part_id });
        return result
    }
}

export default VehicleApi;
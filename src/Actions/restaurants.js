import axios from "../config/axios";
export const startGetRestaurants = () => {
  return dispatch => {
    axios.get("/TopRamen").then(response => {
      const restaurants = response.data;
      dispatch(getRestaurants(restaurants));
    });
  };
};
const getRestaurants=(restaurants)=>{
    return {
        type:'GET_RESTAURANTS',
        payload:restaurants
    }
}

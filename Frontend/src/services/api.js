// const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_URL = "http://localhost:4000";

// AUTH ENDPOINTS
export const endpoints = {
  SIGNUP_API: BASE_URL + "/api/users/register",
  LOGIN_API: BASE_URL + "/api/users/login",
}


//ORDER ENDPOINTS
export const car ={
  GET_CAR: BASE_URL+"/api/car/getAllCars",
  GET_S_CAR: BASE_URL+"/api/car/getCar",
  UPDATE_CAR :BASE_URL+"/api/car/updateCar",
  DELETE_CAR: BASE_URL+"/api/car/deleteCar",
  ADD_CAR : BASE_URL+"/api/car/addcar",
  GET_USER_CARS : BASE_URL+"/api/car/getAllUserCar"
}

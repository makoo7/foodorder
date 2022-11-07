import axios from "axios";

export const getMeals = async() => {
    await axios.get(`http://localhost:3000/meals`)
    .then(function (response) {
      console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return error
    })
}
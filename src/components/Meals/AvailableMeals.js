import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import axios from "axios";


const AvailableMeals = (props) => {
  const [DUMMY_MEALS, setDUMMY_MEALS] = useState([]);

  const getMeals = async() => {
      await axios.get(`${process.env.REACT_APP_API_URL}/meals`)
            .then(function (response) {
              setDUMMY_MEALS(response.data)
            })
            .catch(function (error) {
            })
  }

  useEffect(() => {
    getMeals()
  }, []);

  const mealsList = DUMMY_MEALS?.map((meal) => (
    <MealItem
      key={meal._id}
      id={meal._id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <div>
      <section className={classes.meals}>
        <Card>
          <ul>{mealsList}</ul>
        </Card>
      </section>
    </div>
  );
};

export default AvailableMeals;

import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";


const AvailableMeals = (props) => {
  const [DUMMY_MEALS, setDUMMY_MEALS] = useState([]);
  const [httpError, setHttpError] = useState();

  
  useEffect(() => {
    const getMeals = async() => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/meals`)
        if(!response.ok){
          throw new Error('Something went wrong!');
        }
        const responseData = await response.json()
        setDUMMY_MEALS(responseData);
    }

      getMeals().catch(error => {
        setHttpError(error.message)
      })
  }, []);

  if(httpError){
    return <section className={classes.ErrorMessage}>
      <p>{httpError}</p>
    </section>
  }

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

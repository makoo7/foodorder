import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = (props) => {
  const nameInputReference = useRef();
  const streetInputReference = useRef();
  const postalInputReference = useRef();
  const cityInputReference = useRef();

  const [formInputsValidity, setFormInputsValidity] = useState({
      name: true,
      street: true,
      postal: true,
      city: true
  });

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputReference.current.value;
    const enteredStreet = streetInputReference.current.value;
    const enteredPostal = postalInputReference.current.value;
    const enteredCity = cityInputReference.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalIsValid = isFiveChars(enteredPostal);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputsValidity({
        name: enteredNameIsValid,
        street: enteredStreetIsValid,
        postal: enteredPostalIsValid,
        city: enteredCityIsValid
    });

    const formIsValid = enteredNameIsValid &&
                enteredStreetIsValid &&
                enteredCityIsValid &&
                enteredPostalIsValid;
        if(!formIsValid){
            return;
        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            postal: enteredPostal,
            city: enteredCity
        });
  };

  const nameInputClasses = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`;
  const streetInputClasses = `${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`;
  const postalInputClasses = `${classes.control} ${formInputsValidity.postal ? '' : classes.invalid}`;
  const cityInputClasses = `${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputReference} />
        {!formInputsValidity.name && <p className={classes.invalid}>please enter a valid Name</p>}
      </div>
      <div className={streetInputClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputReference} />
        {!formInputsValidity.street && <p>please enter a valid Street</p>}
      </div>
      <div className={postalInputClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInputReference} />
        {!formInputsValidity.postal && <p>please enter a valid Postal Code (max 5 characters)</p>}
      </div>
      <div className={cityInputClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputReference} />
        {!formInputsValidity.city && <p>please enter a valid City</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel    
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
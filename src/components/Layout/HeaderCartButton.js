import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
    const [isHighlighted, setIsHighlighted] = useState(false);
    const cartCtx = useContext(CartContext);
    const { items } = cartCtx;

    const numberofCartItems = items.reduce((currentNum, item) => {
        return currentNum + item.amount;
    }, 0);


    useEffect(() => {
        if(items.length === 0){
            return;
        }
        setIsHighlighted(true);

        const timer = setTimeout(() => {
            setIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    const buttonClasses = `${classes.button} ${isHighlighted ? classes.bump : ''}`;

    return (
    <div>
        <button className={buttonClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>        
            <span>
                Your Cart
            </span>        
            <span className={classes.badge}>
                {numberofCartItems}
            </span>        
        </button>
    </div>
    );
}

export default HeaderCartButton;
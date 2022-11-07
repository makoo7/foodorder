import { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CorrectIcon from './CorrectIcon';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import axios from 'axios';

const Cart = (props) => {
    const [order, setOrder] = useState(false);
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const orderItems = (items, totalAmount) => {
        const order = {
            items: items,
            total_amount: totalAmount
        }
        axios.post(`${process.env.REACT_APP_API_URL}/orders`, order)
        .then(function(response){
            setOrder(response.data);
            cartCtx.emptyCart();
        })
        .catch(function(error){})
    }

    const cartAddItemHandler = (item) => {
        cartCtx.addItem({...item, amount: 1});
    }
    const cartRemoveItemHandler = (id) => {
        cartCtx.removeItem(id);
    }

    const cartOrderHandler = () => {
        const items = cartCtx.items;
        const totalAmount = cartCtx.totalAmount;
        orderItems(items, totalAmount)
    }

    const cartItems = <ul className={classes['cart-items']}>
            {cartCtx.items.map((item, i) => <CartItem 
                key={item.id} 
                name={item.name}
                amount={item.amount}
                price={item.price}
                onRemove={cartRemoveItemHandler.bind(null, item.id)}
                onAdd={cartAddItemHandler.bind(null, item)}
                />)}
            </ul>;

    const orderSuccess =  <h2 className={classes['text-center']}><CorrectIcon /> Order Placed Successfully</h2>

    return (<Modal onHideCart={props.onHideCart}>
        {(!order) && cartItems}
        { order && orderSuccess }
        {(!order) && 
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
        }
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
            { (!order) && hasItems && <button onClick={cartOrderHandler} className={classes.button}>Order</button> }
        </div>
    </Modal>);
}

export default Cart;
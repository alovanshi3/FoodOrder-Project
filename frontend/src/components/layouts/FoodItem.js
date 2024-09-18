import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addItemToCart, removeItemFromCart, updateCartQuantity } from '../../actions/cartAction';

const FoodItem = ({fooditem,restaurant}) => {

    const alert = useAlert();

    const [quantity,setQuantity] = useState(1);
    const [showButtons,setShowButtons] = useState(false);
    const {user,isAuthenticated} = useSelector((state)=>state.auth);
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const cartItems =     useSelector((state)=>state.cart.cartItems);

    useEffect(() => {
        const cartItem = cartItems.find((item) => item.foodItem._id === fooditem._id);
        if(cartItem){
          setQuantity(cartItem.quantity);
          setShowButtons(true);
        } else{
          setQuantity(1);
          setShowButtons(false);
        }
      },  [cartItems , fooditem]);

      const increaseQty=()=>{
        if(quantity<fooditem.stock){
            const newQuantity = quantity + 1;
            setQuantity(newQuantity);
            dispatch(updateCartQuantity(fooditem._id,newQuantity,alert));
        }
        else {
          alert.error("Out of Stock");
        }
      }

      const decreaseQty=()=>{
        if(quantity>1){
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            dispatch(updateCartQuantity(fooditem._id,newQuantity,alert));
        }
        else {
                setQuantity(0);
                setShowButtons(false);
                dispatch(removeItemFromCart(fooditem._id));
        }
      }

      const addItemToCartHandler =()=>{
        if(!isAuthenticated && !user){
          return  navigate("/users/login");
        }
        if(fooditem && fooditem._id){
          dispatch(addItemToCart(fooditem._id,restaurant,quantity,alert));
          setShowButtons(true);
        }
        else {
                console.error("Food is not found");
        }
      }

  return (
        <div className="col-sm-12 col-md-6 col-lg-3 my-3">

            <div className="p-3 rounded card">

                <img src={fooditem.images[0].url}
                 alt="chaats" width="200px" className="card-image-top mx-auto" />

                 {/* Heading and description */}
                 <div className="card-body d-flex flex-column">

                    <h5 className="card-title">
                          {fooditem.name}
                    </h5>

                    <p className="fooditem_des">{fooditem.description}</p>

                    <p className="card-text">₹{fooditem.price}</p>

                  {
                    !showButtons ? (
                      <button type="button" id="cart_btn" className='btn btn-primary d-inline ml-4'
                        disabled={fooditem.stock===0}
                        onClick={addItemToCartHandler}
                        > 
                            Add to Cart
                      </button>
                    ):(
                      <div className ="stockCounter d-inline">
                            <span className="btn btn-danger minus" onClick={decreaseQty}>
                                  -
                            </span>
        
                            <input
                                type="number" 
                                className="form-control count d-inline"
                                value={quantity}
                                readOnly
                               />

                            <span className="btn btn-primary plus" onClick={increaseQty}>
                                  +
                            </span>
                       </div>      
                    )
                  }

                    <br/>
                    <p>Status: <span id="stock_status" className={fooditem.stock ? "greenColor " : "redColor"}>
                    {
                          fooditem.stock ? "In Stock" : "Out of Stock"
                    }
                    </span>
                    </p>
                 </div>
            </div>
        </div>

  )
}

export default FoodItem
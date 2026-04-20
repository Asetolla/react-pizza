import React from "react";
import { useDispatch } from "react-redux";
//import clsx from 'clsx'
import {
  CartItem,
  addItem,
  minusItem,
  removeItem,
} from "./redux/slices/cartSlice";
import CartItemBlock from "./CartItemBlock";

type CartItemProps = {
  id: string;
  title: string;
  type: string;
  size: number;
  price: number;
  count: number;
  imageUrl: string;
};
const CartItemContainer: React.FC<CartItemProps> = (props) => {
  const { id } = props;
  const dispatch = useDispatch();
  return (
    <CartItemBlock
      {...props}
      onPlus={() => dispatch(addItem({ id } as CartItem))}
      onMinus={() => dispatch(minusItem(id))}
      onRemove={() => {
        if (window.confirm("Are you sure?")) {
          dispatch(removeItem(id));
        }
      }}
    />
  );
};

export default CartItemContainer;

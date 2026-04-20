import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CartItem,
  addItem,
  selectCartItemById,
} from "../redux/slices/cartSlice";
import React from "react";
import PizzaBlockContainer from "./PizzaBlockContainer";

export type PizzaBlockProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

const typeNames = ["тонкое", "традиционнное"];

const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  title,
  price,
  imageUrl,
  sizes,
  types,
}) => {
  const dispatch = useDispatch();
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const cartItem = useSelector(selectCartItemById(id));

  useEffect(() => {
    if (!types?.includes(activeType)) {
      setActiveType(types?.[0]);
    }
  }, []);

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
      count: 0,
    };

    dispatch(addItem(item));
  };

  return (
    <PizzaBlockContainer
      id={id}
      title={title}
      price={price}
      imageUrl={imageUrl}
      sizes={sizes}
      types={types}
      typeNames={typeNames}
      activeType={activeType}
      activeSize={activeSize}
      setActiveType={setActiveType}
      setActiveSize={setActiveSize}
      onClickAdd={onClickAdd}
      addedCount={addedCount}
    />
  );
};
export default PizzaBlock;

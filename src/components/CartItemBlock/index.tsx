import React from "react";

type CartItemProps = {
  id: string;
  title: string;
  type: string;
  size: number;
  price: number;
  count: number;
  imageUrl: string;

  onPlus: () => void;
  onMinus: () => void;
  onRemove: () => void;
};

const CartItemBlock: React.FC<CartItemProps> = ({
  title,
  type,
  size,
  price,
  count,
  imageUrl,
  onPlus,
  onMinus,
  onRemove,
}) => {
  const checkedCount = count <= 0;

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </div>

      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>
          {type}, {size} см.
        </p>
      </div>

      <div className="cart__item-count">
        <button
          disabled={checkedCount}
          onClick={onMinus}
          className="button button--outline button--circle"
        >
          -
        </button>

        <b>{count}</b>

        <button
          onClick={onPlus}
          className="button button--outline button--circle"
        >
          +
        </button>
      </div>

      <div className="cart__item-price">
        <b>{price * count} ₸</b>
      </div>

      <div className="cart__item-remove">
        <button
          onClick={onRemove}
          className="button button--outline button--circle"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default CartItemBlock;

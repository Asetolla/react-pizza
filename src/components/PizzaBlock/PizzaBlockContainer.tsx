import { Link } from "react-router-dom";

export type PizzaBlockContainerProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  typeNames: string[];
  activeType: number;
  activeSize: number;
  setActiveType: (i: number) => void;
  setActiveSize: (i: number) => void;
  onClickAdd: () => void;
  addedCount: number;
};

const PizzaBlockContainer: React.FC<PizzaBlockContainerProps> = ({
  id,
  title,
  price,
  imageUrl,
  sizes,
  types,
  typeNames,
  activeType,
  activeSize,
  setActiveType,
  setActiveSize,
  onClickAdd,
  addedCount,
}) => {
  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/pizza/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt={title} />
        </Link>

        <h4 className="pizza-block__title">{title}</h4>

        <div className="pizza-block__selector">
          <ul>
            {types.map((type) => (
              <li
                key={type}
                className={activeType === type ? "active" : ""}
                onClick={() => setActiveType(type)}
              >
                {typeNames[type]}
              </li>
            ))}
          </ul>

          <ul>
            {sizes.map((size, i) => (
              <li
                key={i}
                className={activeSize === i ? "active" : ""}
                onClick={() => setActiveSize(i)}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>

        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₸</div>

          <button
            onClick={onClickAdd}
            className="button button--outline button--add"
          >
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};
export default PizzaBlockContainer;

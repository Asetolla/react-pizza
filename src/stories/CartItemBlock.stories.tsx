import type { Meta, StoryObj } from "@storybook/react-webpack5";
import CartItemBlock from "../components/CartItemBlock";
import "../styles/cartItem.storybook.scss";
import "../scss/components/_button.scss";

const meta: Meta<typeof CartItemBlock> = {
  title: "Cart/CartItem",
  component: CartItemBlock,
  tags: ["autodocs"],
  argTypes: {
    count: { control: "number" },
    price: { control: "number" },
    title: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof CartItemBlock>;

const mockItem = {
  id: "1",
  title: "Пепперони",
  type: "тонкое",
  size: 30,
  price: 2500,
  count: 1,
  imageUrl:
    "https://media.dodostatic.net/image/r:292x292/11EE7D5F7355A2F19DFA2F42D1A20647.avif",
};

export const Default: Story = {
  args: {
    ...mockItem,
    onPlus: () => {},
    onMinus: () => {},
    onRemove: () => {},
  },
};

export const Cheese: Story = {
  args: {
    ...mockItem,
    count: 2,
    title: "Сырная",
    price: 2000,
    size: 24,
    type: "традиционное",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/01995c3abfda7669b8fdf577f86b07a9.avif",
    onPlus: () => {},
    onMinus: () => {},
    onRemove: () => {},
  },
};

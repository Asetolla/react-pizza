import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { useState } from "react";
import PizzaBlock from "../components/PizzaBlock/PizzaBlockContainer";
import type { PizzaBlockContainerProps } from "../components/PizzaBlock/PizzaBlockContainer";
import "../scss/components/_pizza-block.scss";
import "../scss/components/_button.scss";
import { MemoryRouter } from "react-router-dom";

const meta: Meta<typeof PizzaBlock> = {
  title: "Pizza/PizzaBlock",
  tags: ["autodocs"],
  component: PizzaBlock,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof PizzaBlock>;

const typeNames = ["тонкое", "традиционное"];

const Wrapper = (args: PizzaBlockContainerProps) => {
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  return (
    <PizzaBlock
      {...args}
      typeNames={typeNames}
      activeType={activeType}
      activeSize={activeSize}
      setActiveType={setActiveType}
      setActiveSize={setActiveSize}
    />
  );
};

const mockPizza = {
  id: "1",
  title: "Пепперони",
  price: 2500,
  imageUrl:
    "https://media.dodostatic.net/image/r:292x292/11EE7D5F7355A2F19DFA2F42D1A20647.avif",
  sizes: [26, 30, 40],
  types: [0, 1],
};

export const Default: Story = {
  render: (args) => <Wrapper {...args} />,
  args: {
    ...mockPizza,
    addedCount: 0,
    onClickAdd: () => {},
  },
};

export const Added: Story = {
  render: (args) => <Wrapper {...args} />,
  args: {
    ...mockPizza,
    addedCount: 3,
    onClickAdd: () => {},
  },
};

export const Large: Story = {
  render: (args) => <Wrapper {...args} />,
  args: {
    ...mockPizza,
    sizes: [40],
    addedCount: 1,
    onClickAdd: () => {},
    id: "1",
  },
};

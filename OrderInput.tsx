import * as React from 'react';
import set from 'react-hook-form/dist/utils/set';
import menuItems from './menuItems';

type MenuItem = {
  name: string;
  cost: number;
};

type OrderItem = {
  details: MenuItem;
  quantity: number;
};

const Menu = ({ items = [], handleNewOrder }) => (
  <div className="item_selector">
    {items.map((item) => (
      <React.Fragment>
        <button onClick={() => handleNewOrder(item)}>
          {item.name} ${item.cost}
        </button>
      </React.Fragment>
    ))}
  </div>
);

let tempOrders: Record<number, number | undefined> = {};

export const OrderInput = () => {
  const [order, setOrder] = React.useState<OrderItem[]>([]);

  const handleNewOrder = (item: MenuItem) => {
    console.log('item', item);
    console.log('temp', tempOrders);
    if (tempOrders[item.name] !== undefined) {
      order[tempOrders[item.name]].quantity++;
      return setOrder([...order]);
    }
    tempOrders[item.name] = order.length;
    return setOrder([...order, { details: item, quantity: 1 }]);
  };

  return (
    <div className="summary">
      <Menu items={menuItems} handleNewOrder={handleNewOrder} />
      <div className="total">
        <button onClick={() => setOrder([])}>Reset</button>
        <p>
          Total $
          {order.reduce(
            (acc, orderItem) =>
              acc + orderItem.details.cost * orderItem.quantity,
            0
          )}
        </p>
        <ul>
          {order.map((orderItem, index) => (
            <li>
              {orderItem.details.name} ${orderItem.details.cost} *{' '}
              {orderItem.quantity} ={' '}
              {orderItem.details.cost * orderItem.quantity}
              <button
                onClick={() => {
                  if (orderItem.quantity === 1) return;
                  orderItem.quantity--;
                  setOrder([...order]);
                }}
              >
                -
              </button>
              <button
                onClick={() => {
                  if (orderItem.quantity === 99) return;
                  orderItem.quantity++;
                  setOrder([...order]);
                }}
              >
                +
              </button>
              <button
                onClick={() => {
                  tempOrders[orderItem.details.name] = undefined;
                  setOrder(
                    order.filter((_, filterIndex) => index !== filterIndex)
                  );
                }}
              >
                x
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

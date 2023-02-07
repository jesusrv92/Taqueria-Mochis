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
  <div className="w-2/3 flex flex-wrap">
    {items.map((item) => (
      <React.Fragment>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/3"
          onClick={() => handleNewOrder(item)}
        >
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
    <div className="flex">
      <Menu items={menuItems} handleNewOrder={handleNewOrder} />
      <div className="w-1/3 sticky top-0">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setOrder([])}
        >
          Reset
        </button>
        <div className="flex justify-between">
          <span className="text-white font-bold rounded text-xl">Total</span>
          <span className="text-white font-bold rounded text-xl">
            $
            {order.reduce(
              (acc, orderItem) =>
                acc + orderItem.details.cost * orderItem.quantity,
              0
            )}
          </span>
        </div>
        <ul>
          {order.map((orderItem, index) => (
            <li className="p-4 mb-4 text-md text-white rounded-lg bg-blue-400">
              <p>{orderItem.details.name}</p>
              <div className="flex justify-between">
                <div>
                  ${orderItem.details.cost}{' '}
                  <i className="fa-solid fa-xmark"></i> {orderItem.quantity} ={' '}
                  {orderItem.details.cost * orderItem.quantity}
                </div>
                <div>
                  <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => {
                      if (orderItem.quantity === 1) return;
                      orderItem.quantity--;
                      setOrder([...order]);
                    }}
                  >
                    <i className="fa-solid fa-minus"></i>
                  </button>
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => {
                      if (orderItem.quantity === 99) return;
                      orderItem.quantity++;
                      setOrder([...order]);
                    }}
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => {
                      tempOrders[orderItem.details.name] = undefined;
                      setOrder(
                        order.filter((_, filterIndex) => index !== filterIndex)
                      );
                    }}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

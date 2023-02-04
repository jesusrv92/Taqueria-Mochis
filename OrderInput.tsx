import * as React from 'react';
import { Path, useForm, UseFormRegister, SubmitHandler } from 'react-hook-form';

interface IFormValues {
  Quantity: number;
  Item: number;
}

type InputProps = {
  label: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
  required: boolean;
};

type OrderItem = {
  name: string;
  cost: number;
};

const orderItems = [
  { name: 'Taco de Birria', cost: 5 },
  { name: 'Media de Birria', cost: 10 },
  { name: 'Orden de Birria', cost: 15 },
  { name: 'Taco de Cabeza', cost: 5 },
  { name: 'Media de Cabeza', cost: 10 },
  { name: 'Orden de Cabeza', cost: 15 },
];

// The following component is an example of your existing Input Component
const Input = ({ label, register, required }: InputProps) => (
  <React.Fragment>
    <label>{label}</label>
    <input
      type="number"
      defaultValue={1}
      min={1}
      max={99}
      {...register(label, { required })}
    />
  </React.Fragment>
);

// you can use React.forwardRef to pass the ref too
const Select = React.forwardRef<
  HTMLSelectElement,
  { label: string; items?: OrderItem[] } & ReturnType<
    UseFormRegister<IFormValues>
  >
>(({ onChange, onBlur, name, label, items = [] }, ref) => (
  <React.Fragment>
    <label>{label}</label>
    <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
      {items.map((item, index) => (
        <option value={index}>{item.name}</option>
      ))}
    </select>
  </React.Fragment>
));

export const OrderInput = () => {
  const { register, handleSubmit } = useForm<IFormValues>();
  const [order, setOrder] = React.useState([]);

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    console.log(data);
    console.log(orderItems[data.Item]);
    setOrder([
      ...order,
      { details: orderItems[data.Item], quantity: data.Quantity },
    ]);
  };
  
  const onSubmitClear: SubmitHandler<IFormValues> = (data) => {
    setOrder([]);
  };

  return (
    <React.Fragment>
      <ul>
        {order.map(orderItem => <li>{orderItem.details.name} ${orderItem.details.cost} * {orderItem.quantity} = {orderItem.details.cost * orderItem.quantity}</li>)}
      </ul>
      <span>Total ${order.reduce((acc,orderItem) => acc + orderItem.details.cost * orderItem.quantity,0)}</span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input label="Quantity" register={register} required />
        <Select label="Item" {...register('Item')} items={orderItems} />
        <input type="submit" />
      </form>
      <form onSubmit={handleSubmit(onSubmitClear)}>
        <input type="submit" value="clear"/>
      </form>
    </React.Fragment>
  );
};

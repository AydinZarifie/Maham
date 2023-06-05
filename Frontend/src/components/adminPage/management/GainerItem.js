const GainerItem = (props) => {
  return (
    <tr>
      <td>{props.order}</td>
      <td>{props.name}</td>
      <td>{props.price}</td>
      <td>{props.change}</td>
    </tr>
  );
};

export default GainerItem;

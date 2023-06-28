const GainerItem = (props) => {
  const redStyle = {
    color: "red",
  };

  const greenstyle = {
    color: "green",
  };

  let gainersClass;
  if (props.change24 > 0) {
    gainersClass = greenstyle;
  } else {
    gainersClass = redStyle;
  }

  return (
    <tr>
      <td>{props.order}</td>
      <td>{props.name}</td>
      <td>{props.price}</td>
      <td style={gainersClass}>{props.change}</td>
    </tr>
  );
};

export default GainerItem;

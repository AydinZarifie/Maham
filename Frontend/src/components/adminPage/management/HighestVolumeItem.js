const HighestVolumeItem = (props) => {
  return (
    <tr>
      <td>{props.order}</td>
      <td>{props.name}</td>
      <td>{props.volume}</td>
    </tr>
  );
};

export default HighestVolumeItem;

const ModifyUSerSupply = (props: any) => {
  const showModifyForm = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    props.setFormVisibility(!props.formVisibility);
  };

  return (
    <button className="secondary-button" onClick={showModifyForm}>
      Modifier
    </button>
  );
};

export default ModifyUSerSupply;

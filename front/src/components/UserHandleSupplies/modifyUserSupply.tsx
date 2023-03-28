const ModifyUSerSupply = (props: any) => {
  const showModifyForm = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    props.setFormVisibility(!props.formVisibility);
  };

  return (
    <div>
      <button className="secondary-button" onClick={showModifyForm}>
        Modifier
      </button>
    </div>
  );
};

export default ModifyUSerSupply;

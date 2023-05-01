const BurgerMenu = (props: any) => {
  return (
    <button
      onClick={() => props.setIsActive(!props.isActive)}
      className={`burger`}
    >
      <div></div>
      <div></div>
      <div></div>
    </button>
  );
};

export default BurgerMenu;

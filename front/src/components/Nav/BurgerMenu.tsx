const BurgerMenu = (props: any) => {
  const showNavBar = (event: React.MouseEvent<HTMLButtonElement>) => {
    props.setIsActive(!props.isActive);
  };
  return (
    <button onClick={showNavBar} className={`burger`}>
      <div></div>
      <div></div>
      <div></div>
    </button>
  );
};

export default BurgerMenu;

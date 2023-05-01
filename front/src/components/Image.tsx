const Image = (props: any) => {
  return (
    <img
      src={`${process.env.REACT_APP_URL_BACK}${props.imageURL}`}
      alt={props.alt}
    />
  );
};

export default Image;

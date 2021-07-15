const PortfolioItem = (props: any) => {
  const { item, date, _id, description, tags } = props;

  return (
    <div>
      <h2>{item.title}</h2>
    </div>
  );
};

export default PortfolioItem;

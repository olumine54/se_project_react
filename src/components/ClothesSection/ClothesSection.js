const ClothesSection = ({ onCreateModal }) => {
  console.log(onCreateModal);
  return (
    <div className="clothes">
      <div className="clothes_title">Your items</div>
      <button className="clothes_button" type="button" onClick={onCreateModal}>
        +Add new
      </button>
    </div>
  );
};
export { ClothesSection };

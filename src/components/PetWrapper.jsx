import PetComponent from "./PetComponent";

const PetWrapper = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="container pt-24 mx-auto px-4 flex items-center justify-center">
        <div className="pointer-events-auto">
          <PetComponent />
        </div>
      </div>
    </div>
  );
};

export default PetWrapper;

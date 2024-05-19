
const Navbar = ({
  handleSave
}: {
  handleSave: () => void;
}) => {

  return (
    <div className="w-full bg-slate-200 p-4">
      <div className="ml-auto w-fit bg-white p-2 border-2 border-blue-400 rounded-lg text-blue-600"
      onClick={handleSave}>Save Changes</div>
    </div>
  )
};

export default Navbar;
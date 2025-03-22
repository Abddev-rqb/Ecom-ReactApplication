import { PuffLoader } from "react-spinners";

const Loader = ({ text }) => {
  return (
    <div className="flex justify-center items-center w-full h-[450px]">
      <div className="flex flex-col items-center gap-1">
        <PuffLoader color="oklch(0.723 0.219 149.579)" size={96} speedMultiplier={0.75} />
        <p className="text-slate-800">{text ? text : "Please Wait..."}</p>
      </div>
    </div>
  );
};

export default Loader;
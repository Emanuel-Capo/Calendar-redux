import { useDispatch } from "react-redux";
import { openModal } from "../../redux/ui/uiSlice";
import { eventActiveClear } from "../../redux/calendar/calendarSlice";

const AddNewFab = () => {
  const dispatch = useDispatch();
  const open = () => {
    dispatch(eventActiveClear());
    dispatch(openModal());
  };

  return (
    <button className="btn btn-primary fab" onClick={open}>
      <i className="fas fa-plus"></i>
    </button>
  );
};

export default AddNewFab;

import { useDispatch, useSelector } from "react-redux";
import { eventDelete } from "../../redux/calendar/calendarSlice";

const DeleteEventFab = () => {
  const dispatch = useDispatch();
  const { activeEvent } = useSelector(state => state.calendar);
  const handleDelete = () => {
    dispatch(eventDelete(activeEvent));
  };

  return (
    <button className="btn btn-danger fab-danger" onClick={handleDelete}>
      <i className="fas fa-trash"></i>
      <span> Borrar evento</span>
    </button>
  );
};

export default DeleteEventFab;

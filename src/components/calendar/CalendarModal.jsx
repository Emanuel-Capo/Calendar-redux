import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import { useEffect, useState } from "react";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/ui/uiSlice";
import { eventActiveClear, eventAddNew, eventUpdate } from "../../redux/calendar/calendarSlice";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

const now = moment().minutes(0).seconds(0).add(1, "hours");
const nowPlus1 = now.clone().add(1, "hours");

const initEvent = {
  title: "Evento",
  notes: "",
  start: now.toDate(),
  end: nowPlus1.toDate()
};

Modal.setAppElement(document.getElementById("root"));

const CalendarModal = () => {
  const { modalOpen } = useSelector(state => state.ui);
  const dispatch = useDispatch();
  const { activeEvent } = useSelector(state => state.calendar);

  const closeM = () => {
    dispatch(closeModal());
    setFormValues(initEvent);
    dispatch(eventActiveClear());
  };

  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());
  const [titleValid, setTitleValid] = useState(true);

  const [formValues, setFormValues] = useState(initEvent);

  const { notes, title, start, end } = formValues;

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    });
  };

  const handleDateStart = e => {
    setDateStart(e);
    setFormValues({
      ...formValues,
      start: e
    });
  };

  const handleDateEnd = e => {
    setDateEnd(e);
    setFormValues({
      ...formValues,
      end: e
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const mommentStart = moment(start);
    const mommentEnd = moment(end);
    if (mommentStart.isSameOrAfter(mommentEnd)) {
      return toast.error("La fecha final debe ser mayor a la inicial", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
    }
    if (title.trim().length < 2) {
      return setTitleValid(false);
    }
    setTitleValid(true);
    if (activeEvent === null) {
      dispatch(
        eventAddNew({
          ...formValues,
          id: new Date().getTime(),
          user: {
            name: "Emanuel"
          }
        })
      );
    } else {
      dispatch(eventUpdate(formValues));
    }
    closeM();
  };

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues(activeEvent);
    } else setFormValues(initEvent);
  }, [activeEvent]);

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeM}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}>
      <ToastContainer />
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={handleSubmit}>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DateTimePicker onChange={handleDateStart} value={dateStart} className="form-control" />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={handleDateEnd}
            value={dateEnd}
            className="form-control"
            minDate={dateStart}
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${!titleValid && "is-invalid"}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-outline-primary">
            <i className="far fa-save"></i>
            <span> Guardar</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CalendarModal;

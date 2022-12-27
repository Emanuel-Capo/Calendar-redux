import Navbar from "../ui/Navbar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { messages } from "../../helpers/calendar-messagges-es";
import "moment/dist/locale/es";
import CalendarEvent from "./CalendarEvent";
import { useState } from "react";
import CalendarModal from "./CalendarModal";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../redux/ui/uiSlice";
import { eventSetActive } from "../../redux/calendar/calendarSlice";
import AddNewFab from "../ui/AddNewFab";
import DeleteEventFab from "../ui/DeleteEventFab";

moment.locale("es");

const localizer = momentLocalizer(moment);

// const events = [
//   {
//     title: "hola",
//     start: moment().toDate(),
//     end: moment().add(2, "hour").toDate(),
//     bgColor: "#fafafa",
//     user: {
//       _id: 1,
//       name: "Emanuel"
//     }
//   }
// ];

const CalendarScreen = () => {
  const [lastView, setLastView] = useState(localStorage.getItem("lastView") || "month");
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector(state => state.calendar);

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#367cf7",
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white"
    };
    return { style };
  };

  const onDoubleClick = () => {
    dispatch(openModal());
  };

  const onSelect = e => {
    dispatch(eventSetActive(e));
  };

  const onViewChange = e => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  return (
    <div className="calendar-screen">
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        components={{ event: CalendarEvent }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
        view={lastView}
      />
      {activeEvent && <DeleteEventFab />}
      <AddNewFab />
      <CalendarModal />
    </div>
  );
};

export default CalendarScreen;

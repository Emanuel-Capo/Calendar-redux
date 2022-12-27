import { Provider } from "react-redux";
import AppRouter from "./router/AppRouter";
import "./style.css";
import { store } from "./redux/store";

const CalendarApp = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default CalendarApp;

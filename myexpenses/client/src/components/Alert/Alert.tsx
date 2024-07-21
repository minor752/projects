import { IAlertProps } from "../../types";
import "./Alert.css";

export const Alert = ({ alertStatus, alertText }: IAlertProps) => {
  <div className={`alert alert-wrapper alert-${alertStatus}`}>{alertText}</div>;
};

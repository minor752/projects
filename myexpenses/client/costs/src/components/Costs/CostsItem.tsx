import { MutableRefObject, useRef, useState } from "react";
import { ICostItemProps } from "../../types";
import { getAuthDataFromLS } from "../../utils";
import { deleteCostFx, updateCostFx } from "../../api/costsClient";
import { removeCost, updateCost } from "../../context";
import { Spinner } from "../Spinner/Spinner";
import { formatDate } from "../../utils/arrayUtils";
import { validationInputs } from "../../utils/validation";

export const CostItem = ({ cost, index }: ICostItemProps) => {
  const [edit, setEdit] = useState(false);
  const [deleteSpinner, setDeleteSpinner] = useState(false);
  const [editSpinner, setEditSpinner] = useState(false);
  const [newText, setNewText] = useState(cost.text);
  const [newPrice, setNewPrice] = useState<string | number>(cost.price);
  const [newDate, setNewDate] = useState(cost.date);
  const textRef = useRef() as MutableRefObject<HTMLInputElement>;
  const priceRef = useRef() as MutableRefObject<HTMLInputElement>;
  const dateRef = useRef() as MutableRefObject<HTMLInputElement>;

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNewText(event.target.value);
  const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNewPrice(event.target.value);
  const handleChangeDate = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNewDate(event.target.value);

  const allowEditCost = () => setEdit(true);
  const cancelEditCost = () => {
    setEditSpinner(false);
    setEdit(false);
  };

  const handleEditCost = async () => {
    setEditSpinner(true);
    if (
      newText === cost.text &&
      +newPrice === +cost.price &&
      newDate === cost.date
    ) {
      setEditSpinner(false);
      setEdit(false);
      return;
    }

    if (!validationInputs(textRef, priceRef, dateRef)) {
      setEditSpinner(false);
      return;
    }

    setEdit(false);

    const authData = getAuthDataFromLS();
    const updatedCost = await updateCostFx({
      url: "/cost",
      token: authData.access_token,
      cost: { text: newText, price: +newPrice, date: newDate },
      id: cost._id as string,
    });

    if (!updatedCost) {
      setEditSpinner(false);
      return;
    }

    setEditSpinner(false);

    updateCost(updatedCost);
    console.log("Успешно обновлено");
  };

  const deleteCost = async () => {
    setDeleteSpinner(true);

    const authData = getAuthDataFromLS();

    await deleteCostFx({
      url: "/cost",
      token: authData.access_token,
      id: cost._id as string,
    });

    setDeleteSpinner(false);
    removeCost(cost._id as string);
    console.log("Успешно удалено");
  };
  return (
    <li
      id={cost._id as string}
      className="cost-item list-group-item d-flex justify-content-between align-items-center"
    >
      <div className="cost-item-left">
        <span>{index} Магазин </span>
        {edit ? (
          <input
            ref={textRef}
            value={newText}
            onChange={handleChangeText}
            className="form-control cost-item__shop-input"
          />
        ) : (
          <span>"{cost.text}"</span>
        )}
        {edit ? (
          <input
            type="date"
            ref={dateRef}
            value={new Date(newDate).toISOString().split("T")[0]}
            onChange={handleChangeDate}
            className="form-control cost-item__date-input"
          />
        ) : (
          <span className="cost-date">
            Дата {formatDate(cost.date as string)}
          </span>
        )}
      </div>
      <div className="cost-item-right d-flex align-items-center">
        {edit ? (
          <input
            value={newPrice}
            ref={priceRef}
            onChange={handleChangePrice}
            className="form-control cost-item__price-input"
          />
        ) : (
          <span style={{ marginRight: "10px" }}>Сумма {cost.price}</span>
        )}

        {edit ? (
          <div className="btn-block__inner">
            <button
              className="btn btn-success btn-save"
              onClick={handleEditCost}
              style={{ marginRight: "10px" }}
            >
              {editSpinner ? <Spinner top={5} left={38} /> : "Сохранить"}
            </button>
            <button
              className="btn btn-danger btn-cancel"
              onClick={cancelEditCost}
            >
              Отмена
            </button>
          </div>
        ) : (
          <button className="btn btn-primary btn-edit" onClick={allowEditCost}>
            Изменить
          </button>
        )}
        <button className="btn btn-danger btn-delete" onClick={deleteCost}>
          {deleteSpinner ? <Spinner top={5} left={5} /> : <span>&times;</span>}
        </button>
      </div>
    </li>
  );
};

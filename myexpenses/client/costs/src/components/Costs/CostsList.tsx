import { ICost } from "../../types";
import { CostItem } from "./CostsItem";

export const CostsList = ({ costs }: { costs: ICost[] }) => {
  return (
    <ul className="list-group">
      {costs.map((cost, index) => (
        <CostItem cost={cost} index={index + 1} key={cost._id} />
      ))}
    </ul>
  );
};

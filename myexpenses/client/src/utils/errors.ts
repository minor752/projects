import { AxiosError } from "axios";
import { ICost, IHandleAxiosErrorPayload } from "../types";
import { getAuthDataFromLS, removeUser } from ".";
import {
  createCostFx,
  deleteCostFx,
  getCostsFx,
  refreshTokenFx,
  updateCostFx,
} from "../api/costsClient";
import { createCost, setCosts, updateCost } from "../context";

export const handleAxiosError = async (
  error: unknown,
  payload: IHandleAxiosErrorPayload | null = null
) => {
  const errorMessage =
    ((error as AxiosError).response?.data as { message: string }).message ||
    ((error as AxiosError).response?.data as { error: string }).error;

  if (errorMessage) {
    if (errorMessage === "jwt expired") {
      const payloadData = payload as IHandleAxiosErrorPayload;
      const authData = getAuthDataFromLS();

      refreshTokenFx({
        url: "/auth/refresh",
        token: authData.refresh_token,
        username: authData.username,
      });

      if (payload !== null) {
        switch (payloadData.type) {
          case "get":
            const costs = await getCostsFx({
              url: "/cost",
              token: authData.access_token,
            });

            setCosts(costs);
            break;
          case "create":
            const cost = await createCostFx({
              url: "/cost",
              token: authData.access_token,
              cost: { ...payloadData.createCost?.cost } as ICost,
            });

            if(!cost) return

            createCost(cost);
            break;
          case "update": {
            const cost = await updateCostFx({
              url: "/cost",
              token: authData.access_token,
              cost: { ...payloadData.updateCost?.cost } as ICost,
              id: payloadData.updateCost?.id as string
            });

            if(!cost) return

            updateCost(cost);
            break;
          }
          case "delete":
            await deleteCostFx({
              url: "/cost",
              token: authData.access_token,
              id: payloadData.deleteCost?.id as string,
            });
            break;
          default:
            break;
        }
      }
    } else {
      console.log(errorMessage);
      removeUser();
    }
  }
};

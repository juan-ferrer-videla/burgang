import { getPhones } from "@/lib/services/phones";
import React from "react";
import Order from "./Order";

const OrderWrapper = async () => {
  const phones = await getPhones();
  return <Order phones={phones} />;
};

export default OrderWrapper;

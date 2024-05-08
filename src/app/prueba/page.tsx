'use client';

import { FC } from "react";
import { useBearStore } from "../hooks/hooks";

const OtroComponente: FC = () => {
  const bear = useBearStore();
  const bearStore: any = useBearStore().getState();

  console.log("bears --->", bearStore.bears);

  return (
    <div>
      <h2>Otro Componente</h2>
      <p>Número actual de oso</p>
      <button onClick={() => bear.setState({ bears: 10 })}>
        Aumentar Población de Osos
      </button>
    </div>
  );
};

export default OtroComponente;

"use client";
import { store } from "@/store/store";
import React from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { io } from "socket.io-client";
import SocketContext from "../context/socketContext";

function ReduxProvider({ children }: { children: React.ReactNode }) {
  var socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URI as string);
  return (
    <SocketContext.Provider value={socket}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistStore(store)}>
          {children}
        </PersistGate>
      </Provider>
    </SocketContext.Provider>
  );
}

export default ReduxProvider;

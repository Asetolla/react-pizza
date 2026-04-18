import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./scss/app.scss";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
const Cart = React.lazy(() => import("./pages/Cart"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const FullPizza = React.lazy(() => import("./pages/FullPizza"));
const App = () => {
  return (
    <Suspense fallback="Загрузка данных">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pizza/:id" element={<FullPizza />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;

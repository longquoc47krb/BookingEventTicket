import { createContext, useContext, useState } from "react";

const UserActionContext = createContext();
const UserActionDispatchContext = createContext();

export const UserActionContextProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  return (
    <UserActionContext.Provider value={wishlist}>
      <UserActionDispatchContext.Provider value={setWishlist}>
        {children}
      </UserActionDispatchContext.Provider>
    </UserActionContext.Provider>
  );
};
export const useUserActionContext = () => {
  const context = useContext(UserActionContext);
  return context;
};
export const useUserActionDispatchContext = () => {
  const context = useContext(UserActionDispatchContext);
  return context;
};

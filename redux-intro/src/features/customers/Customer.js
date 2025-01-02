import { useSelector } from "react-redux";

function Customer() {
  // exactly name that we provided to rootReducer
  const customer = useSelector((store) => store.customer.fullName);
  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;

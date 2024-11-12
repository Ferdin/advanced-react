import { useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};

const depositAmount = 150;
const withdrawAmount = 50;
const loanAmount = 5000;

function reducer(state, action) {
  switch (action.type) {
    case "enableActive":
      return {
        ...state,
        isActive: true,
      };

    case "disableActive":
      return {
        ...initialState,
      };

    case "despositAmount":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "withdrawAmount":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "requestLoan":
      return {
        ...state,
        balance: state.balance + action.payload,
        loan: state.loan + action.payload,
      };
    case "payLoan":
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: state.loan - state.balance,
      };
    default:
      throw new Error("Error in handling");
  }
}

function App() {
  const [{ balance, loan, isActive }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const checkActive = isActive ? true : false;
  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button
          onClick={() => {
            dispatch({ type: "enableActive" });
          }}
          disabled={checkActive}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "despositAmount", payload: depositAmount });
          }}
          disabled={!checkActive}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            if (balance > withdrawAmount) {
              dispatch({ type: "withdrawAmount", payload: withdrawAmount });
            } else {
              alert("Insufficient fund");
            }
          }}
          disabled={!checkActive}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "requestLoan", payload: loanAmount });
          }}
          disabled={!checkActive}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            if (balance >= loan && loan > 0) {
              dispatch({ type: "payLoan" });
            } else if (balance === 0 && loan === 0) {
              alert("Cannot make the request.");
            } else {
              alert("Insufficient funds to pay loan");
            }
          }}
          disabled={!checkActive}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            if (loan > 0) {
              alert("You should pay off the loan first to close this account.");
            } else {
              dispatch({ type: "disableActive" });
            }
          }}
          disabled={!checkActive}
        >
          Close account
        </button>
      </p>
    </div>
  );
}

export default App;

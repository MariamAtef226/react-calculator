import { useState } from "react";

function getKeyByValue(map, searchValue) {
  for (let [key, value] of map.entries()) {
    if (value === searchValue) {
      return key;
    }
  }
  return undefined;
}

function App() {
  let [value, setValue] = useState(0);
  let operations = new Map([
    ["multiply", "*"],
    ["add", "+"],
    ["subtract", "-"],
    ["divide", "/"],
  ]);
  let numbers = new Map([
    ['zero','0'],
    ['one','1'],
    ['two','2'],['three','3'],['four','4'],['five','5'],['six','6'],['seven','7'],['eight','8'],['nine','9'],['decimal','.']
  ]);
  // check repetition of operands
  // don't start with zero

  function enterOperation(event) {
    let type = event.target.id;
    if (type != "subtract") {
      if (!getKeyByValue(operations, value[value.length - 1])) {
        setValue((prev) => {
          if (prev == "0") return prev;
          else return prev + operations.get(type);
        });
      }
      else{
        setValue((prev) => {
           return (prev.slice(0,prev.length-1) + operations.get(type));
        });

      }
    } else {
      setValue((prev) => {
        if (prev == "0") return "-";
        else return prev + "-";
      });
    }
  }

  function enterNumber(event){
    // check if this is the first digit:
    let type = event.target.id;
    if (!getKeyByValue(operations, value[value.length - 1])) {
      // if not the first digit, eth is allowed
      // check if there are more than one decimal point
      setValue(prev=>{ if (prev =='0') return numbers.get(type)
      else return String(prev)+String(numbers.get(type))})
    }
    else{
      if (type!='zero'){
        setValue(prev=>String(prev)+String(numbers.get(type)))
      }
    }

  }

  return (
    <>
      <div className="calc-body">
        <div className="screen text-end pt-5 pe-2" id="display">
          {value}
        </div>
        <div className="buttons">
          <div className="row outer container-fluid justify-content-center">
            <button id="clear" className="col-6 on" onClick={() => setValue(0)}>
              AC
            </button>
            <button
              id="multiply"
              className="col-3 operation"
              onClick={enterOperation}
            >
              x
            </button>
            <button
              id="divide"
              className="col-3 operation"
              onClick={enterOperation}
            >
              /
            </button>
          </div>
          <div className="d-flex outer row container-fluid justify-content-center">
            <div className="numbers ">
              <div className="row ">
                <button id="seven" className="col-3 number" onClick={enterNumber}>
                  7
                </button>
                <button id="eight" className="col-3 number" onClick={enterNumber}>
                  8
                </button>
                <button id="nine" className="col-3 number" onClick={enterNumber}>
                  9
                </button>
                <button
                  id="subtract"
                  className="col-3 operation"
                  onClick={enterOperation}
                >
                  -
                </button>
              </div>
              <div className="row ">
                <button id="four" className="col-3 number" onClick={enterNumber}>
                  4
                </button>
                <button id="five" className="col-3 number" onClick={enterNumber}>
                  5
                </button>
                <button id="six" className="col-3 number" onClick={enterNumber}>
                  6
                </button>
                <button
                  id="add"
                  className="col-3 operation"
                  onClick={enterOperation}
                >
                  +
                </button>
              </div>

              <div className="row d-flex ">
                <div className="col-9">
                  <div className="row">
                    <button id="one" className="col-4 number" onClick={enterNumber}>
                      1
                    </button>
                    <button id="two" className="col-4 number" onClick={enterNumber}>
                      2
                    </button>
                    <button id="three" className="col-4 number" onClick={enterNumber}>
                      3
                    </button>
                  </div>
                  <div className="row">
                    <button id="zero" className="col-8 number" onClick={enterNumber}>
                      0
                    </button>
                    <button id="decimal" className="col-4 number" onClick={enterNumber}>
                      .
                    </button>
                  </div>
                </div>
                <button id="equals" className="col-3 equal" onClick={()=>{setValue(eval(value))}}>
                  =
                </button>
              </div>
            </div>
            <div className="col-3 d-flex flex-column m-0 p-0"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

const getKeyType = (key) => {
  const dataAction = key.data("action");
  if (!dataAction) return "number";
  if (
    dataAction == "add" ||
    dataAction == "subtract" ||
    dataAction == "multiply" ||
    dataAction == "divide"
  )
    return "operator";
  return dataAction;
};
const updateCalculatorState = (key, state, calculatedValue, dispNum) => {
  // console.log("in updateCalculatorState function");
  // variables and preperties needed
  // 1.key
  // 2.state
  // 3.calculatedValue
  // 4.dispNum
  const firstValue = state.data("firstValue");
  const previousKey = state.data("previousKey");
  const operator = state.data("operator");
  const keyType = getKeyType(key);
  const modVal = state.data("modVal");
  state.data("previousKey", keyType);
  key.siblings().removeClass("is-depressed");
  if (keyType === "operator") {
    key.addClass("is-depressed");
    state.data("operator", key.data("action"));
    state.data(
      "firstValue",
      firstValue &&
        operator &&
        previousKey !== "operator" &&
        previousKey !== "calculate"
        ? calculatedValue
        : dispNum
    );
  }
  if (keyType !== "clear") {
    $("[data-action ='clear']").text("CE");
  }
  if (keyType === "clear") {
    if (key.text() === "AC") {
      state.data("firstValue", "");
      state.data("modval", "");
      state.data("operator", "");
      state.data("PreviousKey", "");
    } else {
      key.text("AC");
    }
  }
  if (keyType === "calculate") {
    state.data(
      "modVal",
      firstValue && previousKey === "calculate" ? modVal : dispNum
    );
  }
};
const createResultString = (key, dispNum, state) => {
  // console.log("in createReslstring function");
  // variables required are:
  // 1.pressedNum
  // 2.dispNum
  // 3.previousKey
  // 4.dataAction
  // 5.calculator.data("firstValue")
  // 6.calculator.data("operator")
  // 7.calculator.data("modVal")
  const pressedNum = key.text();
  const firstValue = state.data("firstValue");
  const operator = state.data("operator");
  const modVal = state.data("modVal");
  const previousKey = state.data("previousKey");

  const keyType = getKeyType(key);
  if (keyType === "number") {
    return dispNum === "0" ||
      previousKey === "operator" ||
      previousKey === "calculate"
      ? pressedNum
      : dispNum + pressedNum;
  }
  if (keyType === "decimal") {
    if (previousKey === "operator" || previousKey === "calculate") return "0.";

    if (!dispNum.includes(".")) return dispNum + ".";
    return dispNum;
  }
  if (keyType === "operator") {
    return firstValue &&
      operator &&
      previousKey !== "operator" &&
      previousKey !== "calculate"
      ? calculate(firstValue, dispNum, operator)
      : dispNum;
  }
  if (keyType == "clear") {
    return 0;
  }
  if (keyType == "calculate") {
    return firstValue
      ? previousKey === "calculate"
        ? calculate(dispNum, modVal, operator)
        : calculate(firstValue, dispNum, operator)
      : dispNum;
  }
};
$('.calculator__keys').on("hover",button, ()=>{
  
})
$(".calculator__keys").on("click", "button", function () {
  const state = $(".calculator");
  const disp = $(".calculator__display");
  var dispNum = disp.text();
  const key = $(this);

  // pure function
  const resultString = createResultString(key, dispNum, state);

  // impure stuff
  disp.text(resultString);
  updateCalculatorState(key, state, resultString, dispNum);

  // original code

  // const previousKey = $(".calculator").data("previousKey");
  // const disp = $(".calculator__display");
  // const dataAction = $(this).data("action");
  // var dispNum = disp.text();

  // if (dataAction !== "clear") {
  //   $("[data-action ='clear']").text("CE");
  // }

  // $(".key--operator").removeClass("is-depressed");
  // if (!dataAction) {
  //   // console.log("Number Key");
  //   var pressedNum = $(this).text();
  //   if (
  //     dispNum === "0" ||
  //     previousKey === "operator" ||
  //     previousKey === "calculate"
  //   ) {
  //     disp.text(pressedNum);
  //   } else {
  //     disp.text(dispNum + pressedNum);
  //   }
  //   $(".calculator").data("previousKey", "number");
  // }
  // if (dataAction == "decimal") {
  //   //console.log("Decimal Key");
  //   if (previousKey === "operator" || previousKey === "calculate") {
  //     disp.text("0.");
  //   } else if (!dispNum.includes(".")) {
  //     disp.text(dispNum + ".");
  //   }
  //   $(".calculator").data("previousKey", "decimal");
  // }
  // if (
  //   dataAction == "add" ||
  //   dataAction == "subtract" ||
  //   dataAction == "multiply" ||
  //   dataAction == "divide"
  // ) {
  //   // console.log("Operator Key");
  //   const firstValue = $(".calculator").data("firstValue");
  //   const secondValue = dispNum;
  //   const operator = $(".calculator").data("operator");
  //   if (
  //     firstValue &&
  //     operator &&
  //     previousKey !== "operator" &&
  //     previousKey !== "calculate"
  //   ) {
  //     dispNum = calculate(firstValue, secondValue, operator);
  //     disp.text(dispNum);
  //   }

  //   $(this).addClass("is-depressed");
  //   $(".calculator").data("firstValue", dispNum);
  //   $(".calculator").data("operator", dataAction);
  //   $(".calculator").data("previousKey", "operator");
  // }
  // if (dataAction == "clear") {
  //   // console.log("All Clear Key");
  //   disp.text("0");
  //   if ($(this).text() === "AC") {
  //     $(".calculator").data("firstValue", "");
  //     $(".calculator").data("modval", "");
  //     $(".calculator").data("operator", "");
  //     $(".calculator").data("previousKey", "");
  //   }
  //   $("[data-action ='clear']").text("AC");
  //   $(".calculator").data("previousKey", "clear");
  // }
  // if (dataAction == "calculate") {
  //   // console.log("Equal Kye");
  //   var secondValue = dispNum;
  //   var firstValue = $(".calculator").data("firstValue");
  //   const operator = $(".calculator").data("operator");
  //   // console.log(firstValue, secondValue, operator);
  //   if (firstValue) {
  //     if (previousKey === "calculate") {
  //       firstValue = dispNum;
  //       secondValue = $(".calculator").data("modval");
  //     }
  //     disp.text(calculate(firstValue, secondValue, operator));
  //   }
  //   $(".calculator").data("modval", secondValue);
  //   $(".calculator").data("previousKey", "calculate");
  // }
});
function keyboardKeyType(e) {
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    return "operator";
  }
  if (e.key === ".") {
    return "decimal";
  }
  if (e.key === "Enter") {
    return "calculate";
  }
  if (isFinite(e.key)) {
    return "number";
  }
}
const knowKeyboardOperator = (key) => {
  switch (key) {
    case "+":
      return "add";
      break;
    case "-":
      return "subtract";
      break;
    case "*":
      return "multiply";
      break;
    case "/":
      return "divide";
      break;
  }
};
const keyboardPressedKey = (key) => {
  switch (key) {
    case "1":
      $("button:contains('1')").addClass("is-depressed");
      setTimeout(() => {
        $("button:contains('1')").removeClass("is-depressed");
      }, 100);
      break;
    case "2":
      $("button:contains('2')").addClass("is-depressed");
      setTimeout(() => {
        $("button:contains('2')").removeClass("is-depressed");
      }, 100);
      break;
    case "3":
      $("button:contains('3')").addClass("is-depressed");
      setTimeout(() => {
        $("button:contains('3')").removeClass("is-depressed");
      }, 100);
      break;
    case "4":
      $("button:contains('4')").addClass("is-depressed");
      setTimeout(() => {
        $("button:contains('4')").removeClass("is-depressed");
      }, 100);
      break;
    case "5":
      $("button:contains('5')").addClass("is-depressed");
      setTimeout(() => {
        $("button:contains('5')").removeClass("is-depressed");
      }, 100);
      break;
    case "6":
      $("button:contains('6')").addClass("is-depressed");
      setTimeout(() => {
        $("button:contains('6')").removeClass("is-depressed");
      }, 100);
      break;
    case "7":
      $("button:contains('7')").addClass("is-depressed");
      setTimeout(() => {
        $("button:contains('7')").removeClass("is-depressed");
      }, 100);
      break;
    case "8":
      $("button:contains('8')").addClass("is-depressed");
      setTimeout(() => {
        $("button:contains('8')").removeClass("is-depressed");
      }, 100);
      break;
    case "9":
      $("button:contains('9')").addClass("is-depressed");
      setTimeout(() => {
        $("button:contains('9')").removeClass("is-depressed");
      }, 100);
      break;
    case "0":
      $("button:contains('0')").addClass("is-depressed");
      setTimeout(() => {
        $("button:contains('0')").removeClass("is-depressed");
      }, 100);
      break;
  }
};
const keyboardPressedOperator = (key) => {
  switch (key) {
    case "+":
      $("[data-action = 'add']").addClass("is-depressed");
      break;
    case "-":
      $("[data-action  = 'subtract']").addClass("is-depressed");
      break;
    case "*":
      $("[data-action = 'multiply']").addClass("is-depressed");
      break;
    case "/":
      $("[data-action = 'divide']").addClass("is-depressed");
      break;
  }
};
$(document).keydown((e) => {
  // console.log(e.key);
  // console.log(keyboardKeyType(e));
  const state = $(".calculator");
  const disp = $(".calculator__display");
  var dispNum = disp.text();
  var dataAction = keyboardKeyType(e);
  const previousKey = $(".calculator").data("previousKey");

  if (dataAction !== "clear") {
    $("[data-action ='clear']").text("CE");
  }

  $(".key--operator").removeClass("is-depressed");
  if (dataAction === "number") {
    // console.log("Number Key");

    var pressedNum = e.key;
    keyboardPressedKey(pressedNum);
    if (
      dispNum === "0" ||
      previousKey === "operator" ||
      previousKey === "calculate"
    ) {
      disp.text(pressedNum);
    } else {
      disp.text(dispNum + pressedNum);
    }
    state.data("previousKey", "number");
  }
  if (dataAction == "decimal") {
    //console.log("Decimal Key");
    $("[data-action = 'decimal']").addClass("is-depressed");
    setTimeout(() => {
      $("[data-action = 'decimal']").removeClass("is-depressed");
    }, 100);
    if (previousKey === "operator" || previousKey === "calculate") {
      disp.text("0.");
    } else if (!dispNum.includes(".")) {
      disp.text(dispNum + ".");
    }
    state.data("previousKey", "decimal");
  }
  if (dataAction == "operator") {
    // console.log("Operator Key");
    keyboardPressedOperator(e.key);
    const firstValue = state.data("firstValue");
    const secondValue = dispNum;
    const operator = state.data("operator");
    if (
      firstValue &&
      operator &&
      previousKey !== "operator" &&
      previousKey !== "calculate"
    ) {
      dispNum = calculate(firstValue, secondValue, operator);
      disp.text(dispNum);
    }
    var operation = knowKeyboardOperator(e.key);
    state.data("firstValue", dispNum);
    state.data("operator", operation);
    state.data("previousKey", "operator");
  }
  // if (dataAction == "clear") {
  //   // console.log("All Clear Key");
  //   disp.text("0");
  //   if ($(this).text() === "AC") {
  //     $(".calculator").data("firstValue", "");
  //     $(".calculator").data("modval", "");
  //     $(".calculator").data("operator", "");
  //     $(".calculator").data("previousKey", "");
  //   }
  //   $("[data-action ='clear']").text("AC");
  //   $(".calculator").data("previousKey", "clear");
  // }
  if (dataAction == "calculate") {
    $('[data-action ="calculate"]').addClass("is-depressed");
    setTimeout(() => {
      $('[data-action ="calculate"]').removeClass("is-depressed");
    }, 100);
    // console.log("Equal Kye");
    var secondValue = dispNum;
    var firstValue = state.data("firstValue");
    const operator = state.data("operator");
    // console.log(firstValue, secondValue, operator);
    if (firstValue) {
      if (previousKey === "calculate") {
        firstValue = dispNum;
        secondValue = $(".calculator").data("modval");
      }
      disp.text(calculate(firstValue, secondValue, operator));
    }
    $(".calculator").data("modval", secondValue);
    $(".calculator").data("previousKey", "calculate");
  }
});
function calculate(firstValue, secondValue, operator) {
  firstValue = parseFloat(firstValue);
  secondValue = parseFloat(secondValue);
  // console.log(firstValue, secondValue, operator);
  if (operator === "add") return firstValue + secondValue;
  if (operator === "subtract") return firstValue - secondValue;
  if (operator === "multiply") return firstValue * secondValue;
  if (operator === "divide") return firstValue / secondValue;
}

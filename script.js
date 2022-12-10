class Calculator {
    constructor(currentOperation, previousOperation) {
        this.currentOperation = currentOperation;
        this.previousOperation = previousOperation;
        this.clear();
    }

    clear() {
        this.firstOperand = "";
        this.operation = "";
        this.secondOperand = "";
        this.previousOperand = "";
    }

    chooseOperator(operation) {
        this.operation = operation;
    }

    appendNumber(number) {
        if (this.secondOperand === "" && this.operation === "") {
            if (number === "." && this.firstOperand.includes(".")) return;
            this.firstOperand = this.firstOperand + number.toString();
        } else if (this.operation !== "") {
            if (number === "." && this.secondOperand.includes(".")) return;
            this.secondOperand = this.secondOperand + number.toString();
        }
    }

    delete() {
        if (this.operation === "" && this.secondOperand === "") {
            this.firstOperand = this.firstOperand.toString().slice(0, -1);
        } else if (this.firstOperand !== "" && this.secondOperand === "") {
            this.operation = "";
        } else {
            this.secondOperand = this.secondOperand.toString().slice(0, -1);
        }
    }

    computation() {
        let result;
        const first = parseFloat(this.firstOperand);
        const second = parseFloat(this.secondOperand);

        switch (this.operation) {
            case "+":
                result = first + second;
                break;
            case "-":
                result = first - second;
                break;
            case "÷":
                result = first / second;
                break;
            case "x":
                result = first * second;
                break;
            default:
                return;
        }

        this.previousOperand = `${this.firstOperand} ${this.operation} ${this.secondOperand}`;
        this.firstOperand = result;
        this.operation = "";
        this.secondOperand = "";
    }

    updateDisplay() {
        this.currentOperation.innerText = `${this.firstOperand} ${this.operation} ${this.secondOperand}`;

        this.previousOperation.innerText = this.previousOperand;
    }
}

const currentOperation = document.querySelector(".current-operand");
const previousOperation = document.querySelector(".previous-operand");
const buttons = document.querySelectorAll("[data-number]");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteBtn = document.querySelector("[data-delete]");
const operator = document.querySelectorAll("[data-operation]");
const equalBtn = document.querySelector("[data-equals]");

const calculator = new Calculator(currentOperation, previousOperation);

buttons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operator.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperator(button.innerText);
        calculator.updateDisplay();
    });
});

equalBtn.addEventListener("click", () => {
    calculator.computation();
    calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteBtn.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
});

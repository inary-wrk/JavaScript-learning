/*
1. Дан код:
var a = 1, b = 1, c, d;
c = ++a; alert(c);           // 2    в выражении a = 2 префиксный инкремент, после a = 2
d = b++; alert(d);           // 1    в выражении b = 1 постфиксный инкремент, после b = 2
c = (2+ ++a); alert(c);      // 5    в выражении a = 3 префиксный инкремент, после a = 3
d = (2+ b++); alert(d);      // 4    в выражении b = 2 постфиксный инкремент, после b = 3
alert(a);                    // 3   
alert(b);                    // 3
Почему код даёт именно такие результаты? 


2. Чему будет равен x в примере ниже?
var a = 2;
var x = 1 + (a *= 2);
x = 5
*/

/* 
3. Объявить две целочисленные переменные a и b и задать им произвольные начальные значения. Затем написать скрипт, который работает по 
   следующему принципу:
    если a и b положительные, вывести их разность;
    если а и b отрицательные, вывести их произведение;
    если а и b разных знаков, вывести их сумму; ноль можно считать положительным числом.
*/

const abLogic = (a, b) => {
  if (a >= 0 && b >= 0) return a - b;
  if (a < 0 && b < 0) return a * b;
  return a + b;
};
console.log(abLogic(5, 10));
console.log(abLogic(-5, -10));
console.log(abLogic(5, -10));

//4. Присвоить переменной а значение в промежутке [0..15]. С помощью оператора switch организовать вывод чисел от a до 15.
console.log("4. Присвоить переменной а значение в промежутке [0..15].");
const LogRangeNumbers = (a) => {
  switch (a) {
    case 0:
      console.log(0);
    case 1:
      console.log(1);
    case 2:
      console.log(2);
    case 3:
      console.log(3);
    case 4:
      console.log(4);
    case 5:
      console.log(5);
    case 6:
      console.log(6);
    case 7:
      console.log(7);
    case 8:
      console.log(8);
    case 9:
      console.log(9);
    case 10:
      console.log(10);
    case 11:
      console.log(11);
    case 12:
      console.log(12);
    case 13:
      console.log(13);
    case 14:
      console.log(14);
    case 15:
      console.log(15);
  }
};
console.log(LogRangeNumbers(1));

//5. Реализовать основные 4 арифметические операции в виде функций с двумя параметрами. Обязательно использовать оператор return.
function Addition(a, b) {
  return a + b;
}

function Subtraction(a, b) {
  return a - b;
}

function Multiplication(a, b) {
  return a * b;
}

function Division(a, b) {
  return a / b;
}

//6. Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation)
function mathOperation(arg1, arg2, operation) {
  switch (operation) {
    case "Addition":
      return Addition(arg1, arg2);
    case "Subtraction":
      return Subtraction(arg1, arg2);
    case "Multiplication":
      return Multiplication(arg1, arg2);
    case "Division":
      return Division(arg1, arg2);
  }
}

console.log("arg1 = 10, arg2 = 5");
console.log("Addition", mathOperation(10, 5, "Addition"));
console.log("Subtraction", mathOperation(10, 5, "Subtraction"));
console.log("Multiplication", mathOperation(10, 5, "Multiplication"));
console.log("Division", mathOperation(10, 5, "Division"));

// 7. *Сравнить null и 0. Попробуйте объяснить результат.
// null по особому обрабатывается оператором ==, ToNumber не вызывается, он вызывается только для Strings, Numbers, и Booleans

//8. *С помощью рекурсии организовать функцию возведения числа в степень. Формат: function power(val, pow), где val – заданное число,
//pow – степень.
function power(val, pow) {
  if (pow == 0) return 1;
  if (pow == 1) return val;
  return val * power(val, pow - 1);
}

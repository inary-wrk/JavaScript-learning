/*
1. Написать функцию, преобразующую число в объект. Передавая на вход число от 0 до 999, мы должны получить на 
   выходе объект, в котором в соответствующих свойствах описаны единицы, десятки и сотни. Например, для числа 245
   мы должны получить следующий объект: {‘единицы’: 5, ‘десятки’: 4, ‘сотни’: 2}. Если число превышает 999, 
   необходимо выдать соответствующее сообщение с помощью console.log и вернуть пустой объект.
*/

function numberToObject(number) {
  if (number < 0 || number > 999) {
    console.log("the number must be in the range 0..999");
    return {};
  }
  return {
    единицы: number % 10,
    десятки: number >= 10 ? ((number % 100) / 10) ^ 0 : 0,
    сотни: number >= 100 ? ((number % 1000) / 100) ^ 0 : 0,
  };
}

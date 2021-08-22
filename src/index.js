// 1. С помощью цикла while вывести все простые числа в промежутке от 0 до 100.
function isPrime(number) {
  if (number === 2) return true;
  else if (number < 2 || number % 2 === 0) {
    return false;
  }

  for (let i = 3, numSqrt = Math.sqrt(number); i <= numSqrt; i += 2) {
    if (number % i === 0) {
      return false;
    }
  }
  return true;
}

const listPrimeNumbers = (number) => {
  while (number > 1) {
    if (isPrime(number)) console.log(number);
    number--;
  }
};
listPrimeNumbers(100);

/*
2. С этого урока начинаем работать с функционалом интернет-магазина. Предположим, есть сущность корзины. Нужно реализовать 
функционал подсчета стоимости корзины в зависимости от находящихся в ней товаров.
3. Товары в корзине хранятся в массиве. Задачи:
a) Организовать такой массив для хранения товаров в корзине;
b) Организовать функцию countBasketPrice, которая будет считать стоимость корзины.
*/
console.log(
  "2-3. С этого урока начинаем работать с функционалом интернет-магазина."
);

function product(id, productName, price, quantity) {
  this.id = id;
  this.productName = productName;
  this.price = price;
  this.quantity = quantity;
}

const basket = {
  products: [],
  countBasketPrice: function () {
    let summ = 0;
    for (const product of this.products) {
      summ += product.price * product.quantity;
    }
    return summ;
  },
};

basket.products.push(new product(4185, "Пылесос Philips", 4660, 1));
basket.products.push(new product(1428, "Мыло", 54, 5));
basket.products.push(new product(2365, "Монитор LG", 30200, 1));
basket.products.push(new product(2365, "HDMI кабель", 340, 2));

console.log(basket.countBasketPrice());

// 4.*Вывести с помощью цикла for числа от 0 до 9, не используя тело цикла.
console.log(
  "4. Вывести с помощью цикла for числа от 0 до 9, не используя тело цикла"
);

for (let i = 0; i < 10; console.log(i++)) {}

// 5. *Нарисовать пирамиду с помощью console.log.
for (let i = 1; i <= 40; i += 2) {
  let str = " ".repeat(20 - i / 2) + "*".repeat(i);
  console.log(str);
}

while (true) {
  let temperatureC = prompt("Enter the temperature in degrees Celsius");
  if (!isNaN(temperatureC)) {
    let temperatureF = (9 / 5) * temperatureC + 32;
    alert("Temperature in degrees Fahrenheit " + Math.round(temperatureF));
    break;
  } else {
    alert("The Temperature should be a number");
  }
}

let name = "Василий";
let admin = name;
console.log(admin);

console.log(1000 + "108");

/* 
defer сообщает браузеру, что он должен продолжать обрабатывать страницу и 
загружать скрипт в фоновом режиме, а затем запустить этот скрипт, когда он загрузится

Скрипты с defer никогда не блокируют страницу.
Скрипты с defer всегда выполняются, когда дерево DOM готово, но до события DOMContentLoaded


aтрибут async означает, что скрипт абсолютно независим:

    Страница не ждёт асинхронных скриптов, содержимое обрабатывается и отображается.
    Событие DOMContentLoaded и асинхронные скрипты не ждут друг друга:
        DOMContentLoaded может произойти как до асинхронного скрипта (если асинхронный скрипт 
        завершит загрузку после того, как страница будет готова), …так и после асинхронного 
        скрипта (если он короткий или уже содержится в HTTP-кеше)
    Остальные скрипты не ждут async, и скрипты casync не ждут другие скрипты.
*/

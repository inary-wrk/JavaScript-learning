const gameField = [
  [null, null, "goblin", null, null, null, null, "troll", null, null],
  ["goblin", null, null, "troll", null, "cyclops", null, null, "goblin", null],
  [null, null, "troll", null, "goblin", null, "goblin", null, null, "cyclops"],
  ["goblin", null, "goblin", null, null, "cyclops", null, null, "goblin", null],
  [null, null, null, null, "goblin", null, "cyclops", "troll", null, "troll"],
  [
    "troll",
    "goblin",
    "cyclops",
    "goblin",
    null,
    null,
    "goblin",
    null,
    "cyclops",
    null,
  ],
  [null, null, null, null, null, "cyclops", null, null, null, null],
  [
    null,
    "cyclops",
    null,
    "goblin",
    "cyclops",
    null,
    null,
    "goblin",
    null,
    "troll",
  ],
  ["troll", null, "goblin", null, "goblin", "troll", null, null, null, null],
  [null, "goblin", null, null, null, null, "troll", "goblin", null, "dragon"],
];

const MONSTERS = {
  goblin: {
    power: 10,
  },
  troll: {
    power: 20,
  },
  cyclops: {
    power: 50,
  },
  dragon: {
    power: 100,
  },
};

const gameFieldLengthValidation = (gameField) => {
  for (let i = 0; i < gameField.length; i++) {
    if (gameField[i].length !== gameField.length) {
      console.log("Invalid dimensions of the playing field.");
      return false;
    }
  }
  return true;
};

const gameFieldCellsValidation = (gameField, validator) => {
  for (let i = 0; i < gameField.length; i++) {
    for (let j = 0; j < gameField[i].length; j++) {
      if (validator.indexOf(gameField[i][j]) === -1) {
        console.log(`Invalid cell[${j},${i}] of the playing field.`);
        console.log(gameField[i][j]);
        return false;
      }
    }
  }
  return true;
};

const stateOfGame = {
  player: {
    power: 10,
    position: {
      x: 0,
      y: 0,
    },
  },
  playerMoves: {
    moves: [`start: (${this.player.position.x}, ${this.player.position.y})`],
    addMove: function (x, y) {
      this.moves.push(`move ${this.moves.length - 1}: (${x}, ${y})`);
    },
  },
};

const GAME_FIELD = {
  WIDTH: gameField[0].length,
  HEIGHT: gameField.length,
  correctField:
    gameFieldLengthValidation(gameField) &&
    gameFieldCellsValidation(gameField, Object.keys(MONSTERS).concat(null)),
};

const MOVEMENTS_OF_PLAYER = {
  up: "up",
  down: "down",
  right: "right",
  left: "left",
};

const movementsOfPlayer = {
  up: () => {
    stateOfGame.player.position.y -= 1;
  },
  down: () => {
    stateOfGame.player.position.y += 1;
  },
  right: () => {
    stateOfGame.player.position.x += 1;
  },
  left: () => {
    stateOfGame.player.position.x -= 1;
  },
};

const getAvailableMovements = () => {
  const availableMovements = [];

  if (stateOfGame.player.position.y >= 1) {
    availableMovements.push(MOVEMENTS_OF_PLAYER.up);
  }

  if (stateOfGame.player.position.y < GAME_FIELD.HEIGHT - 1) {
    availableMovements.push(MOVEMENTS_OF_PLAYER.down);
  }

  if (stateOfGame.player.position.x >= 1) {
    availableMovements.push(MOVEMENTS_OF_PLAYER.left);
  }

  if (stateOfGame.player.position.x < GAME_FIELD.WIDTH - 1) {
    availableMovements.push(MOVEMENTS_OF_PLAYER.right);
  }

  return availableMovements;
};

const getMessageForMovement = (availableMovements) => {
  const movementString = `Введите направление движения(${availableMovements.join(
    ", "
  )}): `;
  const currentCoordinatesString = `Текущие координаты x: ${stateOfGame.player.position.x} y: ${stateOfGame.player.position.y}`;

  return `${currentCoordinatesString}\n${movementString}`;
};

while (GAME_FIELD.correctField) {
  const availableMovements = getAvailableMovements();
  const stringMovementOfPlayer = prompt(
    getMessageForMovement(availableMovements)
  );
  if (availableMovements.indexOf(stringMovementOfPlayer) === -1) {
    // некорректный ввод
    alert("Некорректный воод, попробуйте еще раз");

    //TODO: вернуть continue после отладки
    break;
    //continue;
  }

  movementsOfPlayer[stringMovementOfPlayer]();

  // проверка на монстра
  const gameCell =
    gameField[stateOfGame.player.position.y][stateOfGame.player.position.x];
  if (gameCell === null) {
    continue;
  }

  const monster = MONSTERS[gameCell];
  // сражение с монстром
  let messageOfBattle = `Вы встретили монстра ${gameCell}\n`;
  if (stateOfGame.player.power >= monster.power) {
    stateOfGame.player.power += monster.power;
    messageOfBattle += "Вы выиграли\n";
    messageOfBattle += `Ваша сила теперь ${stateOfGame.player.power}`;
    alert(messageOfBattle);
  } else {
    messageOfBattle += "Вы проиграли\n";
    messageOfBattle += "Конец игры";
    alert(messageOfBattle);
  }
}

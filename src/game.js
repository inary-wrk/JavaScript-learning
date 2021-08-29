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
      _x: 0,
      set x(value) {
        this._x = value;
        this.parent.currentMove++;
      },
      get x() {
        return this._x;
      },

      _y: 0,
      set y(value) {
        this._y = value;
        this.parent.currentMove++;
      },
      get y() {
        return this._y;
      },
    },
    currentMove: 0,

    init: function () {
      this.position.parent = this;
      delete this.init;
      return this;
    },
  }.init(),

  playerMoves: {
    moves: [],
    addMove: function (x, y, additionalInformation = ``) {
      this.moves.push(
        `ход ${this.moves.length}: (${x}, ${y})` + additionalInformation
      );
    },
    addMoveAdditionalInformation: function (
      playerMoveNumber,
      additionalInformation
    ) {
      this.moves[playerMoveNumber] += additionalInformation;
    },
  },

  init: function () {
    this.playerMoves.moves.push(
      `старт: (${this.player.position._x}, ${this.player.position._y})`
    );
    return this;
  },
}.init();

const GAME_FIELD = {
  WIDTH: gameField[0].length,
  HEIGHT: gameField.length,
  CORRECT_FIELD:
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
  const currentCoordinatesString = `Текущие координаты (x: ${stateOfGame.player.position.x}, y: ${stateOfGame.player.position.y})`;
  const currentMoveString = `Текущий ход: ${
    stateOfGame.player.currentMove + 1
  }`;
  const viewOldMovesString = `Чтобы посмотреть предыдущие ходы, введите номер хода.`;

  return `${currentCoordinatesString}   ${currentMoveString}\n${movementString}\n${viewOldMovesString}`;
};

while (GAME_FIELD.CORRECT_FIELD) {
  const availableMovements = getAvailableMovements();
  const commandFromUser = prompt(getMessageForMovement(availableMovements));
  if (availableMovements.indexOf(commandFromUser) === -1) {
    const parsedNumber = parseInt(commandFromUser, 10);
    if (
      !isNaN(parsedNumber) &&
      parsedNumber >= 0 &&
      parsedNumber < stateOfGame.playerMoves.moves.length
    ) {
      alert(stateOfGame.playerMoves.moves[parsedNumber]);
      continue;
    }
    // некорректный ввод
    alert("Некорректный воод, попробуйте еще раз");

    //TODO: вернуть continue после отладки
    //break;
    continue;
  }

  movementsOfPlayer[commandFromUser]();

  stateOfGame.playerMoves.addMove(
    stateOfGame.player.position.x,
    stateOfGame.player.position.y
  );
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
    stateOfGame.playerMoves.addMoveAdditionalInformation(
      stateOfGame.player.currentMove,
      ` побежден ${gameCell}`
    );
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

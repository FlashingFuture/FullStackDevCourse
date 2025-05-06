function checkStrikeAndBall(playerNum, gameNum) {
  return playerNum.reduce(
    (acc, cur, idx) => {
      if (cur === gameNum[idx]) {
        acc.strike++;
      } else if (gameNum.includes(cur)) {
        acc.ball++;
      }
      return acc;
    },
    { strike: 0, ball: 0 }
  );
}

test("[3, 6, 1], [3, 6, 1] => 3스트라이크 0볼", () => {
  expect(checkStrikeAndBall([3, 6, 1], [3, 6, 1])).toEqual({
    strike: 3,
    ball: 0,
  });
});

test("361, 136 => 0스트라이크 3볼", () => {
  expect(checkStrikeAndBall([3, 6, 1], [1, 3, 6])).toEqual({
    strike: 0,
    ball: 3,
  });
});

test("361, 245 => 0스트라이크 0볼", () => {
  expect(checkStrikeAndBall([3, 6, 1], [2, 4, 5])).toEqual({
    strike: 0,
    ball: 0,
  });
});

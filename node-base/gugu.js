// 구구단 코드를 한번 작성해 볼꺼에요.
// 실제 출력이 아래와 같이 나오면 됩니다.
// 1 x 1 = 1 / 1 x 2 = 2 / 1 x 3 = 3 / 1 x 4 = 4 / 1 x 5 = 5 / 1 x 6 = 6 / 1 x 7 = 7 / 1 x 8 = 8 / 1 x 9 = 9
// 2 x 1 = 2 / 2 x 2 = 4 / 2 x 3 = 6 / 2 x 4 = 8 / 2 x 5 = 10 / 2 x 6 = 12 / 2 x 7 = 14 / 2 x 8 = 16 / 2 x 9 = 18
// ..
// 9 x 1 = 9 / 9 x 2 = 18 / 9 x 3 = 27 / 9 x 4 = 36 / 9 x 5 = 45 / 9 x 6 = 54 / 9 x 7 = 63 / 9 x 8 = 72 / 9 x 9 = 81
// 그러면 이제 코드를 작성해볼꺼에요.

for (let i = 1; i <= 9; i++) {
  let line = "";
  for (let j = 1; j <= 9; j++) {
    line += `${i} X ${j} = ${i * j}`;
    if (j < 9) {
      line += " / ";
    }
    // console.log(i + " X " + j + " = " + i * j);
  }
  console.log(line);
  // line.slice(0, line.length - 3)
}

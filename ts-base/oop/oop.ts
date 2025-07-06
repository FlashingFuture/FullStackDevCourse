class Employee {
  name: string;
  age: number;
  job: string;

  constructor(name: string, age: number, job: string) {
    this.name = name;
    this.age = age;
    this.job = job;
  }

  printEmployee(): void {
    console.log(`${this.name}은 ${this.age}세의 ${this.job}입니다.`);
  }
}

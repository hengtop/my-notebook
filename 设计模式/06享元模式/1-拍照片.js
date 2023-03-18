class Model {
  constructor(sex) {
    this.sex = sex;
  }
  takePhoto() {
    console.log(this.sex + '模特穿' + this.underwear + '号内衣')
  }
}

const femaleModel = new Model('female');
const maleModel = new Model('male');
for (let i = 1; i <= 50; i++) {
  maleModel.underwear = i
  maleModel.takePhoto();
}


for (let i = 1; i <= 50; i++) {
  femaleModel.underwear = i;
  femaleModel.takePhoto();
}
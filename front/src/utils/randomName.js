function capFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateName(){
  var name2 = ["engatusado","podrido","pancho","enloquecido","fisura","perruno","duro", "emponchado"];

  var name1 = ["el teto","el shony","el ricky","el marcelo","el ector"];

  var name = capFirst(name1[getRandomInt(0, name1.length + 1)]) + ' ' + capFirst(name2[getRandomInt(0, name2.length + 1)]);
  return name;

}

export default generateName

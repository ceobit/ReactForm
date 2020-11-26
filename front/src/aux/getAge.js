const agetostr = (age) => {
    let txt;
    let count = age % 100;
    if (count >= 5 && count <= 20) {
        txt = "лет";
    } else {
        count = count % 10;
        if (count === 1) {
            txt = "год";
        } else if (count >= 2 && count <= 4) {
            txt = "года";
        } else {
            txt = "лет";
        }
    }
    return age + " " + txt;
};

const getAge = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return agetostr(age);
};

export default getAge;
||||||| empty tree
=======
const agetostr = (age) => {
  let txt;
  let count = age % 100;
  if (count >= 5 && count <= 20) {
    txt = "лет";
  } else {
    count = count % 10;
    if (count === 1) {
      txt = "год";
    } else if (count >= 2 && count <= 4) {
      txt = "года";
    } else {
      txt = "лет";
    }
  }
  return age + " " + txt;
};

const getAge = (dateString) => {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return agetostr(age);
};

export default getAge;
>>>>>>> 44040003eb4f251244af4bc949fcebc3ef3647fe

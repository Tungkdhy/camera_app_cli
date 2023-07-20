//validator email
export const isValidatorEmail = email => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
  return !!email.match(email.match(regex));
};
// validator name
export const isValidatorName = name => {
  const regex =
    /[^a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u;
  return !!name.match(regex);
};

export const isValidatorPhone = phone => {
  const regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  return !!phone.match(regex);
};
export const isValidatorUsername = username => {
  const regex = /^[a-z0-9]{6,15}$/;
  return !!username.match(regex);
};
// validator pass 11
export const isValidatePassword = password => {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[^\s]{6,20}$/;
  return !!password.match(regex);
};
export const formatDDMMYY = date => {
  const dateA = new Date(date);
  const year = dateA.getFullYear();
  const month =
    dateA.getMonth() + 1 < 10
      ? '0' + (dateA.getMonth() + 1)
      : dateA.getMonth() + 1;
  const day = dateA.getDate() < 10 ? '0' + dateA.getDate() : dateA.getDate();
  return day + '/' + month + '/' + year;
};
export const formatDDMMYY2 = date => {
  const dateA = new Date(date);
  const year = dateA.getFullYear();
  const month =
    dateA.getMonth() + 1 < 10
      ? '0' + (dateA.getMonth() + 1)
      : dateA.getMonth() + 1;
  const day = dateA.getDate() < 10 ? '0' + dateA.getDate() : dateA.getDate();
  return day + '-' + month + '-' + year;
};
export const formatTimehp = hour => {
  if (hour) {
    const data = hour.split(':');
    return `${data[0]}h${data[1]}`;
  } else {
    return hour;
  }
};
export const formatHour = date => {
  const dateA = new Date(date);
  const hour =
    dateA.getHours() < 10 ? '0' + dateA.getHours() : dateA.getHours();
  const minute =
    dateA.getMinutes() < 10 ? '0' + dateA.getMinutes() : dateA.getMinutes();
  return hour + ':' + minute;
};
export const compareTime = (start, end) => {
  if (start.split(':')[0]) {
  }
};

// format date DD/MM/YYYY
export const formatDate = date => {
  const dateA = new Date(date);
  const year = dateA.getFullYear();
  const month = dateA.getMonth() + 1;
  const day = dateA.getDate();
  return (
    (day <= 9 ? '0' + day : day) +
    '-' +
    (month <= 9 ? '0' + month : month) +
    '-' +
    year
  );
};
// validator confirm password
export const isValidateConfirm = (oldVar, newVar) => {
  if (oldVar?.length === newVar?.length) {
    return !!newVar.match(oldVar);
  }
};
export const convertToSecond = day => {
  const split = day.split(':');
  const hour = Number(split[0]);
  const minute = Number(split[1]);
  const second = Number(split[2]);
  return hour * 3600 + minute * 60 + second;
};
export const covertWidthToHour = width => {
  const second = width * 3600;
  const hour = Math.floor(second / 3600);
  const minute = Math.floor((second - hour * 3600) / 60);
  const ss = Math.floor(second - hour * 3600 - minute * 60);
  return `${hour >= 10 ? hour : '0' + hour}:${minute >= 10 ? minute : '0' + minute
    }:${ss >= 10 ? ss : '0' + ss}`;
};
export const convertTimeToPx = time => {
  const second = convertToSecond(time);
  return Math.floor((second * 100) / 3600);
};

export const sorterDateInArr = (arr, method) => {
  return arr.sort((a, b) => {
    return new Date(a[method]) - new Date(b[method]);
  });
};

export const isValidateToken = token => {
  const regex = /^[0-9]{6}$/;
  return !!token?.match(regex);
};

export const getDateInChart = (time = '2023-06-12') => {
  const date = new Date(time);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}`;
};

export const formatDateNoSpace = date => {
  const dateA = new Date(date);
  const year = dateA.getFullYear();
  const month = dateA.getMonth() + 1;
  const day = dateA.getDate();
  return (
    (day <= 9 ? '0' + day : day) + (month <= 9 ? '0' + month : month) + year
  );
};

export const formatTime = date => {
  const dateA = new Date(date);
  const hour = dateA.getHours();
  const minute = dateA.getMinutes();
  const seconds = dateA.getSeconds();
  const dateToTime =
    (hour <= 9 ? '0' + hour : hour) +
    ':' +
    (minute <= 9 ? '0' + minute : minute) +
    ':' +
    (seconds <= 9 ? '0' + seconds : seconds);
  return dateToTime;
};

export const loseConnect =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyAAAAHCCAYAAAAXY63IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAABEjSURBVHgB7d3tkRRVG8fh0Xq+SwaagRKBkoFEoEYARIBGoEYARqBEAEQARABEAETAM/dYZ+rs4fS87Mt/d/C6qu5iXXaG7h0/nN909/QXq9Xq4woAACDgyxUAAECIAAEAAGIECAAAECNAAACAGAECAADECBAAACBGgAAAADECBAAAiBEgAABAjAABAABiBAgAABAjQAAAgBgBAgAAxAgQAAAgRoAAAAAxAgQAAIgRIAAAQIwAAQAAYgQIAAAQI0AAAIAYAQIAAMQIEAAAIEaAAAAAMQIEAACIESAAAECMAAEAAGIECAAAECNAAACAGAECAADECBAAACBGgAAAADECBAAAiBEgAABAjAABAABiBAgAABAjQAAAgBgBAgAAxAgQAAAgRoAAAAAxAgQAAIgRIAAAQIwAAQAAYgQIAAAQI0AAAIAYAQIAAMQIEAAAIEaAAAAAMQIEAACIESAAAECMAAEAAGIECAAAECNAAACAGAECAADECBAAACBGgAAAADECBAAAiBEgAABAjAABAABiBAgAABAjQAAAgBgBAgAAxAgQAAAgRoAAAAAxAgQAAIgRIAAAQIwAAQAAYgQIAAAQI0AAAIAYAQIAAMQIEAAAIEaAAAAAMQIEAACIESAAAECMAAEAAGIECAAAECNAAACAGAECAADECBAAACBGgAAAADECBAAAiBEgAABAjAABAABiBAgAABAjQAAAgBgBAgAAxAgQAAAgRoAAAAAxAgQAAIgRIAAAQIwAAQAAYgQIAAAQI0AAAIAYAQIAAMQIEAAAIEaAAAAAMQIEAACIESAAAECMAAEAAGIECAAAECNAAACAGAECAADECBAAACBGgAAAADECBAAAiBEgAABAjAABAABiBAgAABAjQAAAgBgBAgAAxAgQAAAgRoAAAAAxAgQAAIgRIAAAQIwAAQAAYgQIAAAQI0AAAIAYAQIAAMQIEAAAIEaAAAAAMQIEAACIESAAAECMAAEAAGIECAAAECNAAACAGAECAADECBAAACBGgAAAADECBAAAiBEgAABAjAABAABiBAgAABAjQAAAgBgBAgAAxAgQAAAgRoAAAAAxAgQAAIgRIAAAQIwAAQAAYgQIAAAQI0AAAIAYAQIAAMQIEAAAIEaAAAAAMQIEAACIESAAAECMAAEAAGIECAAAECNAAACAGAECAADECBAAACBGgAAAADECBAAAiBEgAABAjAABAABiBAgAABAjQAAAgBgBAgAAxAgQAAAgRoAAAAAxAgQAAIgRIAAAQIwAAQAAYgQIAAAQI0AAAIAYAQIAAMQIEAAAIEaAAAAAMQIEAACIESAAAECMAAEAAGIECAAAECNAAACAGAECAADECBAAACBGgAAAADECBAAAiBEgAABAjAABAABiBAgAABAjQAAAgBgBAgAAxAgQAAAgRoAAAAAxAgQAAIgRIAAAQIwAAQAAYgQIAAAQI0AAAIAYAQIAAMQIEAAAIEaAAAAAMQIEAACIESAAAECMAAEAAGL+twLgpPz444+rW7dubb5++fLlZk7NN998s/rhhx82X79582b17Nmz1Sn7HF4TgJQv1vNxBcBJqIX769evN1/Xwv327dur9+/fr05N7UPtS6l9OOUF+/ia3LlzZ/NnRcl33323+ueffwQJQMcREICJ/h36Xi0mD13w1+KzplePrec4r6dPn27+bAvdy4iPeue+Fsu9Y/bzWA8fPtzGx4MHD05+cT6+JvVn7eOvv/66+X59fffu3Qu97gCfm4/GGGPOzjo+Ps7cv3//4OdYvyv+yePre7ses16Yf3zx4sX25x89erT5Xv3deiG7+d67d++237uMqecaff311xd6zt9///3MPrft7f+t9QL90vbhKqe2eR0Z2+2ur9v+/Pzzz9vXZB2bi699vY6nsK/GGBOak9pYY4yJzFKAVBxc5PG7AqQeUwvZtshti9i2gK8Fbv3MGB/roxebn2lz7GL3MgOkX6zXtvzxxx/b56yAqr+vfegX623qZ/v9qP8+zzZc9v8H7XWo/WpxWN+rfWivybg/fbCUY8LVGGP+A3NSG2uMMZFZCohSf7fv8RUBxwRIO7pR+iMD/QJ+aRHb3oVvavF7zL5eVoCMi/UWSrXdLazq93Lr1q3p4x8/fnxmG677qMG9e/e229LH0BhVs8fWPtb+1O/hVI70GGNMcE5qY40xJjK7AmTfAn+2oN8XIBeZmxIgF52bFiDGGGOuZlyEDnCkuji9Ltxeukh7dvH6odqF63WRdj1/XdBcF2nXn6P6mZpvv/32zPdr29o21HNc1kXetV3to2ab2cfn1s+0/aiv2z4sbUf7uXX0fPI8/Uf1zn4Hs3+36fe9fahA/dm2Zd/zNf1jyyGPH39Xh2w/wH/JydSSMcakZtcRkLLrtJrZxef7joDU6T7tNKWZ/mL0NrUN+xxyFOGQIyD96Ui7fgd1StLSftS+19Ga8THj9RIzh5zGtHQkqL8gvlff3/V8dV3Hrm3rTzPbt09OwzLGmDNzUhtrjDGRmQVIv7Curw953LgYnwVIf/3HLuMnLaUCpP7N0XiBeF3z0H961y7jdRNXGSBL8dEs/X5++umnnUHYq58dHy9AjDFmeb5cAXCQv/76a/t1f3pQb70YXXzMzHrRvL1fRFOn9zx+/PiT+0bUv7leUG//u52iNZ4K1r5f8+HDh9VF1GlHf//99yfbd//+/TPfq+0a73lSP1enaI2nHtX+9vcdefv27d79OM89SWp7xu0c1e9/fB1rn9eB9cnpZm1/RvWz7fQsAA5zMrVkjDGpmR0BGb83Xuw9HkmoIwLju/LjEZB975TPtmM8PeqqLkKv74+nk/X39Nj1+PGTwsajNbOPM77oRejj76Ftb21LHaGpIzmzo0bj0ZzxE8zac/T7Ox4dGX/njoAYY8zOOamNNcaYyMwW/vX9cWHZf6TseLpPLYj3BUh/f4+6n8fsI2pH4+L+qgJk3NdZfNSMC/alxfb4fON+XEWAHHLNyfpI087fxew5Zv9W/9oJEGOMWR6nYAEc4cmTJ2f+uz/Fpz+tqE4ZGk+hmmmfEFWn9tTPt1ON2icv9adcJdUpYOOpSXfv3p1+ktPs1Kv2CV39jKcvjY+7CrUfo+fPn5/576+++mr79WybZs/Rv1ZN//oDsMzH8AIcoRajDx8+3F4fcO/evc01ALX47K8DmC1Ql9Rz1bUI33///fYjeK/bGB+1P7s+Rrc3XjOyZLzG4rKd52NvZzE1U69tTb8PrgMBOIwjIABHqEXn7GL08eLzP//886Dnq0XrixcvNkc6xoi5SWrbLnJ/k1O1KyLd1wPgfBwBAThSHQ2oIx9NxUMfDrtuujd6+vTpJ9FRpyq9evVqe2rW69evV9dhfIf/0aNHq9u3b+89slPxdcjRn9knSl23cbt3BeFVH8EB+FwJEIAj1cK5ph0RGBephx796O+uXeod9Tt37tyId9Yrsmo/KpCa2tY6/ezBgwdnfra2dzz97CbGxSHG333t1+yu9/X9Q0/XAuAsp2ABnMN4MXpz6MXnZQyXOuoxWwAf6zLemf/tt982ETHGVF10P15sPf4uxtPRmjpqVEeL6j4g9TyJi9CPVfs8xsbsXiKzfTzV6AJIEyAA51AXo89OMzrm4vNRXYTex0N9fegF3b1a2Lcb7J33mpJ3795t/qxYGKOoTsUaj3j06t/uL9QvtWCvi/VrMV9/d8ine9X211TwpE53qtduDKra3hYhtR0VUuPNI5f+fwBg7sZ+RrAxxlzXLN0HpJ+6gd2o7unR/8yu+4DUfSNG9ffr6NjMeLO7Zrx/xmxbm/XCee++Lt0HZNfzj/camf0u2v7M9mN2j4/a1iXjPs9m3z1X2ow3Ixz3pV6X8QaMu8zuj+I+IMYYszyOgACc0/jO/zEXn5d6x3w8xamOLNQ7/u1d/3a9yS7tHiIzl/HJVbNTsep5+1OT6uvZtS/tGorx+cbrSEodRVi6/iV5ula9Lodei3OTrtsBOBUCBOCc2sK/Fp81h1583quFe11vMS5gW5zUzf8O8csvv0w/fWp9JGN1GWanYtWpSf2pWLUvtR1LEVaPr32tBfvsdKW28O8/5rhJfzxxC4valqVtrX2pTwUTHwDH+WL176EQAK5ZO1pRi9ta1J73moI6WlBHHVoYXYf69/ujFsduS3t8u+HfdS/y2++01Pb4xCuA8xMgAABAjFOwAACAGAECAADECBAAACBGgAAAADECBAAAiBEgAABAjAABAABiBAgAABAjQAAAgBgBAgAAxAgQAAAgRoAAAAAxAgQAAIgRIAAAQIwAAQAAYgQIAAAQI0AAAIAYAQIAAMQIEAAAIEaAAAAAMQIEAACIESAAAECMAAEAAGIECAAAECNAAACAGAECAADECBAAACBGgAAAADECBAAAiBEgAABAjAABAABiBAgAABAjQAAAgBgBAgAAxAgQAAAgRoAAAAAxAgQAAIgRIAAAQIwAAQAAYgQIAAAQI0AAAIAYAQIAAMQIEAAAIEaAAAAAMQIEAACIESAAAECMAAEAAGIECAAAECNAAACAGAECAADECBAAACBGgAAAADECBAAAiBEgAABAjAABAABiBAgAABAjQAAAgBgBAgAAxAgQAAAgRoAAAAAxAgQAAIgRIAAAQIwAAQAAYgQIAAAQI0AAAIAYAQIAAMQIEAAAIEaAAAAAMQIEAACIESAAAECMAAEAAGIECAAAECNAAACAGAECAADECBAAACBGgAAAADECBAAAiBEgAABAjAABAABiBAgAABAjQAAAgBgBAgAAxAgQAAAgRoAAAAAxAgQAAIgRIAAAQIwAAQAAYgQIAAAQI0AAAIAYAQIAAMQIEAAAIEaAAAAAMQIEAACIESAAAECMAAEAAGIECAAAECNAAACAGAECAADECBAAACBGgAAAADECBAAAiBEgAABAjAABAABiBAgAABAjQAAAgBgBAgAAxAgQAAAgRoAAAAAxAgQAAIgRIAAAQIwAAQAAYgQIAAAQI0AAAIAYAQIAAMQIEAAAIEaAAAAAMQIEAACIESAAAECMAAEAAGIECAAAECNAAACAGAECAADECBAAACBGgAAAADECBAAAiBEgAABAjAABAABiBAgAABAjQAAAgBgBAgAAxAgQAAAgRoAAAAAxAgQAAIgRIAAAQIwAAQAAYgQIAAAQI0AAAIAYAQIAAMQIEAAAIEaAAAAAMQIEAACIESAAAECMAAEAAGIECAAAECNAAACAGAECAADECBAAACBGgAAAADECBAAAiBEgAABAjAABAABiBAgAABAjQAAAgBgBAgAAxAgQAAAgRoAAAAAxAgQAAIgRIAAAQIwAAQAAYgQIAAAQI0AAAIAYAQIAAMQIEAAAIEaAAAAAMQIEAACIESAAAECMAAEAAGIECAAAECNAAACAGAECAADECBAAACBGgAAAADECBAAAiBEgAABAjAABAABiBAgAABAjQAAAgBgBAgAAxAgQAAAgRoAAAAAxAgQAAIgRIAAAQIwAAQAAYgQIAAAQI0AAAIAYAQIAAMQIEAAAIEaAAAAAMQIEAACIESAAAECMAAEAAGIECAAAECNAAACAGAECAADECBAAACBGgAAAADECBAAAiBEgAABAjAABAABiBAgAABAjQAAAgBgBAgAAxAgQAAAgRoAAAAAxAgQAAIgRIAAAQIwAAQAAYgQIAAAQI0AAAIAYAQIAAMQIEAAAIEaAAAAAMQIEAACIESAAAECMAAEAAGIECAAAECNAAACAGAECAADECBAAACBGgAAAADECBAAAiBEgAABAjAABAABiBAgAABAjQAAAgBgBAgAAxAgQAAAgRoAAAAAxAgQAAIgRIAAAQMz/AWcrVrfKBOdlAAAAAElFTkSuQmCC';

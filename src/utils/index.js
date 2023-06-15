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
export const isValidatorUsername = username => {
  const regex = /^[a-z0-9]{6,15}$/;
  return !!username.match(regex);
};
// validator pass 11
export const isValidatePassword = password => {
  const regex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[^\s]{6,20}$/;;
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
    '/' +
    (month <= 9 ? '0' + month : month) +
    '/' +
    year
  );
};
// validator confirm password
export const isValidateConfirm = (oldVar, newVar) => {
  if(oldVar?.length === newVar?.length) {
    return !!newVar.match(oldVar)
  }
}
export const convertToSecond = (day)=>{
  const split = day.split(":")
  const hour =Number(split[0])
  const minute =Number(split[1])
  const second = Number(split[2])
  return hour * 3600 + minute*60+second
}
export const covertWidthToHour = (width)=>{
  const second = width*3600
  const hour = Math.floor(second /3600)
  const minute = Math.floor((second - hour*3600)/60)
  const ss = Math.floor(second - hour * 3600 - minute * 60)
  return `${hour >= 10 ?hour:'0'+hour}:${minute >= 10 ?minute:'0'+minute}:${ss >= 10 ?ss:'0'+ss}`
}
export const convertTimeToPx = (time)=>{
  const second = convertToSecond(time)
  return Math.floor((second * 100)/3600)
}

export const sorterDateInArr = (arr, method) => {
  return arr.sort((a,b) => {
    return new Date(a[method]) - new Date(b[method])
  })
}

export const isValidateToken = (token) => {
  const regex = /^[0-9]{6}$/;
  return !!token?.match(regex)
}
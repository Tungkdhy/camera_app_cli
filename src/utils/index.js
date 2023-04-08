//validator email
export const isValidatorEmail = (email) => {
  const regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  return !!email.match(email.match(regex));
};
// validator name
export const isValidatorName = (name) => {
  const regex =
    /[^a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u;
  return !!name.match(regex);
};

// validator pass 11
export const isValidatePassword = (password) => {
  const regex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{11,}$/;
  return !!password.match(regex);
};
export const formatDDMMYY = (date) => {
  const dateA = new Date(date);
  const year = dateA.getFullYear();
  const month = dateA.getMonth() + 1 < 10 ? '0' + (dateA.getMonth() + 1) : dateA.getMonth() + 1
  const day = dateA.getDate() < 10 ? '0' + dateA.getDate() : dateA.getDate()
  return (day + '/' + month + '/' + year);
}
export const formatTimehp = (hour) => {
 if(hour){
  const data = hour.split(":")
  return `${data[0]}h${data[1]}`
 }
 else{
  return hour
 }
}
export const formatHour = (date) => {
  const dateA = new Date(date);
  const hour = dateA.getHours() < 10 ? '0' + dateA.getHours() : dateA.getHours()
  const minute = dateA.getMinutes() < 10 ? '0' + dateA.getMinutes() : dateA.getMinutes()
  return (hour + ':' + minute)
}
export const compareTime = (start, end) => {
  if (start.split(":")[0]) {

  }
}

// format date DD/MM/YYYY
export const formatDate = (date) => {
  const dateA = new Date(date);
  const year = dateA.getFullYear();
  const month = dateA.getMonth() + 1;
  const day = dateA.getDate()
  return ((day <= 9 ? '0' + day : day) + '/' + (month <= 9 ? '0' + month : month) + '/' + year);
}
// validator confirm password
export const isValidateConfirm = (oldVar, newVar) => {
  return !!oldVar.match(newVar)
}

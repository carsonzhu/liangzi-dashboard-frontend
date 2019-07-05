const insurances = [
  "基本险",
  "超级放心险",
  "超级安全险",
  "租车补充险",
  "快租险"
];

const specialServices = ["GPS", "驾照翻译件", "儿童安全座椅", "中文向导"];

const SUPER_ADMIN = "superAdmin";
const NORMAL_ADMIN = "normalAdmin";

const userType = [SUPER_ADMIN, NORMAL_ADMIN];

const carStatus = [
  "available", //can be searched, can set a time range
  "rented", //cant be searched, can set a time range
  "removed" //cant be searched
];

export {
  insurances,
  specialServices,
  SUPER_ADMIN,
  NORMAL_ADMIN,
  userType,
  carStatus
};

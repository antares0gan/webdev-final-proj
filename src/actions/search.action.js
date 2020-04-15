export function setDep(dep) {
  let upDep = dep.toUpperCase();
  return {
    type: "SET_DEP",
    dep: upDep
  }
}

export function setDes(des) {
  let upDes = des.toUpperCase();
  return {
    type: "SET_DES",
    des: upDes
  }
}

export function setDate(date) {
  return {
    type: "SET_DATE",
    date
  }
}
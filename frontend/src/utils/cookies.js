// cookies.js
const setCookie = (name, value) => {
  document.cookie = name + "=" + value + "; path=/";
};

const getCookie = (name) => {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

const updateCookie = (name, value) => {
  setCookie(name, value);
};

function deleteCookie(name) {
  document.cookie = `${name}=; path=/;`;
}
export { setCookie, getCookie, updateCookie, deleteCookie };

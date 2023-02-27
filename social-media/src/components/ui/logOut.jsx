export default function logOut(navigate, setAuth, setAuthName) {
  setAuthName(null);
  setAuth(null);
  navigate("/welcome");
}

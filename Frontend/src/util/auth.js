export function getAuthToken() {
  const token = localStorage.getItem("item");

  if (!token) {
    return null;
  }

  return token;
}

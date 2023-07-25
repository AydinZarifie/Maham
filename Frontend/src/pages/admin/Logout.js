import { redirect } from "react-router-dom";
import fetchInstance from "../../util/fetchInstance";
import Cookies from "js-cookie";

export function action() {
  const logout = async () => {
    let { response } = await fetchInstance(
      "/admin/auth/logout",
      {
        method: "post",
        mode: "cors",
        credentials: "include",
      },
      { withCredentials: true }
    );
    if (response.ok) {
      // localStorage.removeItem("token");
      Cookies.remove("token");
      return redirect("/loginAdmin");
    }
  };
  logout();
  return redirect("/admin");
}

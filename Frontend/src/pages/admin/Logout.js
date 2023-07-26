import { redirect } from "react-router-dom";
import fetchInstance from "../../util/fetchInstance";

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
      localStorage.removeItem("token");
      return redirect("/loginAdmin");
    }
  };
  logout();
  return;
}

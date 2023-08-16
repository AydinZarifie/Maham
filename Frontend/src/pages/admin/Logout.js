import { redirect } from "react-router-dom";
import fetchInstance from "../../util/fetchInstance";
import Cookies from "js-cookie";

export async function action() {
  let { response } =await fetchInstance(
    "/admin/auth/logout",
    {
      method: "post",
      mode: "cors",
      credentials: "include",
    },
    { withCredentials: true }
  );
  if (response.ok) {
    Cookies.remove("token");
    return redirect("/loginAdmin");
  }
  return redirect("/admin");
}

export async function logout() {
  let haveValidToken = false;
  let wasGetNewToken = false;
  try {
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/logout/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      if (res.status === 401) {
        haveValidToken = false;
      } else if (res.ok) {
        haveValidToken = true;
      }
    });
  } catch (err) {
    alert(err);
  }
  try {
    if (!haveValidToken) {
      await fetch(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/token-refresh/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      ).then((res) => {
        if (res.ok) {
          wasGetNewToken = true;
        }
      });
    }
  } catch (err) {
    alert(err);
  }
  try {
    if (!wasGetNewToken) {
      await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/logout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
    }
  } catch (err) {
    alert(err);
  }
}

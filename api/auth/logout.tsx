export async function logout() {
  await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/logout/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((res) => {
    if (res.status === 401) {
      fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/token-refresh/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }).then((res) => {
        if (res.ok) {
          fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/logout/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
        }
      });
    }
  });
  window.location.reload();
}

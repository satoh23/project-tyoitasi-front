export async function login(email: string, password: string) {
  let isSuccess: boolean = false;
  await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/login/`, {
    method: "POST",
    body: JSON.stringify({ email: email, password: password }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((res) => {
    if (res.status === 400) {
      return false;
    } else if (res.ok) {
      return true;
    }
  });
}

export async function login(email: string, password: string) {
  let isSuccess: any = false;
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/login/`,
    {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  ).then((res) => {
    if (res.status === 400) {
      isSuccess = false;
    } else if (res.ok) {
      return res.json();
    }
  });
  window.location.reload();
  return isSuccess;
}

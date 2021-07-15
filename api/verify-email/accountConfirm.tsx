export async function AccountConfirm(key: string | string[]) {
  let isSuccess: boolean = false;
  await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}dj-rest-auth/registration/verify-email/`,
    {
      method: "POST",
      body: JSON.stringify({ key: key }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  ).then((res) => {
    if (res.ok) {
      isSuccess = true;
    }
  });
  return isSuccess;
}

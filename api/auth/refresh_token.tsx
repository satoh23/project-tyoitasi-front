export async function refreshToken() {
  let isSuccess;
  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}dj-rest-auth/token/refresh/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    ).then((res) => {
      if (res.ok) {
        isSuccess = true;
      } else if (res.status === 500) {
        isSuccess = false;
      }
    });
  } catch {
    isSuccess = false;
  }
  return isSuccess;
}

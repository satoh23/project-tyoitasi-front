export async function createUser(
  userName: string,
  email: string,
  password: string
) {
  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}dj-rest-auth/registration/`,
      {
        method: "POST",
        body: JSON.stringify({
          username: userName,
          email: email,
          password1: password,
          password2: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.status === 400) {
        return false;
      } else if (res.ok) {
        return true;
      }
    });
  } catch (err) {
    alert(err);
  }
}

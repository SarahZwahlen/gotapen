const HTTPClientPOSTappJson = async (
  body: { [key: string]: any },
  url: string
) => {
  console.log("http client post", body);
  const reqInit: RequestInit = {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  };

  const response = await (
    await fetch(`${process.env.REACT_APP_URL_BACK}/${url}`, reqInit)
  ).json();

  return response;
};

const HTTPClientPOSTformData = async (formData: FormData, url: string) => {
  const reqInit: RequestInit = {
    method: "POST",
    mode: "cors",
    credentials: "include",
    // headers: { "content-type": "multipart/form-data" },
    body: formData,
  };

  const response = await (
    await fetch(`${process.env.REACT_APP_URL_BACK}/${url}`, reqInit)
  ).json();

  return response;
};
export { HTTPClientPOSTappJson, HTTPClientPOSTformData };

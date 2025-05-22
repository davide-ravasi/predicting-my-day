const endpoint =
  "https://q6da6o3op4dirpctuohcph5gia0ddkxo.lambda-url.us-east-1.on.aws/";

export const fetchDayData = async () => {
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch data: ${response.status} ${errorText}`);
  }

  return response.json();
};

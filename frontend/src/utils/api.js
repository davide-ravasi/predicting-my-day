const endpoint =
  "https://q6da6o3op4dirpctuohcph5gia0ddkxo.lambda-url.us-east-1.on.aws/";

export const fetchBookingsData = async (endpoint) => {
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

export const fetchData = async (endpoint) => {
  try {
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

    console.log("API Response:", response);
    const data = await response.json();
    // Parse the nested JSON string in the response property
    console.log("Parsed API Response:", data);
    //const parsedData = JSON.parse(data.response);
    //console.log("Parsed Data:", parsedData);
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

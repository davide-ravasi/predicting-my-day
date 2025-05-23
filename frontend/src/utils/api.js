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

export const formatDate = (dateString) => {
  const today = new Date(dateString);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);
  return formattedDate;
};

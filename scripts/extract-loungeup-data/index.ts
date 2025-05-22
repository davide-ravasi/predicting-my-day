const entityId = "4bc1b985-a669-42be-870f-b4b03ba45b3d";
const accessToken = "";
const baseUrl = "https://svc.loungeup.com";
const apiUrl = "https://api.loungeup.com";

const dates = ["2025-05-22"];

const GETOptions = {
    method: "GET",
    headers: { authorization: `Bearer ${accessToken}` },
  };

dates.map(async (date) => {
  const url = `${baseUrl}/api/guestprofile/entities/${entityId}/cico/lists/check-in?date=${date}&sort=name&asc=true&limit=20`;

  try {
    const response = await fetch(url, GETOptions);
    const data = (await response.json()) as any;
    const userAndBooking = await Promise.all(data.map(async (item: any) => {
        const response = await fetch(`${baseUrl}${item.model.guest.href}`, GETOptions);
        const data = (await response.json()) as any;
        return {
            guest: data,
            booking: item.model.booking,
        }
    }));
    await Bun.write(`./output/cico-${date}.json`, JSON.stringify(userAndBooking));
    await Promise.all(userAndBooking.map(async (item) => {
        const response = await fetch(`${apiUrl}/guestprofile/entities/${item.guest.entityId}/guests/${item.guest.id}/inbox`, GETOptions);
        const data = (await response.json()) as any;
        await Bun.write(`./output/inbox-${item.guest.id}.json`, JSON.stringify(data));
    }));
  } catch (error) {
    console.error(error);
  }
});

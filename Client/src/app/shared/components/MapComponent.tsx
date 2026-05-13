import { Box } from "@mui/material";

type Props = {
  latitude?: number | string;
  longitude?: number | string;
  zoom?: number;
};

export default function MapComponent({ latitude = 51.505, longitude = -0.09, zoom = 13 }: Props) {
  const lat = Number(latitude);
  const lng = Number(longitude);
  const offset = Math.max(0.002, 0.12 / zoom);

  return (
    <Box
      component="iframe"
      title="Activity location map"
      src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng - offset}%2C${lat - offset}%2C${lng + offset}%2C${lat + offset}&layer=mapnik&marker=${lat}%2C${lng}`}
      sx={{
        border: 0,
        width: "100%",
        height: "100%",
        minHeight: 320,
        borderRadius: 2,
      }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}

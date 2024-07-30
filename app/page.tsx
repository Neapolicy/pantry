import { Box, Stack, Typography } from "@mui/material";

const items = ["tomato", "potato", "onion", "garlic", "ginger", "carrot", "lettuce", "kale", "cucumber"]
export default function Home() {
  return <Box
  width={"100%"}
  height={"100vh"}
  display={"flex"}
  justifyContent={"center"}
  alignItems={"center"}
  flexDirection={"column"}
  >
    <Box
    border={"1px solid #333"}>
    <Box
    width={"800px"}
    height={"100px"}
    bgcolor={"#ADD8E6"}
    >
      <Typography variant="h2" color={"#333"} textAlign={"center"}>
        Pantry Items
      </Typography>
    </Box>
    <Stack
    width={"800px"}
    height={"400px"}
    spacing = {2}
    overflow={"auto"}>
      {items.map((i) => (
        <Box
        key={i}
        width={"100%"}
        height={"100px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        bgcolor={"#f0f0f0"}
        >
          <Typography
          variant="h3"
          color = "#333"
          textAlign={"center"}
          >
            {
              i.charAt(0).toUpperCase() + i.slice(1)
            }
            </Typography>
        </Box>
      )) }
    </Stack>
    </Box>
  </Box>
}

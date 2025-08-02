import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon,
} from "react-share";
import { Button, Box } from "@mui/material";

type ShareBlockProps = {
  title: string;
  text: string;
  url: string;
};

export const ShareBlock = ({ title, text, url }: ShareBlockProps) => {
  const webShare = typeof navigator !== "undefined" && !!navigator.share;

  const handleWebShare = async () => {
    try {
      await navigator.share({
        title,
        text,
        url,
      });
    } catch (err) {
      console.error("Web Share failed or was cancelled", err);
    }
  };

  if (webShare) {
    return (
      <Box sx={{ mt: 3 }}>
        <Button variant="outlined" onClick={handleWebShare}>
          Podijeli
        </Button>
      </Box>
    );
  }

  // fallback: social buttons
  return (
    <Box mt={3} display="flex" justifyContent="center" gap={2}>
      <Box mt={2} display="flex" gap={1}>
        <FacebookShareButton url={url} title={text + "\n"}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>

        <TwitterShareButton url={url} title={text + "\n"}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>

        <TelegramShareButton url={url} title={text + "\n"}>
          <TelegramIcon size={32} round />
        </TelegramShareButton>

        <WhatsappShareButton url={url} title={text + "\n"}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </Box>
    </Box>
  );
};

export default ShareBlock;

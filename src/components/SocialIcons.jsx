import facebookIcon from "../assets/icons/facebook.svg";
import WhatsAppIcon from "../assets/icons/WhatsApp.svg";
import TelegramIcon from "../assets/icons/Telegram.svg";

export default function SocialIcons() {
  return (
    <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
      <button type="button" aria-label="facebook" style={imgBtnStyle}>
        <img src={facebookIcon} alt="" style={imgStyle} />
      </button>

      <button type="button" aria-label="whatsapp" style={imgBtnStyle}>
        <img src={WhatsAppIcon} alt="" style={imgStyle} />
      </button>

      <button type="button" aria-label="telegram" style={imgBtnStyle}>
        <img src={TelegramIcon} alt="" style={imgStyle} />
      </button>
    </div>
  );
}

const imgBtnStyle = {
  padding: 0,
  border: "none",
  background: "transparent",
  cursor: "pointer",
  lineHeight: 0, // 이미지 주변 여백 제거
};

const imgStyle = {
  width: 36,
  height: 36,
  display: "block",
};

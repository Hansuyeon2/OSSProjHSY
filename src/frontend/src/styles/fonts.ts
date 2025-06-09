import { css } from "styled-components";

const fontGenerator = (
  weight: number,
  size: string,
  // lineHeight: string,
  fontFamily?: string
) => css`
  font-weight: ${weight};
  font-size: ${size};

  font-family: ${fontFamily ? `${fontFamily}` : ""};
`;

export const fonts = {
  //title
  title_b_30: fontGenerator(600, "30px", "nad"),
  title_b_24: fontGenerator(600, "24px", "nad"),
  title_b_18: fontGenerator(600, "18px", "nad"),
  title_l_30: fontGenerator(300, "30px", "nad"),
  title_l_24: fontGenerator(300, "24px", "nad"),
  title_l_20: fontGenerator(300, "20px", "nad"),
  title_l_17: fontGenerator(300, "17px", "nad"),

  //subtitle
  sub_extra_16: fontGenerator(800, "16px"),
  sub_bold_16: fontGenerator(700, "16px"),
  sub_semi_16: fontGenerator(600, "16px"),
  sub_m_16: fontGenerator(500, "16px"),

  //body
  body_extra_14_: fontGenerator(800, "14px"),
  body_b_14: fontGenerator(700, "14px"),
  body_s_14: fontGenerator(600, "14px"),
  body_m_14: fontGenerator(500, "14px"),

  //caption
  cap_extra_12: fontGenerator(600, "14px"),
  cap_b_12: fontGenerator(700, "12px"),
  cap_s_12: fontGenerator(600, "12px"),
  cap_m_12: fontGenerator(500, "12px"),
  cap_extra_10: fontGenerator(800, "10px"),
  cap_b_10: fontGenerator(700, "10px"),
  cap_s_10: fontGenerator(600, "10px"),
  cap_m_10: fontGenerator(500, "10px"),

  //footer
  footer: fontGenerator(400, "10px"),

  //loading
  loading: fontGenerator(600, "16px", "nad"),
};

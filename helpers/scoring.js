import {
  CRASH_VELOCITY,
  CRASH_ANGLE,
  VELOCITY_MULTIPLIER,
} from "./constants.js";
import { progress } from "./helpers.js";


export const landingScoreDescription = (score) => {
  const description =
    score >= 120
      ? "فرودت فوق العاده بود"
      : score >= 99
        ? "همه چی عالی بود"
        : score >= 95
          ? "خوب بود"
          : score >= 90
            ? "عالیه ولی بهترم میشه"
            : score >= 85
              ? "یه فرود فوق العاده ولی بازم تلاش کن"
              : score >= 80
                ? "یه فرود عالی بازم تلاش کن"
                : score >= 75
                  ? "واو خوبه ولی بازم تلاش کن"
                  : score >= 70
                    ? "یه فرود معمولی بود"
                    : score >= 65
                      ? "فرود اومدی ولی میتونه با سرعت و زاویه بهتری باشه"
                      : score >= 60
                        ? "فرود بدی نبود ولی میتونه بهتر از اینم باشه"
                        : score >= 55
                          ? "فرود خوبی نبود"
                          : score >= 55
                            ? "فرود اومدی ولی بازم تلاش کن"
                            : score >= 40
                              ? "جالبه تونستی فرود بیای ولی میتونه بهتر باشه"
                              : score >= 30
                                ? "یه اشتباه میتونست همه چیو خراب کنه"
                                : "فرود اومدی ولی بازم تلاش کن که امتیاز بیشتری بگیری";

  return description;
};

export const crashScoreDescription = (score) => {
  const description =
    score >= 120
      ? "امتیازت خیلی زیاد بود ولی متاسفانه برخورد داشتی"
      : score >= 100
        ? "با این سرعت این دهانه تو ماه از زمین هم معلومه"
        : score >= 95
          ? "بیشتر تلاش کن"
          : score >= 90
            ? "...هوف، واقعا کارت خوب بود ولی"
            : score >= 85
              ? "سرعتت و زاویت عالی بودن ولی متاسفانه درست فرود نیومد"
              : score >= 80
                ? "یه برخورد سریع بود"
                : score >= 75
                  ? "فک کردیم فرود اومد، نزدیک بود"
                  : score >= 70
                    ? "متاسفانه به درستی فرود نیومدی"
                    : score >= 65
                      ? "شاید ماه نشین یه مشکلی داره"
                      : score >= 60
                        ? "ای بابا تصادف بدی بود"
                        : score >= 50
                          ? "باید تلاشتو بیشتر کنی"
                          : score >= 40
                            ? "یه تصادف شدید داشتی ولی ادامه بده"
                            : score >= 30
                              ? "ای بابا اینجوری نمیتونیم به زمین برگردیم"
                              : score >= 20
                                ? "ای بابا تصادف رخ داد"
                                : score >= 10
                                  ? "یکمی سرعت رو کم کن"
                                  : "خیلی خیلی نزدیک بود ولی متاسفانه به درستی فرود نیومد";

  return description;
};

// Perfect land:
// angle: 0
// speed: 1
//
// Worst possible landing:
// angle: 11
// speed: 12
export const scoreLanding = (angle, speed) => {
  const bestPossibleCombo = 1;
  const worstPossibleCombo = CRASH_ANGLE + CRASH_VELOCITY * VELOCITY_MULTIPLIER;
  const score = progress(
    worstPossibleCombo,
    bestPossibleCombo,
    angle + speed * VELOCITY_MULTIPLIER
  ) * 100;

  var formdata = new FormData();
  formdata.append("fullname", window.name);
  formdata.append("phone", window.phone);
  formdata.append("score", score);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

  fetch("https://game.thaqib.ir/api/v1/", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

  return (
    score
  );
};

export const scoreCrash = (angle, speed) => {
  const bestPossibleCombo = 900;
  const worstPossibleCombo = Math.min(
    CRASH_VELOCITY * VELOCITY_MULTIPLIER,
    CRASH_ANGLE
  );
  const score = progress(
    worstPossibleCombo,
    bestPossibleCombo,
    angle + speed * VELOCITY_MULTIPLIER
  ) * 100;

  var formdata = new FormData();
  formdata.append("fullname", window.name);
  formdata.append("phone", window.phone);
  formdata.append("score", score);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

  fetch("https://game.thaqib.ir/api/v1/", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

  return (
    score
  );
};

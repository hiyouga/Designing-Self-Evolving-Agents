const copy = {
  zh: {
    follow: "关注我的账号",
  },
  en: {
    follow: "Follow me on",
  },
};

export function ThankYouSlide({ locale }) {
  const t = copy[locale] ?? copy.en;

  return (
    <div className="thank-you-slide">
      <div className="thank-you-slide__content">
        <h1 className="thank-you-slide__title">Thank you</h1>
      </div>

      <div className="thank-you-slide__contacts" aria-label="Contact links">
        <span>{t.follow}</span>
        <div className="thank-you-slide__contact-links">
          <span>X: <a href="https://x.com/code_hiyouga">https://x.com/code_hiyouga</a></span>
          <span>GitHub: <a href="https://github.com/hiyouga">https://github.com/hiyouga</a></span>
          <span>LinkedIn: <a href="https://www.linkedin.com/in/hiyouga/">https://www.linkedin.com/in/hiyouga/</a></span>
        </div>
      </div>
    </div>
  );
}

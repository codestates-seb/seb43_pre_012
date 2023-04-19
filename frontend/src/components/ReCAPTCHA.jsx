import ReCAPTCHA from "react-google-recaptcha"

export default function Captcha() {
  function onChange(value) {
    console.log('Captcha value:', value);
  }
  return (
    <div>
      <ReCAPTCHA
        sitekey="6LccRp8lAAAAAGGMwzVM9XqYN2kPzuGTHGRZvrA1"
        onChange={onChange}
      />
    </div>
  );
};
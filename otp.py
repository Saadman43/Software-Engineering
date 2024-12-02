import pyotp
import base64
from email.message import EmailMessage
import smtplib


def generate_otp(email):
    secret = base64.b32encode(email.encode()).decode()
    totp = pyotp.TOTP(secret, interval=300)
    return totp

def send_otp(email):
    otp = generate_otp(email).now()
    # send email
    from_mail = "support@amardokan.com"
    password = ""
    to_mail = email

    server = smtplib.SMTP("localhost", 2525)
    server.login(from_mail, password)


    message = EmailMessage()
    message["Subject"] = "OTP Verification"
    message["From"] = from_mail
    message["To"] = to_mail
    message.set_content("Your OTP is: " + otp + "\nThank You From Amar Dokan")

    server.send_message(message)
    return "Ok"

def verify_otp_service(email, otp):
    return otp == generate_otp(email).now()

